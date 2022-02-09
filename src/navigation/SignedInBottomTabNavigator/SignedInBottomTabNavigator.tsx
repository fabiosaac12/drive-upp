import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStyles } from './SignedInBottomTabNavigatorStyles';
import { getTabBarIcon, getTabBarLabel } from './helpers';
import { HomeScreen } from 'screens/HomeScreen';
import { usePermissions } from 'providers/Permissions';
import { NoPermissionMapScreen } from 'screens/NoPermissionMapScreen';
import { useAuth } from 'providers/Auth';
import { MechanicAssistanceScreen } from 'screens/MechanicAssistanceScreen';
import { UserAssistanceScreen } from 'screens/UserAssistanceScreen';

export type SignedInBottomTabNavigatorProps = {
  assistance: undefined;
  assistance2: undefined;
};

const Tab = createBottomTabNavigator<SignedInBottomTabNavigatorProps>();

export const SignedInBottomTabNavigator = () => {
  const styles = useStyles();
  const permissions = usePermissions();
  const auth = useAuth();

  if (!auth.user) {
    return null;
  }

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
      <Tab.Screen
        name="assistance"
        component={
          permissions.location?.status === 'granted'
            ? auth.user.role === 'mechanic'
              ? MechanicAssistanceScreen
              : UserAssistanceScreen
            : NoPermissionMapScreen
        }
      />
      <Tab.Screen name="assistance2" component={HomeScreen} />
    </Tab.Navigator>
  );
};
