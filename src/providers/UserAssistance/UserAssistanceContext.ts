import { Location } from 'providers/Location/models/Location';
import { createContext } from 'react';
import { Status } from './models/Status';

export type UserAssistanceContextProps = {
  mechanicLocation: Location | undefined;
  status: Status;
  searchForHelp: () => void;
};

export const UserAssistanceContext = createContext<UserAssistanceContextProps>(
  {} as UserAssistanceContextProps,
);
