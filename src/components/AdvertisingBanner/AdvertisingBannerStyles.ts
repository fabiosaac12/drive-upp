import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius(1.5),
      height: 130,
      width: 250,
      backgroundColor: theme.palette.white,
      ...theme.shadows[1],
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
    },
  }),
);
