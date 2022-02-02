import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from 'navigation/MainStackNavigator';
import { LanguageProvider } from 'providers/Language';
import { LoaderProvider } from 'providers/Loader';
import { ModalProvider } from 'providers/Modal';
import { PermissionsProvider } from 'providers/Permissions';
import { ThemeProvider } from 'providers/Theme';

export const App = () => (
  <SafeAreaProvider>
    <LanguageProvider defaultLanguage="es">
      <LoaderProvider>
        <PermissionsProvider>
          <ThemeProvider defaultTheme="light">
            <ModalProvider>
              <MainStackNavigator />
            </ModalProvider>
          </ThemeProvider>
        </PermissionsProvider>
      </LoaderProvider>
    </LanguageProvider>
  </SafeAreaProvider>
);
