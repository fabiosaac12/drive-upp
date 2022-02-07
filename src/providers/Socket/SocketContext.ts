import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export type SocketContextProps = {
  socket: Socket;
  connected: boolean;
};

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps,
);
