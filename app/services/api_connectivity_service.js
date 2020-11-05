import AsyncStorage from '@react-native-community/async-storage';

const checkConnection = (callback) => {
  setTimeout(async function () {
    let message = '';
    let type = '';
    let isConnected = await AsyncStorage.getItem('IS_CONNECTED');
    isConnected = JSON.parse(isConnected);

    if (!isConnected) {
      message = 'lowInternetConnectionMsg';
      type = 'error';
    }

    callback(type, message);
  }, 20000);
};

export {checkConnection};