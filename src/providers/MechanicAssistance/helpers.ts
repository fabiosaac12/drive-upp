import Geolocation from 'react-native-geolocation-service';
import BackgroundService, {
  BackgroundTaskOptions,
} from 'react-native-background-actions';
import { sendLocation } from 'config/api/requests/assistance';
import { getItem, setItem } from 'helpers/localStorage';

const startSendingLocation = async () => {
  await new Promise(async (_resolve) => {
    const locationWatcherId = Geolocation.watchPosition(
      async (position) => {
        try {
          console.log(
            'done from mechanic',
            await sendLocation({ data: position.coords }),
          );
        } catch {}
      },
      (error) => console.log(error),
      { enableHighAccuracy: true },
    );

    setItem('locationWatcherId', locationWatcherId);
  });
};

export const startBackgroundService = () => {
  const options: BackgroundTaskOptions = {
    taskName: 'locationListener',
    taskTitle: 'Asistencia en progreso',
    taskDesc: 'Hay una asistencia en progreso. Toca para mas detalles.',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
  };

  if (!BackgroundService.isRunning()) {
    BackgroundService.start(startSendingLocation, options);
  }
};

export const stopBackgroundService = async () => {
  BackgroundService.isRunning() && BackgroundService.stop();

  const locationWatcherId = await getItem<number>('locationWatcherId');

  locationWatcherId && Geolocation.clearWatch(locationWatcherId);
};
