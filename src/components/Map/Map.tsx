/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, FC } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useStyles } from './MapStyles';
import { useLocation } from './hooks/useLocation';
import { Location } from 'providers/Location/models/Location';
import { FloatingActionIconButton } from 'components/FloatingActionIconButton';
import { Image, View } from 'react-native';
import { usePermissions } from 'providers/Permissions';
import { useTheme } from 'providers/Theme';
import { useAuth } from 'providers/Auth';
import { config } from 'config';
import { Follow } from './Follow';
import { images } from 'assets/images';

interface Props {
  secondPoint?: Location;
}

export const Map: FC<Props> = ({ secondPoint }) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const permissions = usePermissions();
  const auth = useAuth();

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
  const [follow, setFollow] = useState<Follow>('user');

  useEffect(() => {
    follow === 'secondPoint' &&
      mapRef.current?.animateCamera({
        center: secondPoint,
      });

    follow === 'user' &&
      location &&
      mapRef.current?.animateCamera({
        center: location,
      });
  }, [follow, location, secondPoint]);

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
        onTouchStart={() => setFollow(undefined)}
        // initialRegion={{
        //   ...location,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        {secondPoint && (
          <>
            <Marker
              coordinate={secondPoint}
              onPress={() => setFollow('secondPoint')}
            >
              <Image
                style={styles.markerImage}
                source={
                  auth.user?.role === 'mechanic' ? images.bike : images.mechanic
                }
              />
            </Marker>

            {/* <MapViewDirections
              origin={auth.user?.role === 'mechanic' ? location : secondPoint}
              mode="BICYCLING"
              destination={
                auth.user?.role === 'mechanic' ? secondPoint : location
              }
              apikey={config.googleMapsApiKey}
            /> */}
          </>
        )}
      </MapView>

      <FloatingActionIconButton
        color="primary"
        iconName="location-searching"
        variant="filled"
        position="br"
        onPress={() => setFollow('user')}
      />
    </View>
  );
};
