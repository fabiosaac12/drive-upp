import React, { FC } from 'react';
import { View } from 'react-native';
import { useModal } from 'providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useMessages } from './UserAssistanceCompleteModalMessages';
import { useStyles } from './UserAssistanceCompleteModalStyles';

export const UserAssistanceCompleteModal: FC = () => {
  const styles = useStyles();
  const messages = useMessages();
  const modal = useModal();

  return (
    <View style={styles.container}>
      <Text variant="button" style={styles.title} color="secondary">
        {messages.title}
      </Text>

      <Text variant="body2" color="text">
        {messages.description}
      </Text>

      <View style={styles.buttonsContainer}>
        <Button
          title={messages.rate}
          color="primary"
          text={{ style: styles.acceptButtonText }}
          onPress={() => modal.handleHide()}
        />
        <Button
          style={styles.acceptButton}
          title={messages.accept}
          onPress={() => modal.handleHide()}
          text={{ style: styles.acceptButtonText }}
        />
      </View>
    </View>
  );
};
