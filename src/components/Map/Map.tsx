/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useStyles } from './MapStyles';
import { useLocation } from './hooks/useLocation';
import { Location } from 'providers/Location/models/Location';
import { FloatingActionIconButton } from 'components/FloatingActionIconButton';
import { View } from 'react-native';
import { usePermissions } from 'providers/Permissions';
import { useTheme } from 'providers/Theme';

export const Map = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const permissions = usePermissions();

  // const { location, watchPosition, stopWatchingPosition, watching } =
  //   useLocation();

  // useEffect(() => {
  //   watchPosition();
  // }, []);

  useEffect(() => {
    if (permissions.location?.status !== 'granted') {
      permissions.location?.request();
    }
  }, [permissions.location?.status]);

  const mapRef = useRef<MapView>();
  const [location, setLocation] = useState<Location>();
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    follow &&
      location &&
      mapRef.current?.animateCamera({
        center: location,
      });
  }, [follow, location]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(el: MapView) => {
          if (el) {
            mapRef.current = el;
          }
        }}
        style={styles.map}
        showsUserLocation={true}
        onUserLocationChange={(event) =>
          setLocation(event.nativeEvent.coordinate)
        }
        showsMyLocationButton={false}
        minZoomLevel={16}
        onTouchStart={() => setFollow(false)}
        // initialRegion={{
        //   ...location,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      />
      <FloatingActionIconButton
        color="primary"
        iconName="location-searching"
        variant="filled"
        position="br"
        onPress={() => setFollow(true)}
      />
    </View>
  );
};
