/* eslint-disable react-hooks/exhaustive-deps */
import { InfoModal } from 'components/InfoModal';
import { useLocation } from 'providers/Location';
import { useModal } from 'providers/Modal';
import { useSocket } from 'providers/Socket';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { Status } from './models/Status';
import {
  UserAssistanceContext,
  UserAssistanceContextProps,
} from './UserAssistanceContext';
import { useMessages } from './UserAssistanceMessages';

export const UserAssistanceProvider: FC = ({ children }) => {
  const modal = useModal();
  const socket = useSocket();
  const { locationRef } = useLocation();
  const messages = useMessages();
  const [status, setStatus] = useState<Status>('inactive');

  useEffect(() => {
    if (socket.status === 'connected' && locationRef.current) {
      socket.socket.emit('search_help', {
        lat: locationRef.current.latitude,
        lng: locationRef.current.longitude,
      });

      console.log('emitting search_help');
    }
  }, [socket.status]);

  useEffect(() => {
    if (socket.status === 'connected') {
      socket.socket.on('help_no_mechanic_available', () => {
        setStatus('inactive');
        socket.disconnect();

        modal.handleOpen({
          content: (
            <InfoModal
              variant="secondary"
              title={messages.noMechanicAvailable}
              buttonText={messages.accept}
            />
          ),
        });

        console.log('receiving help_no_mechanic_available');
      });
    }

    return () => {
      socket.socket.off('help_no_mechanic_available');
    };
  }, [socket.status]);

  const searchForHelp = () => {
    socket.connect();

    setStatus('searching');
  };

  const contextValue: UserAssistanceContextProps = {
    status,
    searchForHelp,
  };

  return (
    <UserAssistanceContext.Provider value={contextValue}>
      {children}
    </UserAssistanceContext.Provider>
  );
};
