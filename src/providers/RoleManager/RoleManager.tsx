import { useAuth } from 'providers/Auth';
import { MechanicAssistanceProvider } from 'providers/MechanicAssistance';
import { UserAssistanceProvider } from 'providers/UserAssistance';
import React, { FC } from 'react';

export const RoleManager: FC = ({ children }) => {
  const auth = useAuth();
  const role = auth.user?.role;

  return role === 'mechanic' ? (
    <MechanicAssistanceProvider>{children}</MechanicAssistanceProvider>
  ) : role === 'user' ? (
    <UserAssistanceProvider>{children}</UserAssistanceProvider>
  ) : (
    <>{children}</>
  );
};
