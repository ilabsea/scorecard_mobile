import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MobileTokenApi from '../api/MobileTokenApi';

const TOKEN_KEY = 'registeredToken';
const retryTime = 1;

const MobileTokenService = (() => {
  return {
    handleSyncingToken: handleSyncingToken,
    updateToken: updateToken,
    getToken
  }

  function handleSyncingToken() {
    _requestFirebaseToken(retryTime, (token) => handleToken(token));

    // // Listen to whether the token changes
    // return messaging().onTokenRefresh(token => {
    //   handleToken(token);
    // });
  }

  function handleToken(token) {
    AsyncStorage.getItem(TOKEN_KEY, (error, storageToken) => {
      if(!storageToken) {
        return sendToken(token);
      }

      let jsonValue = JSON.parse(storageToken) || {};

      if(jsonValue.token == token) { return }

      sendToken(token, jsonValue.id);
    })
  }

  async function sendToken(token, id) {
    let data =  { mobile_token: {token: token, id: id} };
    _sendTokenToApi(data);
  }

  async function updateToken(program_id) {
    if (!program_id) return;

    _requestFirebaseToken(retryTime, (token) => {
      AsyncStorage.getItem(TOKEN_KEY, (error, storageToken) => {
        let jsonValue = JSON.parse(storageToken) || {};
        let data = { mobile_token: {token: token, id: jsonValue.id, program_id: program_id} };
        _sendTokenToApi(data);
      })
    });
  }

  async function getToken() {
    const storageToken = await AsyncStorage.getItem(TOKEN_KEY);
    if (!storageToken)
      return null;

    const jsonValue = JSON.parse(storageToken) || {};
    return jsonValue.token;
  }

  // private function

  async function _saveToken(value) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(value));
    } catch (e) {
    }
  }

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
          _saveToken(res.data);
        }
      });
  }
})();

export default MobileTokenService;