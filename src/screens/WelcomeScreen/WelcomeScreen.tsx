import React, { FC } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { withLayout } from 'hoc';
import { Button } from 'components/Button';
import { useMessages } from './WelcomeScreenMessages';
import { useStyles } from './WelcomeScreenStyles';
import { images } from 'assets/images';

export const WelcomeScreen: FC = withLayout(() => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <ImageBackground
      source={images.background}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={{ flex: 2 }} />
      <Image source={images.logo} style={styles.logo} />
      <Image source={images.bikeWhite} style={styles.bikeImage} />
      <Button
        color="background"
        title={messages.signUp}
        style={styles.button}
      />
      <Button
        title={messages.login}
        style={[styles.button, styles.loginButton]}
        text={{ style: styles.loginButtonText }}
      />
      <View style={{ flex: 1 }} />
    </ImageBackground>
  );
});
