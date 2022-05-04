import AsyncStorage from '@react-native-community/async-storage';
import validationService from './validation_service';
import { defaultEndpointUrls } from '../constants/url_constant';
import { ENDPOINT_VALUE_FIELDNAME } from '../constants/endpoint_constant';
import { CUSTOM, DEFAULT } from '../constants/main_constant';
import urlUtil from '../utils/url_util';
import Scorecard from '../models/Scorecard';

const ENDPOINT_URLS = 'ENDPOINT_URLS';

const endpointFormService = (() => {
  return {
    isValidForm,
    saveEndpointUrls,
    getEndpointUrls,
    getErrorMessage,
    isEndpointExisted,
    setTemporarySelectedEndpoint,
    getTemporarySelectedEndpoint,
    deleteEndpointUrl,
    isAllowToDeleteOrEdit,
  }

  function isValidForm(endpointLabel, endpointValue, endpointUrls, editEndpoint) {
    const endpointLabelValidationMsg = validateField('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = validateField('endpointValue', endpointValue );

    if (!endpointLabel || endpointLabelValidationMsg != null || endpointValueValidationMsg != null || isEndpointExisted(endpointLabel, endpointValue, endpointUrls, editEndpoint))
      return false;

    return urlUtil.isUrlValid(endpointValue);
  }

  async function saveEndpointUrls(newLabel, newValue, editEndpoint) {
    let endpointUrls = JSON.parse(await AsyncStorage.getItem(ENDPOINT_URLS));

    if (!!editEndpoint) {
      const index = endpointUrls.map(endpoint => endpoint.value).indexOf(editEndpoint.value);
      endpointUrls[index] = { label: newLabel, value: newValue, type: CUSTOM };
    }
    else
      endpointUrls.push({ label: newLabel, value: newValue, type: CUSTOM });

    AsyncStorage.setItem(ENDPOINT_URLS, JSON.stringify(endpointUrls));
  }

  async function getEndpointUrls() {
    let endpointUrls = JSON.parse(await AsyncStorage.getItem(ENDPOINT_URLS));

    if (!endpointUrls) {
      endpointUrls = defaultEndpointUrls;
      AsyncStorage.setItem(ENDPOINT_URLS, JSON.stringify(endpointUrls));
    }

    return getEndpointUrlsWithType(endpointUrls);
  }

  function getErrorMessage(fieldName, value, endpointUrls, editEndpoint) {
    const endpointErrorMessage = {
      'endpointValue': {
        'alreadyExistedMsg': 'serverUrlIsExisted',
        'blankMsg': 'serverUrlRequireMsg',
        'invalidMsg': !urlUtil.isUrlValid(value) ? 'serverUrlIsNotValid' : '',
      },
      'endpointLabel': {
        'alreadyExistedMsg': 'serverLabelIsExisted',
        'blankMsg': 'serverLabelRequireMsg',
        'invalidMsg': '',
      }
    };

    if (!value) return endpointErrorMessage[fieldName]['blankMsg'];

    const type = fieldName === ENDPOINT_VALUE_FIELDNAME ? 'value' : 'label';
    const messageType = isFieldExisted(type, value, endpointUrls, editEndpoint) ? 'alreadyExistedMsg' : 'invalidMsg';
    return endpointErrorMessage[fieldName][messageType];
  }

  function setTemporarySelectedEndpoint(endpointUrl) {
    if (!!endpointUrl)
      AsyncStorage.setItem('TEMP_ENDPOINT_URL', endpointUrl)
  }

  async function getTemporarySelectedEndpoint() {
    return await AsyncStorage.getItem('TEMP_ENDPOINT_URL');
  }

  async function deleteEndpointUrl(endpointUrl) {
    let endpointUrls = await getEndpointUrls();
    endpointUrls = endpointUrls.filter(endpoint => endpoint.value != endpointUrl.value);
    AsyncStorage.setItem(ENDPOINT_URLS, JSON.stringify(endpointUrls));
  }

  async function isAllowToDeleteOrEdit(editEndpoint, selectedEndpoint) {
    if (!await Scorecard.allScorecardContainEndpointUrl(editEndpoint.value))
      return !!editEndpoint && editEndpoint.value != selectedEndpoint;
    
    return false;
  }

  // private method
  function validateField(fieldName, value) {
    validationService(fieldName, value === '' ? undefined : value);
  }

  function isEndpointExisted(endpointLabel, endpointValue, endpointUrls, editEndpoint) {
    return isFieldExisted('label', endpointLabel, endpointUrls, editEndpoint) || isFieldExisted('value', endpointValue, endpointUrls, editEndpoint);
  }

  function isFieldExisted(type, value, endpointUrls, editEndpoint) {
    const isSameEditEndpoint = !!editEndpoint ? editEndpoint[type] === value : false;
    return !isSameEditEndpoint && endpointUrls.filter(endpoint => endpoint[type] === value).length > 0;
  }

  function getEndpointUrlsWithType(endpointUrls) {
    let newEndpointUrls = endpointUrls;
    newEndpointUrls.map((newEndpointUrl, index) => {
      if (!newEndpointUrl.type)
        newEndpointUrl.type = (index == 0 || index == 1) ? DEFAULT : CUSTOM;
    });

    return newEndpointUrls;
  }
})();

export default endpointFormService;