import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      padding: theme.spacing(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    menuItem: {
      margin: theme.spacing(1),
    },
  }),
);
