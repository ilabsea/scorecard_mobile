import { ToastAndroid } from 'react-native';

const toastMessageUtil = (() => {
  return {
    showMessage
  }

  function showMessage(message) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      200
    );
  }
})();

export default toastMessageUtil;