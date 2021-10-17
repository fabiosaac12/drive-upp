import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

interface Props {
  variant:
    | 'title'
    | 'title2'
    | 'subtitle'
    | 'subtitle2'
    | 'body'
    | 'body2'
    | 'button';
  color: 'text' | 'primary' | 'secondary' | 'danger' | 'success' | 'button';
}

export const useStyles = makeStyles((theme, { color, variant }: Props) =>
  StyleSheet.create({
    text: {
      color:
        color === 'button'
          ? theme.palette.text.button
          : color === 'text'
          ? theme.palette.text[
              ['subtitle', 'subtitle2'].includes(variant)
                ? 'secondary'
                : 'primary'
            ]
          : theme.palette[color][500],
      ...theme.text[variant],
    },
  }),
);
