import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../../providers/Theme';
import { WelcomeScreen } from 'screens/WelcomeScreen';

export type MainStackNavigatorParams = {
  welcome: undefined;
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
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.palette.background.main,
          },
          orientation: 'portrait_up',
        }}
      >
        <Stack.Screen name="welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
