import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { withLayout } from 'hoc';
import { useStyles } from './UserAssistanceScreenStyles';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SignedInBottomTabNavigatorProps } from 'navigation/SignedInBottomTabNavigator';
import { Map } from 'components/Map';
import { AskForAssistanceContent } from './AskForAssistanceContent';
import { useUserAssistance } from 'providers/UserAssistance';
import { useTheme } from 'providers/Theme';
import { InAssistanceContent } from './InAssistanceContent';

interface Props
  extends BottomTabScreenProps<SignedInBottomTabNavigatorProps, 'assistance'> {}

export const UserAssistanceScreen: FC<Props> = withLayout(() => {
  const { theme } = useTheme();
  const styles = useStyles();
  const assistance = useUserAssistance();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
      </View>

      <View style={styles.contentContainer}>
        {assistance.status === 'inactive' ? (
          <AskForAssistanceContent />
        ) : assistance.status === 'searching' ? (
          <ActivityIndicator size="large" color={theme.palette.primary.main} />
        ) : (
          assistance.status === 'active' && <InAssistanceContent />
        )}
      </View>
    </View>
  );
});
