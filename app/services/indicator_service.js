import uuidv4 from '../utils/uuidv4';
import IndicatorApi from '../api/IndicatorApi';
import { handleApiResponse } from './api_service';
import { saveLanguageIndicator } from './language_indicator_service';

import { indicatorPhase } from '../constants/scorecard_constant';
import  { getIndicatorShortcutName } from '../utils/indicator_util';
import { CUSTOM, PREDEFINED } from '../utils/variable';
import { ERROR_DOWNLOAD_SCORECARD } from '../constants/error_constant';

import indicatorHelper from '../helpers/indicator_helper';
import Indicator from '../models/Indicator';
import CustomIndicator from '../models/CustomIndicator';

class IndicatorService {
  getAll = (scorecardUuid) => {
    let predefinedIndicators = JSON.parse(JSON.stringify(Indicator.findByScorecard(scorecardUuid)));;
    const customIndicators = JSON.parse(JSON.stringify(CustomIndicator.getAll(scorecardUuid)));
    predefinedIndicators = predefinedIndicators.concat(customIndicators);

    return predefinedIndicators.sort((a, b) => a.name > b.name);
  }

  saveIndicatorSection = async (scorecardUuid, facilityId, successCallback, errorCallback) => {
    const indicatorApi = new IndicatorApi();
    const response = await indicatorApi.load(facilityId);

    handleApiResponse(response, (indicators) => {
      if (!!indicators) {
        this._saveIndicator(indicators, scorecardUuid, successCallback);
        saveLanguageIndicator(scorecardUuid, indicators, successCallback)
      }
      else
        errorCallback(ERROR_DOWNLOAD_SCORECARD);  // error status 0 means no response (the response returns as null)
    }, (error) => {
      console.log('error download caf = ', error);
      errorCallback(error);
    });
  }

  _saveIndicator(indicators, scorecardUuid, successCallback) {
    let savedCount = 0;
    indicators.map((indicator) => {
      if (!indicatorHelper.isExist(indicator.id)) {
        const indicatorSet = {
          uuid: uuidv4(),
          id: indicator.id,
          name: indicator.name,
          facility_id: indicator.categorizable.id,
          scorecard_uuid: scorecardUuid,
          tag: indicator.tag_name,
          image: indicator.image != null ? indicator.image : undefined,
        };
        Indicator.create(indicatorSet);
      }
      savedCount += 1;
    });
    successCallback(savedCount === indicators.length, indicatorPhase);
  }

  getIndicatorList = (scorecardUuid, searchText, selectedIndicators) => {
    const savedIndicators = searchText != '' ? Indicator.filter(scorecardUuid, searchText) : this.getAll(scorecardUuid);
    return this._getIndicatorAttrs(savedIndicators, selectedIndicators);
  }

  isIndicatorExist(scorecardUuid, name, selectedIndicatorUuid) {
    const isPredefinedIndicatorExist = Indicator.isNameExist(scorecardUuid, name);
    const isCustomIndicatorExist = CustomIndicator.isNameExist(scorecardUuid, name, selectedIndicatorUuid);

    return isPredefinedIndicatorExist || isCustomIndicatorExist;
  }

  getDuplicatedIndicator(scorecardUuid, name, selectedIndicators) {
    let result = [];
    const predefinedIndicators = Indicator.findByScorecardAndName(scorecardUuid, name);
    const customIndicators = CustomIndicator.findByScorecardAndName(scorecardUuid, name);

    if (predefinedIndicators.length > 0)
      result = predefinedIndicators;
    else if (customIndicators.length > 0)
      result = customIndicators;

    return result.length > 0 ? this._getIndicatorAttrs(result, selectedIndicators) : [];
  }

  // private

  _getIndicatorAttrs = (savedIndicators, proposedCriterias) => {
    let indicators = [];
    let selectedIndicators = [];

    savedIndicators.map((indicator) => {
      let attrs = {
        uuid: indicator.id || indicator.uuid,
        indicatorable_id: indicator.id != undefined ? indicator.id.toString() : indicator.uuid,
        name: indicator.name,
        shortcut: getIndicatorShortcutName(indicator.name),
        isSelected: false,
        tag: indicator.tag,
        type: !!indicator.id ? PREDEFINED : CUSTOM,
        local_image: indicator.local_image,
      };
      if (proposedCriterias != undefined) {
        for (let i=0; i<proposedCriterias.length; i++) {
          const indicatorId = indicator.id != undefined ? indicator.id.toString() : indicator.uuid;
          if (proposedCriterias[i].indicatorable_id === indicatorId) {
            attrs.isSelected = true;
            selectedIndicators.push(attrs);
            break;
          }
        }
      }
      indicators.push(attrs);
    });

    return {indicators, selectedIndicators};
  }
}

export default IndicatorService;