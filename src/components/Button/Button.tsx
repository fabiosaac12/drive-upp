import React from 'react';
import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useStyles } from './ButtonStyles';
import { Text } from '../Text/Text';

interface Props extends TouchableOpacityProps {
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'background';
  title?: string;
  variant?: 'outlined' | 'filled';
  text?: TextProps;
}

export const Button: React.FC<Props> = ({
  color = 'primary',
  title,
  style,
  children,
  variant = 'filled',
  ...props
}) => {
  const styles = useStyles({ variant, color, disabled: !!props.disabled });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button, Array.isArray(style) ? [...style] : style]}
      {...props}
    >
      {children ? (
        children
      ) : (
        <Text
          variant="button"
          {...props.text}
          style={[styles.text, props.text?.style]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
