import AsyncStorage from '@react-native-async-storage/async-storage';
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

  getQrCode = async (id) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/qr_code',
      method: 'GET',
    }

    return BaseApi.request(options);
  }

  getVotingResults = async (id) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/voting_results',
      method: 'GET'
    }
    return BaseApi.request(options);
  }

  getPoll = async (id) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/poll',
      method: 'GET'
    }
    return BaseApi.request(options);
  }
}

export default ScorecardApi;
