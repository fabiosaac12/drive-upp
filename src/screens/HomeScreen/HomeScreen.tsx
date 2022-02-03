import { images } from 'assets/images';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { withLayout } from '../../hoc';
import { useMessages } from './HomeScreenMessages';
import { useStyles } from './HomeScreenStyles';
import { MenuItem } from './MenuItem';

const icons = {
  bicycleParking: images.bike,
  assistance: images.advertising,
  basicMechanics: images.tips,
  help: images.nut,
};

export const HomeScreen: FC = withLayout(() => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.row}>
          <MenuItem
            icon={icons.assistance}
            label={messages.assistance}
            style={styles.menuItem}
          />
          <MenuItem
            icon={icons.bicycleParking}
            label={messages.bicycleParking}
            style={styles.menuItem}
          />
        </View>
        <View style={styles.row}>
          <MenuItem
            icon={icons.basicMechanics}
            label={messages.basicMechanics}
            style={styles.menuItem}
          />
          <MenuItem
            icon={icons.help}
            label={messages.help}
            style={styles.menuItem}
          />
        </View>
      </View>
    </ScrollView>
  );
});
