import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(3),
      textTransform: 'none',
    },
    distanceContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing(2),
    },
    distanceLabel: {
      fontWeight: 'bold',
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginTop: theme.spacing(3),
    },
    acceptButton: {
      backgroundColor: theme.palette.white,
      borderColor: theme.palette.white,
      marginLeft: theme.spacing(2),
    },
    acceptButtonText: {
      color: theme.palette.background[300],
    },
  }),
);
