import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.white,
      width: 160,
      height: 160,
      borderRadius: theme.radius(2),
      ...theme.shadows[1],
    },
    icon: {
      height: 100,
      width: 120,
      resizeMode: 'contain',
    },
  }),
);
