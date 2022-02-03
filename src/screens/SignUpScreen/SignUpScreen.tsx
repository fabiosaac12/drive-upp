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
import { SignUpForm } from './SignUpForm';
import { useMessages } from './SignUpScreenMessages';
import { useStyles } from './SignUpScreenStyles';

interface Props
  extends NativeStackScreenProps<MainStackNavigatorParams, 'login'> {}

export const SignUpScreen: FC<Props> = ({ navigation }) => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView>
        <View style={styles.container}>
          <SignUpForm />

          <View style={styles.haveAccountContainer}>
            <Text color="text2">{messages.haveAccount}</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('login')}
            >
              <Text style={styles.loginText}>{messages.login}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};