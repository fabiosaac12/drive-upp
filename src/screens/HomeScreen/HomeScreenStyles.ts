import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(2),
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);
