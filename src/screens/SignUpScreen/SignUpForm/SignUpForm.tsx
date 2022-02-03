import React from 'react';
import { useMessages } from './SignUpFormMessages';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useStyles } from './SignUpFormStyles';
import { useForm } from './hooks/useForm';

export const SignUpForm = () => {
  const messages = useMessages();
  const styles = useStyles();

  const form = useForm();

  return (
    <>
      <TextField
        autoCapitalize="words"
        value={form.values.name}
        error={form.errors.name}
        onChangeText={(value) => form.setFieldValue('name', value)}
        label={messages.nameLabel}
        placeholder={messages.namePlaceholder}
      />
      <TextField
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.values.email}
        error={form.errors.email}
        onChangeText={(value) => form.setFieldValue('email', value)}
        label={messages.emailLabel}
        placeholder={messages.emailPlaceholder}
      />
      <TextField
        keyboardType="numeric"
        value={form.values.rut}
        error={form.errors.rut}
        onChangeText={(value) => form.setFieldValue('rut', value)}
        label={messages.rutLabel}
        placeholder={messages.rutPlaceholder}
      />
      <TextField
        keyboardType="phone-pad"
        value={form.values.phone}
        error={form.errors.phone}
        onChangeText={(value) => form.setFieldValue('phone', value)}
        label={messages.phoneLabel}
        placeholder={messages.phonePlaceholder}
      />
      <TextField
        secureTextEntry={true}
        value={form.values.password}
        error={form.errors.password}
        onChangeText={(value) => form.setFieldValue('password', value)}
        label={messages.passwordLabel}
        placeholder={messages.passwordPlaceholder}
      />
      <TextField
        secureTextEntry={true}
        value={form.values.passwordConfirmation}
        error={form.errors.passwordConfirmation}
        onChangeText={(value) =>
          form.setFieldValue('passwordConfirmation', value)
        }
        label={messages.passwordConfirmationLabel}
        placeholder={messages.passwordConfirmationPlaceholder}
      />

      <Button
        size="big"
        color="primary"
        title={messages.signUp}
        style={styles.submitButton}
        onPress={form.submitForm}
      />
    </>
  );
};
