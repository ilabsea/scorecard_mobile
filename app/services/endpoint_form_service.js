import AsyncStorage from '@react-native-community/async-storage';
import validationService from './validation_service';
import { defaultEndpointUrls, urlPrefixes } from '../constants/url_constant';
import { ENDPOINT_VALUE_FIELDNAME } from '../constants/endpoint_constant';

const endpointFormService = (() => {
  return {
    isValidForm,
    isValidEndpointValue,
    saveEndpointUrls,
    isEndpointExisted,
    isLabelExisted,
    isValueExisted,
    getEndpointUrls,
    getErrorMessage,
  }

  function isValidForm(endpointLabel, endpointValue, endpointUrls) {
    const endpointLabelValidationMsg = validateField('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = validateField('endpointValue', endpointValue );

    if (!endpointLabel || endpointLabelValidationMsg != null || endpointValueValidationMsg != null || isEndpointExisted(endpointLabel, endpointValue, endpointUrls))
      return false;

    return isValidEndpointValue(endpointValue);
  }

  function isValidEndpointValue(endpointValue) {
    const endpointUrl = endpointValue.replace(/\s/gm, '');

    // Check if the endpointUrl contains only 'https://' or 'http://'
    if (endpointUrl === urlPrefixes[0] || endpointUrl === urlPrefixes[1])
      return false;

    // Check if the endpointUrl has 'https://' or 'http://' as prefix
    for(let i = 0; i < urlPrefixes.length; i++) {
      if (endpointUrl.lastIndexOf(urlPrefixes[i]) == 0) {
        return true;
      }
    }

    return false;
  }

  function isEndpointExisted(endpointLabel, endpointValue, endpointUrls) {
    return isLabelExisted(endpointLabel, endpointUrls) || isValueExisted(endpointValue, endpointUrls);
  }

  function isLabelExisted(endpointLabel, endpointUrls) {
    return endpointUrls.filter(endpoint => endpoint.label === endpointLabel).length > 0;
  }

  function isValueExisted(endpointValue, endpointUrls) {
    return endpointUrls.filter(endpoint => endpoint.value === endpointValue).length > 0;
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
    return endpointUrls;
  }

  function getErrorMessage(fieldName, value, endpointUrls) {
    const isValueField = fieldName === ENDPOINT_VALUE_FIELDNAME;
    const isFieldExisted = isValueField ? isValueExisted(value, endpointUrls) : isLabelExisted(value, endpointUrls);

    if (isFieldExisted)
      return fieldName = isValueField ? 'endpointValueIsExisted' : 'endpointLabelIsExisted';

    if (isValueField && !isValidEndpointValue(value))
      return !!value ? 'endpointValueIsNotValid' : 'endpointValueRequireMsg';

    return '';
  }

  // private method
  function validateField(fieldName, value) {
    validationService(fieldName, value === '' ? undefined : value);
  }
})();

export default endpointFormService;