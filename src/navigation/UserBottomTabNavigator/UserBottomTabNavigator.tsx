import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStyles } from './UserBottomTabNavigatorStyles';
import { getTabBarIcon, getTabBarLabel } from './helpers';
import { HomeScreen } from 'screens/HomeScreen';
import { UserAssistanceScreen } from 'screens/UserAssistanceScreen';

export type UserBottomTabNavigatorProps = {
  assistance: undefined;
  assistance2: undefined;
};

const Tab = createBottomTabNavigator<UserBottomTabNavigatorProps>();

export const UserBottomTabNavigator = () => {
  const styles = useStyles();

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        tabBarLabel: ({ color }) => getTabBarLabel(route.name, color),
        tabBarActiveTintColor: styles.active.color,
        tabBarInactiveTintColor: styles.inactive.color,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="assistance" component={UserAssistanceScreen} />
      <Tab.Screen name="assistance2" component={HomeScreen} />
    </Tab.Navigator>
  );
};
