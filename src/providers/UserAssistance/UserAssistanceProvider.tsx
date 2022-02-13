/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { InfoModal } from 'components/InfoModal';
import { MechanicCanHelpModal } from 'components/MechanicCanHelpModal';
import { useLocation } from 'providers/Location';
import { getDistance } from 'providers/Location/helpers';
import { useModal } from 'providers/Modal';
import { useSocket } from 'providers/Socket';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { HelpConfirmEventData } from './models/HelpConfirmEventData';
import { Status } from './models/Status';
import {
  UserAssistanceContext,
  UserAssistanceContextProps,
} from './UserAssistanceContext';
import { useMessages } from './UserAssistanceMessages';
import { CurrentLocationUserEventData } from './models/CurrentLocationUserEventData';
import { CancelAssistanceEventData } from './models/CancelAssistanceEventData';
import { LocationListener } from 'providers/Location/models/LocationListener';
import { CurrentLocationMechanicEventData } from './models/CurrentLocationMechanicEventData';
import { MechanicLocation } from './models/MechanicLocation';
import { UserAssistanceCompleteModal } from 'components/UserAssistanceCompleteModal';
import { useLocationMessages } from 'providers/Location/LocationMessages';
import { Assistance } from './models/Assistance';
import { getCurrentAssistance } from 'config/api/requests/assistance';
import Geolocation from 'react-native-geolocation-service';
import BackgroundService, {
  BackgroundTaskOptions,
} from 'react-native-background-actions';

const veryIntensiveTask = async () => {
  await new Promise(async () => {
    Geolocation.watchPosition(
      (position) => console.log(position),
      (error) => console.log(error),
      { enableHighAccuracy: true },
    );
  });
};

const options: BackgroundTaskOptions = {
  taskName: 'locationListener',
  taskTitle: 'Asistencia en progreso',
  taskDesc: 'Hay una asistencia en progreso. Toca para mas detalles.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
};

