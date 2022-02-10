/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSocket } from 'providers/Socket';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { Status } from './models/Status';
import {
  MechanicAssistanceContext,
  MechanicAssistanceContextProps,
} from './MechanicAssistanceContext';
import { getItem, removeItem, setItem } from 'helpers/localStorage';
import { MechanicAvailableEventData } from './models/MechanicAvailableEventData';
import { useLocation } from 'providers/Location';
import { getDistance } from 'providers/Location/helpers';
import { MechanicAvailableConfirmEventData } from './models/MechanicAvailableConfirmEvent';
import { useAuth } from 'providers/Auth';
import { useModal } from 'providers/Modal';
import { UserNeedsHelpModal } from 'components/UserNeedsHelpModal';
import { CurrentLocationUserEventData } from './models/CurrentLocationUserEventData';
import { LocationListener } from 'providers/Location/models/LocationListener';
import { CurrentLocationMechanicEventData } from './models/CurrentLocationMechanicEventData';
import { UserLocation } from './models/UserLocation';

export const MechanicAssistanceProvider: FC = ({ children }) => {
  const { locationRef, ...location } = useLocation();
  const auth = useAuth();
  const socket = useSocket();
  const modal = useModal();
  const [status, setStatus] = useState<Status>('inactive');
  const assistanceIdRef = useRef<string>();
  const [userLocation, setUserLocation] = useState<UserLocation>();

  console.log({ userLocation });

  useEffect(() => {
    if (status === 'helping') {
      socket.instance.on(
        'current_location_user',
        (data: CurrentLocationUserEventData) => {
          if (!locationRef.current) {
            return;
          }

          const location = {
            latitude: data.location.latUser,
            longitude: data.location.lngUser,
          };

          setUserLocation({
            ...location,
            distance: getDistance(locationRef.current, location),
          });
        },
      );

      socket.instance.on('request_cancelled_user', () => {
        setStatus('active');
        setUserLocation(undefined);
        assistanceIdRef.current = undefined;
      });
    }

    return () => {
      socket.instance.off('current_location_user');
      socket.instance.off('request_cancelled_user');
    };
  }, [status]);

  useEffect(() => {
    if (status === 'waiting') {
      socket.instance.on(
        'current_location_user',
        (data: CurrentLocationUserEventData) => {
          if (!locationRef.current) {
            return;
          }

          const location = {
            latitude: data.location.latUser,
            longitude: data.location.lngUser,
          };

          assistanceIdRef.current = data.idAssistance;
          setStatus('helping');
          setUserLocation({
            ...location,
            distance: getDistance(location, locationRef.current),
          });

          startSendingLocation(data);
        },
      );

      socket.instance.on('request_cancelled_user', () => {
        setStatus('active');
      });
    }

    return () => {
      socket.instance.off('current_location_user');
      socket.instance.off('request_cancelled_user');
    };
  }, [status]);

  useEffect(() => {
    if (status === 'active') {
      socket.instance.on(
        'mechanic_available',
        (userData: MechanicAvailableEventData) => {
          if (locationRef.current) {
            const distance = getDistance(locationRef.current, {
              latitude: userData.latUser,
              longitude: userData.lngUser,
            });

            modal.handleOpen({
              content: (
                <UserNeedsHelpModal
                  distance={distance}
                  onAccept={() => confirmAvailability(userData)}
                />
              ),
            });
          }
        },
      );
    }

    return () => {
      socket.instance.off('mechanic_available');
    };
  }, [status]);

  useEffect(() => {
    (async () => {
      const defaultActive = await getItem<true>('mechanic_default_active');

      defaultActive && activeService();
    })();
  }, []);

  useEffect(() => {
    socket.status === 'connected' && setStatus('active');
  }, [socket.status]);

  const startSendingLocation = (
    assistanceData: CurrentLocationUserEventData,
  ) => {
    const locationListener: LocationListener = (location) => {
      const data: CurrentLocationMechanicEventData = {
        location: {
          idMechanic: assistanceData.idMechanic,
          latMechanic: location.latitude,
          lngMechanic: location.longitude,
        },
        idAssistance: assistanceData.idAssistance,
        idUser: assistanceData.location.idUser,
      };

      setUserLocation((userLocation) =>
        userLocation
          ? { ...userLocation, distance: getDistance(userLocation, location) }
          : undefined,
      );

      socket.instance.emit('current_location_mechanic', data);
    };

    location.addListener(locationListener);

    return locationListener;
  };

  const confirmAvailability = (userData: MechanicAvailableEventData) => {
    if (!auth.user || !locationRef.current) {
      return;
    }

    const data: MechanicAvailableConfirmEventData = {
      user: userData,
      mechanic: {
        idMechanic: auth.user._id,
        latMechanic: locationRef.current.latitude,
        lngMechanic: locationRef.current.longitude,
      },
    };

    console.log('mechanic_available_confirm', data);
    socket.instance.emit('mechanic_available_confirm', data);
    setStatus('waiting');
  };

  const activeService = () => {
    if (status === 'inactive') {
      socket.connect();
      setStatus('activing');
      setItem('mechanic_default_active', true);
    }
  };

  const desactiveService = () => {
    socket.disconnect();
    setStatus('inactive');
    removeItem('mechanic_default_active');
  };

  const contextValue: MechanicAssistanceContextProps = {
    status,
    activeService,
    desactiveService,
    userLocation,
  };

  return (
    <MechanicAssistanceContext.Provider value={contextValue}>
      {children}
    </MechanicAssistanceContext.Provider>
  );
};
