/* eslint-disable no-shadow */
import Geolocation from 'react-native-geolocation-service';
import { Location } from 'providers/Location/models/Location';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { LocationContext } from './LocationContext';
import { LocationListener } from './models/LocationListener';

export const LocationProvider: FC = ({ children }) => {
  const locationRef = useRef<Location>();
  const [listeners, setListeners] = useState<LocationListener[]>([]);

  useEffect(() => {
    const watchingId = Geolocation.watchPosition(
      (position) => {
        locationRef.current = position.coords;

        for (let listener of listeners) {
          listener(position.coords);
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true },
    );

    return () => {
      Geolocation.clearWatch(watchingId);
    };
  }, [listeners]);

  const removeListener = (listenerToRemove: LocationListener) => {
    setListeners((listeners) =>
      listeners.filter((listener) => listener !== listenerToRemove),
    );
  };

  const addListener = (listener: LocationListener) => {
    setListeners((listeners) => [...listeners, listener]);
  };

  const contextValue = {
    locationRef,
    removeListener,
    addListener,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
