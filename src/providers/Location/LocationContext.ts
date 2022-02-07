import { createContext, MutableRefObject } from 'react';
import { Location } from './models/Location';

export type LocationContextProps = {
  locationRef: MutableRefObject<Location | undefined>;
};

export const LocationContext = createContext<LocationContextProps>(
  {} as LocationContextProps,
);
