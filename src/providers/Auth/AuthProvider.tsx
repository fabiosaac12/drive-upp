/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  login as _login,
  signUp as _signUp,
  logout as _logout,
  refreshToken as _refreshToken,
} from 'config/api/requests/auth';
import { AuthContext, AuthContextProps } from './AuthContext';
import { LoginData } from './models/LoginData';
import { Status } from './models/Status';
import { User } from './models/User';
import { useRequest } from 'hooks/useRequest';
import { useLoginMessages, useSignUpMessages } from './AuthMessages';
import { SignUpData } from './models/SignUpData';
import { useModal } from 'providers/Modal';
import { InfoModal } from 'components/InfoModal';

export const AuthProvider: React.FC = ({ children }) => {
  const modal = useModal();

  const [status, setStatus] = useState<Status>('pending');
  const [user, setUser] = useState<User>();

  const loginMessages = useLoginMessages();
  const signUpMessages = useSignUpMessages();

  const login = useRequest(_login, { customMessages: loginMessages });
  const signUp = useRequest(_signUp, { customMessages: signUpMessages });
  const logout = useRequest(_logout, { showErrorModal: false });
  const refreshToken = useRequest(_refreshToken, {
    showErrorModal: false,
    showLoader: false,
  });

  useEffect(() => {
    (async () => {
      const user = await refreshToken({});

      if (user) {
        setUser(user);
        setStatus('in');
      } else {
        setStatus('out');
      }
    })();
  }, []);

  const handleLogin = async (data: LoginData) => {
    const user = await login({ data });

    if (user) {
      setUser(user);
      setStatus('in');
    }
  };

  const handleLogout = async () => {
    await logout({});

    setUser(undefined);
    setStatus('out');
  };

  const handleSignUp = async (data: SignUpData) => {
    const emailSent = await signUp({ data });

    if (emailSent) {
      modal.handleOpen({
        content: (
          <InfoModal
            title={signUpMessages.emailSent}
            buttonText={signUpMessages.accept}
            variant="primary"
          />
        ),
      });
    }
  };

  const contextValue: AuthContextProps = {
    status,
    user,
    handleLogin,
    handleLogout,
    handleSignUp,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
