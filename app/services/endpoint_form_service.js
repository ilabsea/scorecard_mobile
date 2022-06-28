import { ENDPOINT_VALUE_FIELDNAME } from '../constants/endpoint_constant';
import { CUSTOM } from '../constants/main_constant';
import urlUtil from '../utils/url_util';
import uuidv4 from '../utils/uuidv4';
import EndpointUrl from '../models/EndpointUrl';
import settingHelper from '../helpers/setting_helper';

const endpointFormService = (() => {
  return {
    isValidForm,
    saveEndpointUrls,
    getValidationMessage,
    getSelectedEndpoint,
  }

  function isValidForm(endpointLabel, endpointValue) {
    const endpointLabelValidationMsg = getValidationMessage('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = getValidationMessage('endpointValue', endpointValue );

    const fieldsValidation = {
      label: endpointLabelValidationMsg == '' && endpointLabel != '',
      value: endpointValueValidationMsg == '' && endpointValue != '',
      endpointIsNotExisted: !isEndpointExisted(endpointLabel, endpointValue)
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

  function getValidationMessage(fieldName, value) {
    const endpointErrorMessage = {
      'endpointValue': {
        'alreadyExistedMsg': 'serverUrlIsExisted',
        'invalidMsg': !urlUtil.isUrlValid(value) ? 'serverUrlIsNotValid' : '',
      },
      'endpointLabel': {
        'alreadyExistedMsg': 'serverLabelIsExisted',
        'invalidMsg': '',
      }
    };

    if (!value) return '';

    const type = fieldName === ENDPOINT_VALUE_FIELDNAME ? 'value' : 'label';
    const messageType = isFieldExisted(type, value) ? 'alreadyExistedMsg' : 'invalidMsg';
    return endpointErrorMessage[fieldName][messageType];
  }

  async function getSelectedEndpoint() {
    const tempSettingData = await settingHelper.getTempSettingData()
    return !tempSettingData ? settingHelper.getSavedEndpointUrl() : tempSettingData.endpoint;
  }

  // private method
  function isEndpointExisted(endpointLabel, endpointValue) {
    return isFieldExisted('label', endpointLabel) || isFieldExisted('value', endpointValue);
  }

  function isFieldExisted(type, value) {
    const isExist = {
      'label': EndpointUrl.findByLabel(value),
      'value': EndpointUrl.findByUrlValue(value),
    }

    return isExist[type];
  }
})();

export default endpointFormService;