import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MobileTokenApi from '../api/MobileTokenApi';
import uuidv4 from '../utils/uuidv4';

const TOKEN_KEY = 'registeredToken';

const MobileTokenService = (() => {
  return {
    handleSyncingToken: handleSyncingToken,
    updateToken: updateToken
  }

  function handleSyncingToken() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        messaging()
          .getToken()
          .then(token => {
            console.log('== firebase token == ', token)
            return handleToken(token);
          });
      }
    });

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
    let Api = new MobileTokenApi();
    Api.put(data)
      .then(res => {
        if(res.status == 200) {
          saveToken(res.data);
        }
      });
  }

  async function updateToken(program_id) {
    if (!program_id) return;

    messaging()
      .getToken()
      .then(token => {
        AsyncStorage.getItem(TOKEN_KEY, (error, storageToken) => {
          let jsonValue = JSON.parse(storageToken) || {};
          let data = { mobile_token: {token: token, id: jsonValue.id, program_id: program_id} };
          let Api = new MobileTokenApi();

          Api.put(data)
            .then(res => {
              if(res.status == 200) {
                saveToken(res.data);
              }
            });
        })
      });
  }

  async function saveToken(value) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(value));
    } catch (e) {
    }
  }
})();

export default MobileTokenService;
