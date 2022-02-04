/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { login as _login } from 'config/api/requests/auth';
import { AuthContext, AuthContextProps } from './AuthContext';
import { LoginData } from './models/LoginData';
import { Status } from './models/Status';
import { User } from './models/User';
import { useRequest } from 'hooks/useRequest';
import { useLoginMessages } from './AuthMessages';
import { getItem } from 'helpers/localStorage';

export const AuthProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState<Status>('pending');
  const [user, setUser] = useState<User>();

  const loginMessages = useLoginMessages();

  const login = useRequest(_login, loginMessages);

  useEffect(() => {
    setTimeout(() => setStatus('out'), 2000);
  }, []);

  const handleLogin = async (data: LoginData) => {
    const user = await login({ data });

    console.log(await getItem('token'));

    console.log({ user });

    if (user) {
      setUser(user);
      setStatus('in');
    }
  };

  const contextValue: AuthContextProps = {
    status,
    user,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
