/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setCustomText } from 'react-native-global-props';
import { FontSize, FontFamily } from './app/assets/stylesheets/theme/font';
import messaging from '@react-native-firebase/messaging';
import deepLinkService from './app/services/deep_link_service';

const customTextProps = {
  style: {
    fontSize: FontSize.body,
    fontFamily: FontFamily.body,
    color: '#111'
  }
};

setCustomText(customTextProps);

messaging().onMessage(async remoteMessage => {
  console.log('Message handled in the onMessage!=========', remoteMessage);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!=========', remoteMessage);
});

deepLinkService.watchInitialURL();

AppRegistry.registerComponent(appName, () => App);
