import 'react-native-gesture-handler';
import React, { useEffect, useContext, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage'; // 1
import { Provider } from 'react-redux';

import { StyleProvider } from "native-base";
import getTheme from './app/themes/components';
import material from './app/themes/variables/material';

import AppNavigator from './app/navigators/app_navigator';
import { LocalizationContext } from './app/components/Translations';

import configureStore from './app/store/configureStore';

import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { FontSize, FontFamily } from './app/assets/stylesheets/theme/font';
import Color from './app/themes/color';

Sentry.init({
  dsn: 'https://5f4fd35d83f1473291df0123fca8ec00@o357910.ingest.sentry.io/5424146',
});

const store = configureStore();

const App: () => React$Node = () => {
  const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext); // 1
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('appLanguage').then((language) => {
      translations.setLanguage(language || appLanguage);
      setLoading(false);

      SplashScreen.hide();
    });
  });

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Color.headerColor,
    },
    fonts: {
      ...DefaultTheme.fonts,
      medium: { fontFamily: FontFamily.title },
      regular: { fontFamily: FontFamily.body },
      light: { fontFamily: FontFamily.body },
      thin: { fontFamily: FontFamily.body }
    }
  };

  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(material)}>
        <PaperProvider style={{flex: 1}} theme={theme}>
          { !loading && <AppNavigator /> }
        </PaperProvider>
      </StyleProvider>
    </Provider>
  );
};

export default App;
