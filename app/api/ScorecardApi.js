import AsyncStorage from '@react-native-community/async-storage';
import BaseApi from './BaseApi';
import { APP_LANGUAGE } from '../constants/main_constant';

class ScorecardApi extends BaseApi {
  constructor() {
    super('scorecards', '');
  }

  load = async (id) => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id,
      method: 'GET',
      params: { locale: currentLanguage },
      cancelToken: this.cancelTokenSource.token,
    };

    return BaseApi.request(options);
  }

  put = (id, data) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id,
      method: 'PUT',
      data: data,
    };

    return BaseApi.request(options);
  }
}

export default ScorecardApi;
