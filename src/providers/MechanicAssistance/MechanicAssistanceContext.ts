import { createContext } from 'react';
import { Status } from './models/Status';

export type MechanicAssistanceContextProps = {
  status: Status;
  activeService: () => void;
  desactiveService: () => void;
};

export const MechanicAssistanceContext =
  createContext<MechanicAssistanceContextProps>(
    {} as MechanicAssistanceContextProps,
  );
