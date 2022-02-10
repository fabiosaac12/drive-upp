import { createContext } from 'react';
import { Status } from './models/Status';
import { UserLocation } from './models/UserLocation';

export type MechanicAssistanceContextProps = {
  status: Status;
  userLocation: UserLocation | undefined;
  activeService: () => void;
  desactiveService: () => void;
};

export const MechanicAssistanceContext =
  createContext<MechanicAssistanceContextProps>(
    {} as MechanicAssistanceContextProps,
  );
