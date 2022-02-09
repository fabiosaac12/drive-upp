import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loaderContainer: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    grantPermissionsButtonStyles: {
      alignSelf: 'center',
    },
  }),
);
