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

  function isValidForm(endpointLabel, endpointValue, endpointShortcut) {
    const endpointLabelValidationMsg = getValidationMessage('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = getValidationMessage('endpointValue', endpointValue);
    const endpointShortcutValidationMsg = getValidationMessage('endpointShortcut', endpointShortcut);

    const fieldsValidation = {
      label: endpointLabelValidationMsg == '' && endpointLabel != '',
      value: endpointValueValidationMsg == '' && endpointValue != '',
      shortcut: endpointShortcutValidationMsg == '' && endpointShortcut != '',
      endpointIsNotExisted: !isEndpointExisted(endpointLabel, endpointValue, endpointShortcut)
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
      },
      'endpointShortcut': {
        'alreadyExistedMsg': 'serverShortcutIsExisted',
        'invalidMsg': '',
      }
    };

    if (!value) return '';

    const messageType = isFieldExisted(fieldName, value) ? 'alreadyExistedMsg' : 'invalidMsg';
    return endpointErrorMessage[fieldName][messageType];
  }

  async function getSelectedEndpoint() {
    const tempSettingData = await settingHelper.getTempSettingData()
    return !tempSettingData ? settingHelper.getSavedEndpointUrl() : tempSettingData.endpoint;
  }

  // private method
  function isEndpointExisted(endpointLabel, endpointValue, endpointShortcut) {
    return isFieldExisted('label', endpointLabel) || isFieldExisted('value', endpointValue) || isFieldExisted('shortcut', endpointShortcut);
  }

  function isFieldExisted(type, value) {
    const isExist = {
      'endpointLabel': EndpointUrl.findByLabel(value),
      'endpointValue': EndpointUrl.findByUrlValue(value),
      'endpointShortcut': EndpointUrl.findByShortcut(value),
    }

    return isExist[type];
  }
})();

export default endpointFormService;