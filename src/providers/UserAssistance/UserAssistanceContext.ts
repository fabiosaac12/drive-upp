import { createContext } from 'react';
import { Status } from './models/Status';

export type UserAssistanceContextProps = {
  status: Status;
  searchForHelp: () => void;
};

export const UserAssistanceContext = createContext<UserAssistanceContextProps>(
  {} as UserAssistanceContextProps,
);
