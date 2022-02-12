import React, { FC } from 'react';
import { View } from 'react-native';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useMessages } from './MechanicAssistanceCompleteModalMessages';
import { useStyles } from './MechanicAssistanceCompleteModalStyles';

export const MechanicAssistanceCompleteModal: FC = () => {
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

      <Button
        title={messages.accept}
        style={styles.acceptButton}
        color="primary"
        onPress={() => modal.handleHide()}
      />
    </View>
  );
};
