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
    getEmailErrorMessage,
    getErrorMessage,
    getSelectedEndpoint,
    isAllowToDeleteOrEdit,
  }

  function isValidForm(endpointLabel, endpointValue, email, password) {
    const endpointLabelValidationMsg = validateField('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = validateField('endpointValue', endpointValue );
    const endpointUrl = EndpointUrl.findByUrlAndUsername(endpointValue, email);

    const fieldsValidation = {
      email: !email ? false : true,
      password: !password ? false : true,
      label: endpointLabelValidationMsg == null && !isFieldExisted('label', endpointLabel, null),
      value: endpointValueValidationMsg == null && urlUtil.isUrlValid(endpointValue),
      endpointUrlIsNotExisted: !endpointUrl
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

  function getEmailErrorMessage(email, endpointValue) {
    const endpointUrl = EndpointUrl.findByUrlAndUsername(endpointValue, email);
    return !!endpointUrl ? 'thisEmailIsAlreadyExist' : '';
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

  function isAllowToDeleteOrEdit(editEndpoint, selectedEndpoint, savedEndpoint) {
    if (!Scorecard.allScorecardContainEndpoint(editEndpoint.value))
      return !!editEndpoint && editEndpoint.value != selectedEndpoint && editEndpoint.value != savedEndpoint;
    
    return false;
  }

  // private method
  function validateField(fieldName, value) {
    validationService(fieldName, value === '' ? undefined : value);
  }

  function isFieldExisted(type, value, editEndpoint) {
    const isSameEditEndpoint = !!editEndpoint ? editEndpoint[type] === value : false;
    const isExist = {
      'label': EndpointUrl.findByLabel(value),
      'value': false,   // endpoint url can be created multiple time
    }
    return !isSameEditEndpoint && isExist[type];
  }
})();

export default endpointFormService;