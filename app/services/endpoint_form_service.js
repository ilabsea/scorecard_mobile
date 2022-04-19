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

  async function getEndpointUrls(defaultEndpoint) {
    let endpointUrls = JSON.parse(await AsyncStorage.getItem('ENDPOINT_URLS'));

    if (!endpointUrls) {
      endpointUrls = defaultEndpointUrls;
      AsyncStorage.setItem('ENDPOINT_URLS', JSON.stringify(endpointUrls));
    }

    handleEndpointMigration(defaultEndpoint, endpointUrls);
    endpointUrls.push({ label: 'Add new URL endpoint', value: '' });

    return endpointUrls;
  }

  function getErrorMessage(fieldName, value, endpointUrls) {
    const endpointErrorMessage = {
      'endpointValue': {
        'alreadyExistedMsg': 'endpointValueIsExisted',
        'invalidMsg': !urlUtil.isUrlValid(value) ? 'endpointValueIsNotValid' : '',
        'blankMsg': 'endpointValueRequireMsg',
      },
      'endpointLabel': {
        'alreadyExistedMsg': 'endpointLabelIsExisted',
        'invalidMsg': '',
        'blankMsg': 'endpointLabelRequireMsg',
      }
    };

    const type = fieldName === ENDPOINT_VALUE_FIELDNAME ? 'value' : 'label';
    const messageType = !value ? 'blankMsg' : isFieldExisted(type, value, endpointUrls) ? 'alreadyExistedMsg' : 'invalidMsg';
    return endpointErrorMessage[fieldName][messageType];
  }

  // private method
  function validateField(fieldName, value) {
    validationService(fieldName, value === '' ? undefined : value);
  }

  // If the endpoint from previous version if not exist, add the endpoint to the list item
  // If the endpoint is an IP address, the label will be "Local Develoment Server"
  // If the endpoint is not an IP address, the label will be "Development Server"
  function handleEndpointMigration(defaultEndpoint, endpointUrls) {
    if (!isEndpointExisted('', defaultEndpoint, endpointUrls)) {
      let newEndpointUrls = endpointUrls;
      newEndpointUrls.push({ label: urlUtil.getUrlDefaultLabel(defaultEndpoint), value: defaultEndpoint });
      AsyncStorage.setItem('ENDPOINT_URLS', JSON.stringify(newEndpointUrls));
    }
  }

  function isEndpointExisted(endpointLabel, endpointValue, endpointUrls) {
    return isFieldExisted('label', endpointLabel, endpointUrls) || isFieldExisted('value', endpointValue, endpointUrls);
  }

  function isFieldExisted(type, value, endpointUrls) {
    return endpointUrls.filter(endpoint => endpoint[type] === value).length > 0;
  }
})();

export default endpointFormService;