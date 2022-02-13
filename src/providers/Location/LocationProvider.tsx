/* eslint-disable no-shadow */
import Geolocation from 'react-native-geolocation-service';
import SystemSetting from 'react-native-system-setting';
import { Location } from 'providers/Location/models/Location';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { LocationContext } from './LocationContext';
import { LocationListener } from './models/LocationListener';

export const LocationProvider: FC = ({ children }) => {
  const locationRef = useRef<Location>();
  const [listeners, setListeners] = useState<LocationListener[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [_enabled, _setEnabled] = useState(false);
  const emitterSubscriptionRef: MutableRefObject<any> = useRef(null);

  useEffect(() => {
    const watchingId = Geolocation.watchPosition(
      (position) => {
        setEnabled(true);

        locationRef.current = position.coords;

        for (let listener of listeners) {
          listener(position.coords);
        }
      },
      () => setEnabled(false),
      { enableHighAccuracy: true },
    );

    return () => {
      Geolocation.clearWatch(watchingId);
    };
  }, [listeners, _enabled]);

  useEffect(() => {
    (async () => {
      const emitterSubscription = await SystemSetting.addLocationListener(
        _setEnabled,
      );

      emitterSubscriptionRef.current = emitterSubscription;
    })();

    return () => SystemSetting.removeListener(emitterSubscriptionRef.current);
  }, []);

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
    enabled,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
