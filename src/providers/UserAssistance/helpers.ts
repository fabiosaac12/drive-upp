import Geolocation from 'react-native-geolocation-service';
import BackgroundService, {
  BackgroundTaskOptions,
} from 'react-native-background-actions';
import { sendLocation } from 'config/api/backend/requests/assistance';
import { getItem, setItem } from 'helpers/localStorage';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import BluetoothManager from 'react-native-ble-manager';
import { BleManager } from 'react-native-ble-plx';

const startSendingLocation = async () => {
  const locationWatcher: Geolocation.SuccessCallback = async (position) => {
    try {
      await sendLocation({ data: position.coords });
    } catch (code) {
      console.log('send location error', code);

      code === 404 && console.log('not assistance');
    }
  };

  Geolocation.getCurrentPosition(
    locationWatcher,
    (error) => console.log('geolocation error', error),
    { enableHighAccuracy: true },
  );

  await new Promise(async (_resolve) => {
    const locationWatcherId = Geolocation.watchPosition(
      locationWatcher,
      (error) => console.log('geolocation error', error),
      { enableHighAccuracy: true },
    );

    setItem('locationWatcherId', locationWatcherId);
  });
};

const startScanningBeacons = async () => {
  await new Promise(async () => {
    Beacons.detectIBeacons();

    try {
      await Beacons.startRangingBeaconsInRegion('REGION1');
      console.log(`Beacons ranging started succesfully!`);
    } catch (error) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }

    // Print a log of the detected iBeacons (1 per second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log('Found beacons!', data.beacons);
    });
  });
};

const delay = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

const startScanningBluetoothDevices = async () => {
  await new Promise(async () => {
    while (true) {
      await BluetoothManager.start({ showAlert: false });
      console.log('Bluetooth service started');

      await BluetoothManager.scan([], 5, true);
      console.log('Scan started');

      await delay(6000);

      const peripheralsArray =
        await BluetoothManager.getDiscoveredPeripherals();
      console.log(
        'Discovered peripherals: ' + JSON.stringify(peripheralsArray, null, 2),
      );

      if (peripheralsArray.length > 0) {
        await BluetoothManager.readRSSI(peripheralsArray[0].id);
      }
    }
  });
};

const startScanningBluetoothDevicesPlx = async () => {
  await new Promise(async () => {
    const manager = new BleManager();

    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log({ error });
      } else {
        console.log(device?.id, device?.name, device?.manufacturerData);

        console.log(device?.serviceData);
        console.log(device?.isConnectable);
        console.log(device);
      }
    });
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
    BackgroundService.start(startScanningBeacons, options);
  }
};

export const stopBackgroundService = async () => {
  if (BackgroundService.isRunning()) {
    BackgroundService.stop();
  }

  const locationWatcherId = await getItem<number>('locationWatcherId');

  locationWatcherId && Geolocation.clearWatch(locationWatcherId);
};
