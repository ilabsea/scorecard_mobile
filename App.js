import 'react-native-gesture-handler';
import React, { useEffect, useContext, useState } from 'react';
import {Node} from 'react';
import { AppState, Text, TextInput } from 'react-native';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1
import { Provider } from 'react-redux';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AppNavigator, { navigationRef } from './app/navigators/app_navigator';

import configureStore from './app/store/configureStore';

import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';
import { FontSize, FontFamily } from './app/assets/stylesheets/theme/font';
import Color from './app/themes/color';

import scorecardDeletionService from './app/services/scorecard_deletion_service';
import endpointMigrationService from './app/services/endpoint_migration_service';
import indicatorMigrationService from './app/services/indicator_migration_service';
import scorecardEndpointService from './app/services/scorecard_endpoint_service';
import reLoginService from './app/services/re_login_service';
import appStatusService from './app/services/app_status_service';

import { LocalizationProvider, LocalizationContext } from './app/components/Translations';
import { NavigationContainer } from '@react-navigation/native';

import notificationService from './app/services/notification_service';
import { SELECTED_FILTERS } from './app/constants/main_constant';
import settingHelper from './app/helpers/setting_helper';
import { checkDeviceNavType } from './app/utils/responsive_util';

Sentry.init({
  dsn: 'https://5f4fd35d83f1473291df0123fca8ec00@o357910.ingest.sentry.io/5424146',
});

const store = configureStore();

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
    thin: { fontFamily: FontFamily.body },
  }
};

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const App: () => Node = () => {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    checkDeviceNavType();
    setLoading(false);
    SplashScreen.hide();
    appStatusService.checkAppVersionSyncStatus();

    // Clear the unsaved data of the setting when the app is freshly lauching,
    // to prevent the setting screen from using the unsaved data after the user killed the app
    settingHelper.clearTempSettingData();

    AppState.addEventListener("change", (nextAppState) => {
      scorecardDeletionService.deleteExpiredScorecardCard();
    });

    AsyncStorage.removeItem(SELECTED_FILTERS);
    AsyncStorage.removeItem('HANDLE_DEEP_LINK')

    notificationService.handleAppOpenFromNotification();
    settingHelper.checkDefaultProposedIndicatorMethod();
    endpointMigrationService.handleEndpointMigration();
    scorecardEndpointService.handleScorecardEndpointUrlMigration();
    reLoginService.initReLoginStatus();
    appStatusService.handleAppInstallingStatus();
    indicatorMigrationService.checkAndRemoveIndicatorAndLanguageIndicator();
  }, []);

  return (
    <SafeAreaProvider>
      <LocalizationProvider>
        <Provider store={store}>
          <PaperProvider style={{flex: 1}} theme={theme}>
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetModalProvider>
                <SafeAreaView edges={{top: 'off', bottom: 'maximum'}} style={{flex: 1}}>
                  <NavigationContainer ref={navigationRef}>
                    { !loading && <AppNavigator /> }
                  </NavigationContainer>
                </SafeAreaView>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </PaperProvider>
        </Provider>
      </LocalizationProvider>
    </SafeAreaProvider>
  );
};

export default App;
