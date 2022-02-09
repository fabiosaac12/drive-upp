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

export const MechanicAssistanceProvider: FC = ({ children }) => {
  const socket = useSocket();
  const [status, setStatus] = useState<Status>('inactive');

  useEffect(() => {
    (async () => {
      const defaultActive = await getItem<true>('mechanic_default_active');

      defaultActive && activeService();
    })();
  }, []);

  useEffect(() => {
    socket.status === 'connected' && setStatus('active');
  }, [socket.status]);

  const activeService = () => {
    socket.connect();
    setStatus('activing');
    setItem('mechanic_default_active', true);
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
