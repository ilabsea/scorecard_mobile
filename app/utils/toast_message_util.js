import { Toast } from 'native-base';
import Color from '../themes/color';
import { bodyFontSize } from './font_size_util';
import { getDeviceStyle } from './responsive_util';

const toastMessageUtil = (() => {
  return {
    showSuccessMessage,
    showMessage
  }

  function showSuccessMessage(message) {
    _showToast(message, 'success');
  }

  function showMessage(message) {
    _showToast(message, 'normal');
  }

  // private method
  function _showToast(message, type) {
    const backgroundColor = type == 'success' ? Color.successColor : Color.paleBlackColor;

    Toast.show({
      text: message,
      duration: 2000,
      style: {marginBottom: 90, marginHorizontal: 20, borderRadius: 100, width: getDeviceStyle(300, 280), alignSelf: 'center', backgroundColor: backgroundColor},
      textStyle: {textAlign: 'center', fontSize: bodyFontSize()}
    })
  }
})();

export default toastMessageUtil;