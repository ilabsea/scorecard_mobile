import DeviceInfo from 'react-native-device-info'

const deviceUtil = (() => {
  return {
    getDeviceType
  }

  function getDeviceType() {
    return DeviceInfo.isTablet() ? 'tablet' : 'mobile';
  }
})();

export default deviceUtil;