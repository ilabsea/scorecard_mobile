import 'react-native-gesture-handler';
import React, { useEffect, useContext, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage'; // 1
import {Provider} from 'react-redux';

import { StyleProvider } from "native-base";
import getTheme from './app/themes/components';
import material from './app/themes/variables/material';

import {StyleSheet, View, Text} from 'react-native';

import AppNavigator from './app/navigators/app_navigator';
import { LocalizationContext } from './app/components/Translations';

import configureStore from './app/store/configureStore';

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

  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(material)}>
        <View style={{flex: 1}}>
          { !loading && <AppNavigator /> }
        </View>
      </StyleProvider>
    </Provider>
  );
};

export default App;
