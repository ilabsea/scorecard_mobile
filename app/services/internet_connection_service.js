import NetInfo from '@react-native-community/netinfo';
import toastMessageUtil from '../utils/toast_message_util';

const internetConnectionService = (() => {
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
    toastMessageUtil.showMessage(message);
  }
})();

export default internetConnectionService;
