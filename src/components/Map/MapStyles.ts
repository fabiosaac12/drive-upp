import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
