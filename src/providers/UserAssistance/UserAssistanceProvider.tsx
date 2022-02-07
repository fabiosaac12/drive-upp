import { useLocation } from 'providers/Location';
import { useSocket } from 'providers/Socket';
import React, { useState } from 'react';
import { FC } from 'react';
import { Status } from './models/Status';
import {
  UserAssistanceContext,
  UserAssistanceContextProps,
} from './UserAssistanceContext';

export const UserAssistanceProvider: FC = ({ children }) => {
  const { socket } = useSocket();
  const { locationRef } = useLocation();
  const [status, setStatus] = useState<Status>('inactive');

  const searchForHelp = () => {
    if (locationRef.current) {
      console.log({
        lat: locationRef.current.latitude,
        lng: locationRef.current.longitude,
      });

      socket.emit('search_help', {
        lat: locationRef.current.latitude,
        lng: locationRef.current.longitude,
      });

      setStatus('searching');
    }
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
