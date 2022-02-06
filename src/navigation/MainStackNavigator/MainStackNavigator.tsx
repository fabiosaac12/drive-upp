import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'providers/Theme';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { SignUpScreen } from 'screens/SignUpScreen';
import { CustomHeader } from './CustomHeader';
import { LoginScreen } from 'screens/LoginScreen';
import { useAuth } from 'providers/Auth';
import { HomeScreen } from 'screens/HomeScreen';
import { RecoveryPasswordScreen } from 'screens/RecoveryPasswordScreen';
import { ResetPasswordScreen } from 'screens/ResetPasswordScreen';

export type MainStackNavigatorParams = {
  welcome: undefined;
  signUp: undefined;
  login?: {
    email?: string;
  };
  home: undefined;
  recoveryPassword: {
    email: string;
  };
  resetPassword: {
    email: string;
  };
};

const Stack = createNativeStackNavigator<MainStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<MainStackNavigatorParams>();

export const MainStackNavigator = () => {
  const { theme } = useTheme();
  const auth = useAuth();

  if (auth.status === 'pending') {
    return null;
  }

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator
        screenOptions={{
          header: CustomHeader,
          contentStyle: {
            backgroundColor: theme.palette.background.main,
          },
          orientation: 'portrait_up',
        }}
      >
        {auth.status === 'out' ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="welcome"
              component={WelcomeScreen}
            />
            <Stack.Screen name="signUp" component={SignUpScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen
              name="recoveryPassword"
              component={RecoveryPasswordScreen}
            />
            <Stack.Screen
              name="resetPassword"
              component={ResetPasswordScreen}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
            component={HomeScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
