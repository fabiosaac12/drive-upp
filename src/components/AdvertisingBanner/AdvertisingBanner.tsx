import { Text } from 'components/Text';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from './AdvertisingBannerStyles';

export const AdvertisingBanner = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>Banner</Text>
    </View>
  );
};
