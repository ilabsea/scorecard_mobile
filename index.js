/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setCustomText } from 'react-native-global-props';
import { FontSize, FontFamily } from './app/assets/stylesheets/theme/font';
import deepLinkService from './app/services/deep_link_service';
import notificationService from './app/services/notification_service'

const customTextProps = {
  style: {
    fontSize: FontSize.body,
    fontFamily: FontFamily.body,
    color: '#111'
  }
};

setCustomText(customTextProps);

notificationService.handleReceivePushNotification();

deepLinkService.watchInitialURL();

AppRegistry.registerComponent(appName, () => App);
