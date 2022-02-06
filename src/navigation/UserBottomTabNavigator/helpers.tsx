/* eslint-disable react-hooks/rules-of-hooks */
import { Text } from 'components/Text';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserBottomTabNavigatorProps } from '.';
import { useMessages } from './UserBottomTabNavigatorMessages';
import { useStyles } from './UserBottomTabNavigatorStyles';

export const getTabBarIcon = (
  route: keyof UserBottomTabNavigatorProps,
  color: string,
) => {
  const icons: Record<keyof UserBottomTabNavigatorProps, string> = {
    assistance: 'location-on',
    assistance2: 'location-on',
  };

  return <Icon name={icons[route]} size={25} color={color} />;
};

export const getTabBarLabel = (
  route: keyof UserBottomTabNavigatorProps,
  color: string,
) => {
  const style = useStyles();
  const messages = useMessages();

  return (
    <Text variant="body2" style={{ color, ...style.tabLabel }}>
      {messages[route]}
    </Text>
  );
};
