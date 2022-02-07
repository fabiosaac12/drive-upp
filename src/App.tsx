import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from 'navigation/MainStackNavigator';
import { LanguageProvider } from 'providers/Language';
import { LoaderProvider } from 'providers/Loader';
import { ModalProvider } from 'providers/Modal';
import { PermissionsProvider } from 'providers/Permissions';
import { ThemeProvider } from 'providers/Theme';
import { AuthProvider } from 'providers/Auth';
import { SocketProvider } from 'providers/Socket';
import { LocationProvider } from 'providers/Location';
import { UserAssistanceProvider } from 'providers/UserAssistance';

export const App = () => (
  <SafeAreaProvider>
    <LanguageProvider defaultLanguage="es">
      <LoaderProvider>
        <PermissionsProvider>
          <ThemeProvider defaultTheme="light">
            <ModalProvider>
              <LocationProvider>
                <AuthProvider>
                  <SocketProvider>
                    <UserAssistanceProvider>
                      <MainStackNavigator />
                    </UserAssistanceProvider>
                  </SocketProvider>
                </AuthProvider>
              </LocationProvider>
            </ModalProvider>
          </ThemeProvider>
        </PermissionsProvider>
      </LoaderProvider>
    </LanguageProvider>
  </SafeAreaProvider>
);
