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

export type MainStackNavigatorParams = {
  welcome: undefined;
  signUp: undefined;
  login: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<MainStackNavigatorParams>();

export const MainStackNavigator = () => {
  const { theme } = useTheme();

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
        <Stack.Screen
          options={{ headerShown: false }}
          name="welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen name="signUp" component={SignUpScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
