import React from 'react';
import { View } from 'react-native';
import { useStyles } from './InAssistanceContentStyles';
import { Text } from 'components/Text';
import { useUserAssistance } from 'providers/UserAssistance';
import { Button } from 'components/Button';
import { useMessages } from './InAssistanceContentMessages';

export const InAssistanceContent = () => {
  const styles = useStyles();
  const messages = useMessages();
  const assistance = useUserAssistance();

  return (
    <View style={styles.container}>
      <Text variant="title" color="secondary">
        {assistance.mechanicLocation &&
          `${assistance.mechanicLocation.distance.value} ${assistance.mechanicLocation.distance.unit}`}
      </Text>

      <View style={styles.buttonsContainer}>
        <Button
          title={messages.complete}
          color="primary"
          style={styles.button}
          onPress={assistance.completeAssistance}
        />
        <Button
          color="danger"
          title={messages.cancel}
          style={styles.button}
          onPress={assistance.cancelAssistance}
        />
      </View>
    </View>
  );
};
