import { createContext } from 'react';
import { MechanicLocation } from './models/MechanicLocation';
import { Status } from './models/Status';

export type UserAssistanceContextProps = {
  mechanicLocation: MechanicLocation | undefined;
  status: Status;
  searchForHelp: () => void;
};

export const UserAssistanceContext = createContext<UserAssistanceContextProps>(
  {} as UserAssistanceContextProps,
);
