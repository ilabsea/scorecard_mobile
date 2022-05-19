import AsyncStorage from '@react-native-community/async-storage';
import validationService from './validation_service';
import { ENDPOINT_VALUE_FIELDNAME } from '../constants/endpoint_constant';
import { CUSTOM } from '../constants/main_constant';
import urlUtil from '../utils/url_util';
import uuidv4 from '../utils/uuidv4';
import Scorecard from '../models/Scorecard';
import EndpointUrl from '../models/EndpointUrl';
import settingHelper from '../helpers/setting_helper';

const endpointFormService = (() => {
  return {
    isValidForm,
    saveEndpointUrls,
    getErrorMessage,
    setTemporarySelectedEndpoint,
    getSelectedEndpoint,
    isAllowToDeleteOrEdit,
  }

  function isValidForm(endpointLabel, endpointValue, editEndpoint) {
    const endpointLabelValidationMsg = validateField('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = validateField('endpointValue', endpointValue );

    if (!endpointLabel || endpointLabelValidationMsg != null || endpointValueValidationMsg != null || isEndpointExisted(endpointLabel, endpointValue, editEndpoint))
      return false;

    return urlUtil.isUrlValid(endpointValue);
  }

  async function saveEndpointUrls(newLabel, newValue, endpointUuid) {
    if (!!endpointUuid)
      EndpointUrl.update(endpointUuid, { label: newLabel, value: newValue });
    else
      EndpointUrl.create({uuid: uuidv4(), label: newLabel, value: newValue, type: CUSTOM});
  }

  function getErrorMessage(fieldName, value, editEndpoint) {
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
    const messageType = isFieldExisted(type, value, editEndpoint) ? 'alreadyExistedMsg' : 'invalidMsg';
    return endpointErrorMessage[fieldName][messageType];
  }

  function setTemporarySelectedEndpoint(endpointUrl) {
    if (!!endpointUrl)
      AsyncStorage.setItem('TEMP_ENDPOINT_URL', endpointUrl)
  }

  async function getSelectedEndpoint() {
    const tempSelectedEndpoint = await AsyncStorage.getItem('TEMP_ENDPOINT_URL');
    return !tempSelectedEndpoint ? settingHelper.getSavedEndpointUrl() : tempSelectedEndpoint;
  }

  function isAllowToDeleteOrEdit(editEndpoint, selectedEndpoint, savedEndpoint) {
    if (!Scorecard.allScorecardContainEndpoint(editEndpoint.value))
      return !!editEndpoint && editEndpoint.value != selectedEndpoint && editEndpoint.value != savedEndpoint;
    
    return false;
  }

  // private method
  function validateField(fieldName, value) {
    validationService(fieldName, value === '' ? undefined : value);
  }

  function isEndpointExisted(endpointLabel, endpointValue, editEndpoint) {
    return isFieldExisted('label', endpointLabel, editEndpoint) || isFieldExisted('value', endpointValue, editEndpoint);
  }

  function isFieldExisted(type, value, editEndpoint) {
    const isSameEditEndpoint = !!editEndpoint ? editEndpoint[type] === value : false;
    const isExist = {
      'label': EndpointUrl.findByLabel(value),
      'value': EndpointUrl.findByUrlValue(value),
    }
    return !isSameEditEndpoint && isExist[type];
  }
})();

export default endpointFormService;