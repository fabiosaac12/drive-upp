import React from 'react';
import { View } from 'react-native';
import { useStyles } from './InAssistanceContentStyles';
import { Text } from 'components/Text';
import { useUserAssistance } from 'providers/UserAssistance';

export const InAssistanceContent = () => {
  const styles = useStyles();
  const assistance = useUserAssistance();

  return (
    <View style={styles.container}>
      <Text variant="title" color="secondary">
        {assistance.mechanicLocation &&
          `${assistance.mechanicLocation.distance.value} ${assistance.mechanicLocation.distance.unit}`}
      </Text>
    </View>
  );
};
