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

// Watch the push notification when the application is running and in the foreground (check)
messaging().onMessage(async remoteMessage => {
  console.log('Message handled in the onMessage!=========', remoteMessage);
});

// Watch the push notification when the application is running or quit, but in the background (check)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!=========', remoteMessage);
});

// When the user clicked on the push notification and the application is running, but in the background (check)
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('when the application running, but in the background = ', remoteMessage);
});

// When the application is opened from a quit state
// messaging().getInitialNotification()
//   .then(remoteMessage => {
//     console.log('================')
//     console.log('when the application is opened from a quit state');
//     console.log('remote message == ', remoteMessage);
//   });

deepLinkService.watchInitialURL();

AppRegistry.registerComponent(appName, () => App);
