import uuidv4 from '../utils/uuidv4';
import IndicatorApi from '../api/IndicatorApi';
import { handleApiResponse } from './api_service';
import { saveLanguageIndicator } from './language_indicator_service';

import { indicatorPhase } from '../constants/scorecard_constant';
import { PREDEFINED } from '../constants/indicator_constant';
import { ERROR_DOWNLOAD_SCORECARD } from '../constants/error_constant';

import indicatorHelper from '../helpers/indicator_helper';
import Indicator from '../models/Indicator';
import CustomIndicator from '../models/CustomIndicator';

class IndicatorService {
  getAll = (scorecardUuid) => {
    let indicators = JSON.parse(JSON.stringify(Indicator.findByScorecard(scorecardUuid)));;
    return indicators.sort((a, b) => a.name > b.name);
  }

  saveIndicatorSection = async (scorecardUuid, facilityId, successCallback, errorCallback) => {
    const indicatorApi = new IndicatorApi();
    const response = await indicatorApi.load(facilityId);

    handleApiResponse(response, (indicators) => {
      if (!!indicators) {
        this._saveIndicator(indicators, successCallback);
        saveLanguageIndicator(scorecardUuid, indicators, successCallback)
      }
      else
        errorCallback(ERROR_DOWNLOAD_SCORECARD);  // error status 0 means no response (the response returns as null)
    }, (error) => {
      console.log('error download caf = ', error);
      errorCallback(error);
    });
  }

  getIndicatorList = (scorecardUuid, searchText, isEdit) => {
    let savedIndicators = [];

    if (isEdit)
      savedIndicators = Indicator.getCustomIndicators(scorecardUuid);
    else
      savedIndicators = searchText != '' ? Indicator.filter(scorecardUuid, searchText) : this.getAll(scorecardUuid);

    return indicatorHelper.getIndicatorsAttrs(savedIndicators);
  }

  isIndicatorExist(scorecardUuid, name, selectedIndicatorUuid) {
    const isPredefinedIndicatorExist = Indicator.isNameExist(scorecardUuid, name);
    const isCustomIndicatorExist = CustomIndicator.isNameExist(scorecardUuid, name, selectedIndicatorUuid);

    return isPredefinedIndicatorExist || isCustomIndicatorExist;
  }

  getDuplicatedIndicator(scorecardUuid, name) {
    let result = [];
    const predefinedIndicators = Indicator.findByScorecardAndName(scorecardUuid, name);
    const customIndicators = CustomIndicator.findByScorecardAndName(scorecardUuid, name);

    if (predefinedIndicators.length > 0)
      result = predefinedIndicators;
    else if (customIndicators.length > 0)
      result = customIndicators;

    return result.length > 0 ? indicatorHelper.getIndicatorsAttrs(result) : [];
  }

  // private methods

  // Save the indicator when downloading the scorecard data
  _saveIndicator(indicators, successCallback) {
    let savedCount = 0;
    indicators.map((indicator) => {
      const savedIndicator = Indicator.find(indicator.id, PREDEFINED);

      if (!savedIndicator) {
        const indicatorSet = {
          uuid: uuidv4(),
          indicator_uuid: indicator.uuid,
          id: indicator.id,
          name: indicator.name,
          facility_id: indicator.categorizable.id,
          tag: indicator.tag_name,
          type: PREDEFINED,
        };
        Indicator.create(indicatorSet);
      }
      else if(!!savedIndicator && !savedIndicator.indicator_uuid)
        Indicator.update(savedIndicator.uuid, { indicator_uuid: indicator.uuid });

      savedCount += 1;
    });
    successCallback(savedCount === indicators.length, indicatorPhase);
  }
}

export default IndicatorService;