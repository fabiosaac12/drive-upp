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

export const UserAssistanceProvider: FC = ({ children }) => {
  const modal = useModal();
  const socket = useSocket();
  const { locationRef, ...location } = useLocation();
  const messages = useMessages();
  const [status, setStatus] = useState<Status>('inactive');
  const assistanceRef = useRef<HelpConfirmEventData>();
  const [mechanicLocation, setMechanicLocation] = useState<MechanicLocation>();

  useEffect(() => {
    console.log(socket.status, locationRef.current);

    if (socket.status === 'connected' && locationRef.current) {
      console.log('search_help');

      socket.instance.emit('search_help', {
        lat: locationRef.current.latitude,
        lng: locationRef.current.longitude,
      });
    }
  }, [socket.status]);

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
          const distance = getDistance(locationRef.current, {
            latitude: data.mechanic.latMechanic,
            longitude: data.mechanic.lngMechanic,
          });

          modal.handleOpen({
            options: { onRequestClose: () => null },
            content: (
              <MechanicCanHelpModal
                distance={distance}
                onAccept={() => {
                  assistanceRef.current = data;
                  setStatus('active');
                  setMechanicLocation({
                    latitude: data.mechanic.latMechanic,
                    longitude: data.mechanic.lngMechanic,
                    distance,
                  });
                }}
                onReject={() => cancelAssistance(data)}
              />
            ),
          });
        }
      });

      return () => {
        socket.instance.off('help_confirm');
      };
    }
  }, [socket.status]);

  useEffect(() => {
    if (status === 'active' && assistanceRef.current) {
      const locationListener = startSendingLocation(assistanceRef.current);

      return () => {
        location.removeListener(locationListener);
      };
    }
  }, [status]);

  useEffect(() => {
    if (status === 'active') {
      socket.instance.on(
        'current_location_mechanic',
        (data: CurrentLocationMechanicEventData) => {
          if (!locationRef.current) {
            return;
          }

          const location = {
            latitude: data.location.latMechanic,
            longitude: data.location.lngMechanic,
          };

          setMechanicLocation({
            ...location,
            distance: getDistance(locationRef.current, location),
          });
        },
      );

      socket.instance.on('request_cancelled_mechanic', () => {
        setStatus('active');
        setMechanicLocation(undefined);
        assistanceRef.current = undefined;
      });

      return () => {
        socket.instance.off('current_location_mechanic');
        socket.instance.off('request_cancelled_mechanic');
      };
    }
  }, [status]);

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

  const startSendingLocation = (assistanceData: HelpConfirmEventData) => {
    const locationListener: LocationListener = (location) => {
      const data: CurrentLocationUserEventData = {
        location: {
          idUser: assistanceData.user.idUser,
          latUser: location.latitude,
          lngUser: location.longitude,
        },
        idAssistance: assistanceData.idAssistance,
        idMechanic: assistanceData.mechanic.idMechanic,
      };

      setMechanicLocation((mechanicLocation) =>
        mechanicLocation
          ? {
              ...mechanicLocation,
              distance: getDistance(mechanicLocation, location),
            }
          : undefined,
      );

      socket.instance.emit('current_location_user', data);
    };

    location.addListener(locationListener);

    return locationListener;
  };

  const cancelAssistance = (assistanceData: HelpConfirmEventData) => {
    const data: CancelAssistanceEventData = {
      idAssistance: assistanceData.idAssistance,
      idMechanic: assistanceData.mechanic.idMechanic,
      idUser: assistanceData.user.idUser,
    };

    socket.instance.emit('request_cancelled_user', data);

    setStatus('inactive');
  };

  const searchForHelp = () => {
    setStatus('searching');
  };

  const contextValue: UserAssistanceContextProps = {
    status,
    searchForHelp,
    mechanicLocation,
  };

  return (
    <UserAssistanceContext.Provider value={contextValue}>
      {children}
    </UserAssistanceContext.Provider>
  );
};
