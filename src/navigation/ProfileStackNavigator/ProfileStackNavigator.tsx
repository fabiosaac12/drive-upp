import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'providers/Theme';
import { useAuth } from 'providers/Auth';
import { ProfileScreen } from 'screens/ProfileScreen';
import { EditProfileScreen } from 'screens/EditProfileScreen';

export type ProfileStackNavigatorParams = {
  info: undefined;
  edit: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackNavigatorParams>();

export const ProfileStackNavigator = () => {
  const { theme } = useTheme();
  const auth = useAuth();

  if (auth.status === 'pending') {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.background.main,
        },
        orientation: 'portrait_up',
      }}
    >
      {auth.status === 'out' ? (
        <>
          <Stack.Screen name="info" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="edit" component={EditProfileScreen} />
      )}
    </Stack.Navigator>
  );
};
