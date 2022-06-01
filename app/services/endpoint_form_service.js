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
    getSelectedEndpoint,
    isAllowToDeleteOrEdit,
    saveEndpointForEdit,
    getEndpointForEdit,
    clearEndpointForEdit,
  }

  function isValidForm(endpointLabel, endpointValue, editEndpoint) {
    const endpointLabelValidationMsg = validateField('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = validateField('endpointValue', endpointValue );

    // If the labe and value of the input is the save as edit endpoint then disable the button "update"
    if (!!editEndpoint && (endpointLabel == editEndpoint.label && endpointValue == editEndpoint.value))
      return false;

    const fieldsValidation = {
      label: endpointLabelValidationMsg == null && !isFieldExisted('label', endpointLabel, editEndpoint),
      value: endpointValueValidationMsg == null && !isFieldExisted('value', endpointLabel, editEndpoint),
      endpointIsNotExisted: !isEndpointExisted(endpointLabel, endpointValue, editEndpoint)
    }

    for (let key in fieldsValidation) {
      if (!fieldsValidation[key])
        return false;
    }

    return true;
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

  async function getSelectedEndpoint() {
    const tempSettingData = await settingHelper.getTempSettingData()
    return !tempSettingData ? settingHelper.getSavedEndpointUrl() : tempSettingData.endpoint;
  }

  async function isAllowToDeleteOrEdit(currentEndpoint) {
    const tempSettingData = await settingHelper.getSettingData();
    const savedEndpointUrl = await settingHelper.getSavedEndpointUrl();

    if (!Scorecard.allScorecardContainEndpoint(currentEndpoint.value))
      return !!currentEndpoint && currentEndpoint.value != tempSettingData.backendUrl || currentEndpoint.value != savedEndpointUrl;

    return false;
  }

  function saveEndpointForEdit(endpoint) {
    AsyncStorage.setItem('ENDPOINT_FOR_EDIT', JSON.stringify(endpoint));
  }

  async function getEndpointForEdit() {
    return JSON.parse(await AsyncStorage.getItem('ENDPOINT_FOR_EDIT'));
  }

  function clearEndpointForEdit() {
    AsyncStorage.removeItem('ENDPOINT_FOR_EDIT');
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