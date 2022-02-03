import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'components/Text';
import React, { FC } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { MainStackNavigatorParams } from 'navigation/MainStackNavigator';
import { LoginForm } from './LoginForm';
import { useMessages } from './LoginScreenMessages';
import { useStyles } from './LoginScreenStyles';

interface Props
  extends NativeStackScreenProps<MainStackNavigatorParams, 'login'> {}

export const LoginScreen: FC<Props> = ({ navigation }) => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <KeyboardAvoidingView style={styles.flex}>
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <LoginForm />

          <View style={styles.haveAccountContainer}>
            <Text color="text2">{messages.dontHaveAccount}</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('signUp')}
            >
              <Text style={styles.loginText}>{messages.signUp}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
