import React from 'react';
import { View } from 'react-native';
import { useStyles } from './InAssistanceContentStyles';
import { Text } from 'components/Text';
import { useMechanicAssistance } from 'providers/MechanicAssistance';
import { Button } from 'components/Button';
import { useMessages } from './InAssistanceContentMessages';

export const InAssistanceContent = () => {
  const styles = useStyles();
  const messages = useMessages();
  const assistance = useMechanicAssistance();

  return (
    <View style={styles.container}>
      <Text variant="title" color="secondary">
        {assistance.userLocation &&
          `${assistance.userLocation.distance.value} ${assistance.userLocation.distance.unit}`}
      </Text>

      <View style={styles.buttonsContainer}>
        <Button
          color="danger"
          title={messages.cancel}
          onPress={assistance.cancelAssistance}
        />
      </View>
    </View>
  );
};
