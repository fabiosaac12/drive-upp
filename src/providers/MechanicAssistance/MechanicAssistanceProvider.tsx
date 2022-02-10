/* eslint-disable react-hooks/exhaustive-deps */
import { useSocket } from 'providers/Socket';
import React, { useEffect, useState } from 'react';
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

export const MechanicAssistanceProvider: FC = ({ children }) => {
  const { locationRef } = useLocation();
  const auth = useAuth();
  const socket = useSocket();
  const modal = useModal();
  const [status, setStatus] = useState<Status>('inactive');

  useEffect(() => {
    if (status === 'active') {
      socket.instance.on('current_location_user', (data) => {
        console.log('current_location_user from mechanic', data);
      });

      socket.instance.on('request_cancelled_user', (data) => {
        console.log('request_cancelled_user form mechanic', data);
      });
    }
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
  };

  return (
    <MechanicAssistanceContext.Provider value={contextValue}>
      {children}
    </MechanicAssistanceContext.Provider>
  );
};
