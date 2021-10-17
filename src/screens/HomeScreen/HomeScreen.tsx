import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '../../components/Text';
import { withLayout } from '../../hoc';
import { useMessages } from './HomeScreenMessages';
import { useStyles } from './HomeScreenStyles';

export const HomeScreen: FC = withLayout(() => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>{messages.greeting}</Text>
    </View>
  );
});
