import { Distance } from 'providers/Location/models/Distance';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useMessages } from './UserNeedsHelpModalMessages';
import { useStyles } from './UserNeedsHelpStyles';

interface Props {
  onAccept: () => void;
  distance: Distance;
}

export const UserNeedsHelpModal: FC<Props> = ({ onAccept, distance }) => {
  const styles = useStyles();
  const messages = useMessages();
  const modal = useModal();

  return (
    <View style={styles.container}>
      <Text variant="button" style={styles.title} color="secondary">
        {messages.title}
      </Text>

      <View style={styles.distanceContainer}>
        <Text variant="title2" color="secondary" style={styles.distanceLabel}>
          {messages.distance}
        </Text>
        <Text variant="title2" color="secondary">
          {distance.value} {messages[distance.unit]}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title={messages.accept}
          color="primary"
          onPress={() => {
            onAccept();
            modal.handleHide();
          }}
        />
        <Button
          title={messages.reject}
          style={styles.rejectButton}
          text={{ style: styles.rejectButtonText }}
          onPress={() => modal.handleHide()}
        />
      </View>
    </View>
  );
};
