import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';

const formDataApi = (() => {
  return {
    post
  }

  async function post(endpoint, params){
    const domain = await AsyncStorage.getItem('ENDPOINT_URL');
    const authToken = await AsyncStorage.getItem('AUTH_TOKEN');
    const apiUrl = domain + endpoint;

    return RNFetchBlob.fetch('POST', apiUrl, {
            Authorization: `Token ${ authToken }`,
            'Content-Type': 'multipart/form-data',
          }, params);
  }
})();

export default formDataApi;