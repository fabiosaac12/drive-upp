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

export const App = () => (
  <SafeAreaProvider>
    <LanguageProvider defaultLanguage="es">
      <LoaderProvider>
        <PermissionsProvider>
          <ThemeProvider defaultTheme="light">
            <ModalProvider>
              <AuthProvider>
                <SocketProvider>
                  <MainStackNavigator />
                </SocketProvider>
              </AuthProvider>
            </ModalProvider>
          </ThemeProvider>
        </PermissionsProvider>
      </LoaderProvider>
    </LanguageProvider>
  </SafeAreaProvider>
);
