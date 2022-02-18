import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'components/Text';
import { SignedOutStackNavigatorParams } from 'navigation/SignedOutStackNavigator';
import React, { FC } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { EditProfileForm } from './EditProfileForm';
import { useMessages } from './EditProfileScreenMessages';
import { useStyles } from './EditProfileScreenStyles';

interface Props
  extends NativeStackScreenProps<SignedOutStackNavigatorParams, 'login'> {}

export const EditProfileScreen: FC<Props> = ({ navigation }) => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView>
        <View style={styles.container}>
          <EditProfileForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
