import { useLoader } from 'providers/Loader';
import React, { useEffect, useState } from 'react';
import { AuthContext, AuthContextProps } from './AuthContext';
import { LoginData } from './models/LoginData';
import { Status } from './models/Status';
import { User } from './models/User';

export const AuthProvider: React.FC = ({ children }) => {
  const loader = useLoader();

  const [status, setStatus] = useState<Status>('pending');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setTimeout(() => setStatus('out'), 2000);
  }, []);

  const handleLogin = ({ email, password }: LoginData) => {
    loader.handleShow();

    setTimeout(() => {
      setUser({
        _id: '61fc10af06c567a3f96982ab',
        email: 'fabiosaac12@gmail.com',
        name: 'Fabio',
        lastName: 'Bermudez',
        phone: '123456789123',
        rut: 'ss',
        photo:
          'https://res.cloudinary.com/djwc3zrlu/image/upload/v1626062878/ky8ssjpijbkt5vfgor72.png',
        role: 'user',
        createdAt: '2022-02-03T17:28:15.907Z',
      });

      setStatus('in');
      loader.handleHide();
    }, 2000);
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
