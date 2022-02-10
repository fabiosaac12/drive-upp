import React, { FC } from 'react';
import { View } from 'react-native';
import { withLayout } from 'hoc';
import { useStyles } from './MechanicAssistanceScreenStyles';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Map } from 'components/Map';
import { SignedInBottomTabNavigatorProps } from 'navigation/SignedInBottomTabNavigator';
import { ServiceActivatorContent } from './ServiceActivatorContent';
import { useMechanicAssistance } from 'providers/MechanicAssistance';
import { WaitingUserLocationContent } from './WaitingUserLocationContent';
import { InAssistanceContent } from './InAssistanceContent';

interface Props
  extends BottomTabScreenProps<SignedInBottomTabNavigatorProps, 'assistance'> {}

export const MechanicAssistanceScreen: FC<Props> = withLayout(() => {
  const styles = useStyles();
  const assistance = useMechanicAssistance();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
      </View>

      <View style={styles.contentContainer}>
        {assistance.status === 'waiting' ? (
          <WaitingUserLocationContent />
        ) : assistance.status === 'helping' ? (
          <InAssistanceContent />
        ) : (
          <ServiceActivatorContent />
        )}
      </View>
    </View>
  );
});
