import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import MobileTokenApi from '../api/MobileTokenApi';
import pkg from '../../package';
import deviceUtil from '../utils/device_util';
import { TOKEN_SYNCED, TOKEN_REGISTERED } from '../constants/main_constant';

const retryTime = 1;

const MobileTokenService = (() => {
  return {
    handleSyncingToken: handleSyncingToken,
    updateToken,
    getToken
  }

  function handleSyncingToken() {
    AsyncStorage.getItem(TOKEN_SYNCED, (error, isSynced) => {
      if (!isSynced)
        _requestFirebaseToken(retryTime, (token) => sendToken(token));
    });

    // // Listen to whether the token changes
    // return messaging().onTokenRefresh(token => {
    //   handleToken(token);
    // });
  }

  function sendToken(token, programId = '') {
    AsyncStorage.getItem(TOKEN_REGISTERED, (error, storageToken) => {
      let jsonValue = JSON.parse(storageToken) || {};
      if (!!programId && programId == jsonValue.program_id)
        return;

      let params = _getMobileTokenParams(token, jsonValue.id, programId || jsonValue.program_id);
      _sendTokenToApi(params);
    })
  }

  function updateToken(programId) {
    if (!programId) return;

    _requestFirebaseToken(retryTime, (token) => {
      sendToken(token, programId);
    });
  }

  async function getToken() {
    const storageToken = await AsyncStorage.getItem(TOKEN_REGISTERED);
    if (!storageToken)
      return null;

    const jsonValue = JSON.parse(storageToken) || {};
    return jsonValue.token;
  }

  // private function
  function _requestFirebaseToken(count, callback) {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        messaging()
          .getToken()
          .then(token => {
            callback(token);
          })
          .catch(error => {
            if (count === 0)
              return;

            setTimeout(() => {
              _requestFirebaseToken(count - 1, callback);
            }, 2000);
          });
      }
    });
  }

  function _sendTokenToApi(data) {
    new MobileTokenApi().put(data)
      .then(res => {
        if(res.status == 200) {
          AsyncStorage.setItem(TOKEN_REGISTERED, JSON.stringify(res.data));
          AsyncStorage.setItem(TOKEN_SYNCED, 'true');
        }
      });
  }

  function _getMobileTokenParams(token, id = '', programId = '') {
    const params = {
      mobile_token: {
        id: id,
        token: token,
        device_type: deviceUtil.getDeviceType(),
        app_version: pkg.version,
        program_id: programId
      }
    }

    DeviceInfo.getAndroidId().then((androidId) => params.mobile_token.device_id = androidId);
    return params;
  }
})();

export default MobileTokenService;