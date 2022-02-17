/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  login as _login,
  signUp as _signUp,
  recoveryPassword as _recoveryPassword,
  resetPassword as _resetPassword,
  logout as _logout,
  refreshToken as _refreshToken,
} from 'config/api/backend/requests/auth';
import { AuthContext, AuthContextProps } from './AuthContext';
import { LoginData } from './models/LoginData';
import { Status } from './models/Status';
import { User } from './models/User';
import { useRequest } from 'hooks/useRequest';
import {
  useLoginMessages,
  useRecoveryPasswordMessages,
  useResetPasswordMessages,
  useSignUpMessages,
} from './AuthMessages';
import { SignUpData } from './models/SignUpData';
import { useModal } from 'providers/Modal';
import { InfoModal } from 'components/InfoModal';
import { RecoveryPasswordData } from './models/RecoveryPasswordData';
import { ResetPasswordData } from './models/ResetPasswordData';

export const AuthProvider: React.FC = ({ children }) => {
  const modal = useModal();
  const loginMessages = useLoginMessages();
  const signUpMessages = useSignUpMessages();
  const resetPasswordMessages = useResetPasswordMessages();
  const recoveryPasswordMessages = useRecoveryPasswordMessages();

  const login = useRequest(_login, { customMessages: loginMessages });
  const signUp = useRequest(_signUp, { customMessages: signUpMessages });
  const logout = useRequest(_logout, { showErrorModal: false });
  const refreshToken = useRequest(_refreshToken, {
    showErrorModal: false,
    showLoader: false,
  });
  const recoveryPassword = useRequest(_recoveryPassword, {
    customMessages: recoveryPasswordMessages,
  });
  const resetPassword = useRequest(_resetPassword, {
    customMessages: resetPasswordMessages,
  });

  const [status, setStatus] = useState<Status>('pending');
  const [user, setUser] = useState<User>();

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

    return !!emailSent;
  };

  const handleRecoveryPassword = async (data: RecoveryPasswordData) => {
    const emailSent = await recoveryPassword({ data });

    return !!emailSent;
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    const done = await resetPassword({ data });

    if (done) {
      modal.handleOpen({
        content: (
          <InfoModal
            title={resetPasswordMessages.success}
            buttonText={resetPasswordMessages.accept}
            variant="primary"
          />
        ),
      });
    }

    return !!done;
  };

  const contextValue: AuthContextProps = {
    status,
    user,
    handleLogin,
    handleLogout,
    handleSignUp,
    handleRecoveryPassword,
    handleResetPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
