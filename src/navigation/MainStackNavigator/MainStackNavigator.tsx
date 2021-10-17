import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/HomeScreen';
import { useTheme } from '../../providers/Theme';

export type MainStackNavigatorParams = {
  home: undefined;
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
          contentStyle: {
            backgroundColor: theme.palette.background[100],
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.palette.background[100] },
          headerTitleStyle: {
            fontSize: 21,
          },
          headerTintColor: theme.palette.primary[500],
          orientation: 'portrait_up',
        }}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: 'RN Architecture TS',
            headerTitleStyle: {
              fontSize: 28,
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
