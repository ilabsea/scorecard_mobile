import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppNavigator from './app/navigators/app_navigator';
import * as Sentry from '@sentry/react-native';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

Sentry.init({
  dsn: 'https://5f4fd35d83f1473291df0123fca8ec00@o357910.ingest.sentry.io/5424146',
});

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
