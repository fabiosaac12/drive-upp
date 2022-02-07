import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { withLayout } from 'hoc';
import { useMessages } from './UserAssistanceScreenMessages';
import { useStyles } from './UserAssistanceScreenStyles';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { UserBottomTabNavigatorProps } from 'navigation/UserBottomTabNavigator';
import { Map } from 'components/Map';
import { usePermissions } from 'providers/Permissions';
import { Button } from 'components/Button';
import { useModal } from 'providers/Modal';
import { openSettings } from 'react-native-permissions';
import { InfoModal } from 'components/InfoModal';
import { AskForAssistanceContent } from './AskForAssistanceContent';
import { useUserAssistance } from 'providers/UserAssistance';
import { useTheme } from 'providers/Theme';

interface Props
  extends BottomTabScreenProps<UserBottomTabNavigatorProps, 'assistance'> {}

export const UserAssistanceScreen: FC<Props> = withLayout(() => {
  const { theme } = useTheme();
  const permissions = usePermissions();
  const modal = useModal();
  const messages = useMessages();
  const styles = useStyles();
  const assistance = useUserAssistance();

  const askForLocationPermission = () => {
    if (permissions.location?.status === 'blocked') {
      modal.handleOpen({
        content: (
          <InfoModal
            title={messages.permissionModalTitle}
            buttonText={messages.openSettings}
            buttonOnPress={openSettings}
          />
        ),
      });
    } else {
      permissions.location?.request();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
      </View>

      <View style={styles.contentContainer}>
        {permissions.location?.status !== 'granted' ? (
          <Button
            color="primary"
            onPress={askForLocationPermission}
            style={styles.grantPermissionsButtonStyles}
            title={messages.grantPermissions}
          />
        ) : assistance.status === 'inactive' ? (
          <AskForAssistanceContent />
        ) : (
          assistance.status === 'searching' && (
            <ActivityIndicator
              size="large"
              color={theme.palette.primary.main}
            />
          )
        )}
      </View>
    </View>
  );
});
