import { createContext } from 'react';
import { LoginData } from './models/LoginData';
import { Status } from './models/Status';
import { User } from './models/User';

export interface AuthContextProps {
  user?: User;
  status: Status;
  handleLogin: (params: LoginData) => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
