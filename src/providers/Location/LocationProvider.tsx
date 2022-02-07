import Geolocation from 'react-native-geolocation-service';
import { Location } from 'providers/Location/models/Location';
import React, { useEffect, useRef } from 'react';
import { FC } from 'react';
import { LocationContext } from './LocationContext';

export const LocationProvider: FC = ({ children }) => {
  const locationRef = useRef<Location>();

  useEffect(() => {
    const watchingId = Geolocation.watchPosition(
      (position) => (locationRef.current = position.coords),
      (error) => console.log(error),
      { enableHighAccuracy: true },
    );

    return () => {
      Geolocation.clearWatch(watchingId);
    };
  });

  const contextValue = {
    locationRef,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
