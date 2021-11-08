/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setCustomText } from 'react-native-global-props';
import { FontSize, FontFamily } from './app/assets/stylesheets/theme/font';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

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

// const connectFirebaseAnalytic = async () => {
//   const credentials = {
//     clientId: '1049351278928-tiv593hatrq32q6hta0uq4u1ee1g2c1d.apps.googleusercontent.com',
//     appId: '1:1049351278928:android:da258f8184380c699b9c55',
//     apiKey: 'AIzaSyBprRlL_Gv4Hc0cuy8bs3jIjwDkpU3LmPo',
//     databaseURL: '',
//     storageBucket: 'testing-scorecard.appspot.com',
//     messagingSenderId: '',
//     projectId: 'testing-scorecard',
//   };

//   console.log('Connect firebase analytic ====');

//   await firebase.initializeApp(credentials, { name: 'CSC Mobile' });
// }

// connectFirebaseAnalytic();

AppRegistry.registerComponent(appName, () => App);
