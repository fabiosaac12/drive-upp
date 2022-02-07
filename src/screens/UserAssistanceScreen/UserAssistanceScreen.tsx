import React, { FC } from 'react';
import { View } from 'react-native';
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

interface Props
  extends BottomTabScreenProps<UserBottomTabNavigatorProps, 'assistance'> {}

export const UserAssistanceScreen: FC<Props> = withLayout(() => {
  const permissions = usePermissions();
  const modal = useModal();
  const messages = useMessages();
  const styles = useStyles();

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
        ) : null}
      </View>
    </View>
  );
});
