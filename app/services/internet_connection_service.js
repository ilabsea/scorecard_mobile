import { ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const internetConnentService = (() => {
  return {
    watchConnection,
    hasConnection,
    showAlertMessage,
  }

  function watchConnection(callback) {
    NetInfo.addEventListener((state) => {
      callback(hasConnection(state));
    });
  }

  function hasConnection(state) {
    return state.isInternetReachable != null && state.isInternetReachable;
  }

  function showAlertMessage(message) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      150
    );
  }
})();

export default internetConnentService;