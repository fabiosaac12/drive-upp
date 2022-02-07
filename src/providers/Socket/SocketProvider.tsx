/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { config } from 'config';
import { FC, useState } from 'react';
import { io } from 'socket.io-client';
import { SocketContext, SocketContextProps } from './SocketContext';
import { useAuth } from 'providers/Auth';

export const SocketProvider: FC = ({ children }) => {
  const auth = useAuth();
  const [socket] = useState(io(config.apiUrl));
  const [connected, setConnected] = useState(false);

  console.log({ connected });

  useEffect(() => {
    auth.status === 'in' &&
      auth.user &&
      socket.emit('connected', { email: auth.user.email });
  }, [auth.status, auth.user]);

  useEffect(() => {
    socket.on('connected_confirm', () => setConnected(true));

    return () => {
      socket.off();
    };
  }, []);

  const contextValue: SocketContextProps = {
    socket,
    connected,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
