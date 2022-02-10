import { Location } from 'providers/Location/models/Location';
import { createContext } from 'react';
import { Status } from './models/Status';

export type MechanicAssistanceContextProps = {
  status: Status;
  userLocation: Location | undefined;
  activeService: () => void;
  desactiveService: () => void;
};

export const MechanicAssistanceContext =
  createContext<MechanicAssistanceContextProps>(
    {} as MechanicAssistanceContextProps,
  );