export const UserAssistanceProvider: FC = ({ children }) => {
  const modal = useModal();
  const socket = useSocket();
  const { locationRef, ...location } = useLocation();
  const locationMessages = useLocationMessages();
  const messages = useMessages();
  const [status, setStatus] = useState<Status>('inactive');
  const assistanceRef = useRef<Assistance>();
  const [mechanicLocation, setMechanicLocation] = useState<MechanicLocation>();

  console.log('user', socket.status);

  useEffect(() => {
    (async () => {
      await BackgroundService.start(veryIntensiveTask, options);
      try {
        setStatus('loading');

        const assistance = await getCurrentAssistance();

        if (assistance) {
          socket.connect();
          assistanceRef.current = assistance;
          setStatus('active');
        } else {
          throw null;
        }
      } catch {
        setStatus('inactive');
      }
    })();
  }, []);

  useEffect(() => {
    if (socket.status === 'connected' && locationRef.current) {
      socket.instance.emit('search_help', {
        lat: locationRef.current.latitude,
        lng: locationRef.current.longitude,
      });
    }
  }, [socket.status, location.enabled]);

  useEffect(() => {
    if (socket.status === 'connected') {
      socket.instance.on('help_no_mechanic_available', () => {
        setStatus('inactive');

        modal.handleOpen({
          content: (
            <InfoModal
              variant="secondary"
              title={messages.noMechanicAvailable}
              buttonText={messages.accept}
            />
          ),
        });
      });

      return () => {
        socket.instance.off('help_no_mechanic_available');
      };
    }
  }, [socket.status]);

  useEffect(() => {
    if (socket.status === 'connected') {
      socket.instance.on('help_confirm', (data: HelpConfirmEventData) => {
        if (locationRef.current) {
          const distance = getDistance(
            locationRef.current,
            {
              latitude: data.mechanic.latMechanic,
              longitude: data.mechanic.lngMechanic,
            },
            locationMessages,
          );

          modal.handleOpen({
            options: { onRequestClose: () => null },
            content: (
              <MechanicCanHelpModal
                distance={distance}
                onAccept={() => {
                  assistanceRef.current = {
                    idAssistance: data.idAssistance,
                    idMechanic: data.mechanic.idMechanic,
                    idUser: data.user.idUser,
                  };
                  setStatus('active');
                  setMechanicLocation({
                    latitude: data.mechanic.latMechanic,
                    longitude: data.mechanic.lngMechanic,
                    distance,
                  });
                }}
                onReject={() => cancelAssistance()}
              />
            ),
          });
        }
      });

      return () => {
        socket.instance.off('help_confirm');
      };
    }
  }, [socket.status, location.enabled]);

  useEffect(() => {
    if (status === 'active' && socket.status === 'connected') {
      const locationListener = startSendingLocation();

      return () => {
        location.removeListener(locationListener);
      };
    }
  }, [status, socket.status, location.enabled]);

  useEffect(() => {
    if (status === 'active') {
      socket.instance.on(
        'current_location_mechanic',
        (data: CurrentLocationMechanicEventData) => {
          if (!locationRef.current) {
            return;
          }

          console.log('receiving location mechanic');

          const location = {
            latitude: data.location.latMechanic,
            longitude: data.location.lngMechanic,
          };

          setMechanicLocation({
            ...location,
            distance: getDistance(
              locationRef.current,
              location,
              locationMessages,
            ),
          });
        },
      );

      socket.instance.on('request_completed_confirm', () => {
        setStatus('inactive');
        setMechanicLocation(undefined);
        assistanceRef.current = undefined;

        modal.handleOpen({ content: <UserAssistanceCompleteModal /> });
      });

      socket.instance.on('request_cancelled_mechanic', () => {
        setStatus('inactive');
        setMechanicLocation(undefined);
        assistanceRef.current = undefined;
      });

      return () => {
        socket.instance.off('current_location_mechanic');
        socket.instance.off('request_cancelled_mechanic');
        socket.instance.off('request_completed_confirm');
      };
    }
  }, [status, location.enabled]);

  useEffect(() => {
    if (status === 'inactive') {
      socket.disconnect();
    }
  }, [status]);

  useEffect(() => {
    if (status === 'searching') {
      socket.connect();
    }
  }, [status]);

  const startSendingLocation = () => {
    const locationListener: LocationListener = (location) => {
      if (!assistanceRef.current) {
        return;
      }

      const data: CurrentLocationUserEventData = {
        location: {
          idUser: assistanceRef.current.idUser,
          latUser: location.latitude,
          lngUser: location.longitude,
        },
        idAssistance: assistanceRef.current.idAssistance,
        idMechanic: assistanceRef.current.idMechanic,
      };

      setMechanicLocation((mechanicLocation) =>
        mechanicLocation
          ? {
              ...mechanicLocation,
              distance: getDistance(
                mechanicLocation,
                location,
                locationMessages,
              ),
            }
          : undefined,
      );

      console.log('sending user location');
      socket.instance.emit('current_location_user', data);
    };

    location.addListener(locationListener);

    return locationListener;
  };

  const completeAssistance = () => {
    if (assistanceRef.current) {
      const data: CancelAssistanceEventData = assistanceRef.current;

      socket.instance.emit('request_completed_user', data);
    }
  };

  const cancelAssistance = () => {
    if (assistanceRef.current) {
      const data: CancelAssistanceEventData = assistanceRef.current;

      socket.instance.emit('request_cancelled_user', data);

      setStatus('inactive');
    }
  };

  const searchForHelp = () => {
    setStatus('searching');
  };

  const contextValue: UserAssistanceContextProps = {
    status,
    searchForHelp,
    mechanicLocation,
    completeAssistance,
    cancelAssistance,
  };

  return (
    <UserAssistanceContext.Provider value={contextValue}>
      {children}
    </UserAssistanceContext.Provider>
  );
};
