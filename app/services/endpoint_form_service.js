import AsyncStorage from '@react-native-community/async-storage';
import validationService from './validation_service';
import { defaultEndpointUrls } from '../constants/url_constant';
import { ENDPOINT_VALUE_FIELDNAME } from '../constants/endpoint_constant';
import urlUtil from '../utils/url_util';

const endpointFormService = (() => {
  return {
    isValidForm,
    saveEndpointUrls,
    getEndpointUrls,
    getErrorMessage,
    isEndpointExisted,
    setTemporarySelectedEndpoint,
    getTemporarySelectedEndpoint,
  }

  function isValidForm(endpointLabel, endpointValue, endpointUrls) {
    const endpointLabelValidationMsg = validateField('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = validateField('endpointValue', endpointValue );

    if (!endpointLabel || endpointLabelValidationMsg != null || endpointValueValidationMsg != null || isEndpointExisted(endpointLabel, endpointValue, endpointUrls))
      return false;

    return urlUtil.isUrlValid(endpointValue);
  }

  async function saveEndpointUrls(newLabel, newValue) {
    let endpointUrls = JSON.parse(await AsyncStorage.getItem('ENDPOINT_URLS'));
    endpointUrls.push({ label: newLabel, value: newValue });
    AsyncStorage.setItem('ENDPOINT_URLS', JSON.stringify(endpointUrls));
  }

  async function getEndpointUrls() {
    let endpointUrls = JSON.parse(await AsyncStorage.getItem('ENDPOINT_URLS'));

    if (!endpointUrls) {
      endpointUrls = defaultEndpointUrls;
      AsyncStorage.setItem('ENDPOINT_URLS', JSON.stringify(endpointUrls));
    }
    endpointUrls.push({ label: 'Add new URL endpoint', value: '' });
    return endpointUrls;
  }

  function getErrorMessage(fieldName, value, endpointUrls) {
    const endpointErrorMessage = {
      'endpointValue': {
        'alreadyExistedMsg': 'endpointValueIsExisted',
        'blankMsg': 'endpointValueRequireMsg',
        'invalidMsg': !urlUtil.isUrlValid(value) ? 'endpointValueIsNotValid' : '',
      },
      'endpointLabel': {
        'alreadyExistedMsg': 'endpointLabelIsExisted',
        'blankMsg': 'endpointLabelRequireMsg',
        'invalidMsg': '',
      }
    };

    if (!value) return endpointErrorMessage[fieldName]['blankMsg'];

    const type = fieldName === ENDPOINT_VALUE_FIELDNAME ? 'value' : 'label';
    const messageType = isFieldExisted(type, value, endpointUrls) ? 'alreadyExistedMsg' : 'invalidMsg';
    return endpointErrorMessage[fieldName][messageType];
  }

  function setTemporarySelectedEndpoint(endpointUrl) {
    if (!!endpointUrl)
      AsyncStorage.setItem('TEMP_ENDPOINT_URL', endpointUrl)
  }

  async function getTemporarySelectedEndpoint() {
    return await AsyncStorage.getItem('TEMP_ENDPOINT_URL');
  }

  // private method
  function validateField(fieldName, value) {
    validationService(fieldName, value === '' ? undefined : value);
  }

  function isEndpointExisted(endpointLabel, endpointValue, endpointUrls) {
    return isFieldExisted('label', endpointLabel, endpointUrls) || isFieldExisted('value', endpointValue, endpointUrls);
  }

  function isFieldExisted(type, value, endpointUrls) {
    return endpointUrls.filter(endpoint => endpoint[type] === value).length > 0;
  }
})();

export default endpointFormService;