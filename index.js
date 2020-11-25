/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setCustomText } from 'react-native-global-props';
import { FontSize, FontFamily } from './app/assets/stylesheets/theme/font';

const customTextProps = {
  style: {
    fontSize: FontSize.body,
    fontFamily: FontFamily.body,
    color: '#111'
  }
};

setCustomText(customTextProps);

AppRegistry.registerComponent(appName, () => App);
