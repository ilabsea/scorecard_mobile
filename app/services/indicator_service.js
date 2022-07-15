import IndicatorApi from '../api/IndicatorApi';
import { sendRequestToApi } from './api_service';
import { saveLanguageIndicator } from './language_indicator_service';

import { PREDEFINED } from '../constants/indicator_constant';
import { ERROR_DOWNLOAD_SCORECARD, ERROR_SOMETHING_WENT_WRONG } from '../constants/error_constant';

import indicatorHelper from '../helpers/indicator_helper';
import Indicator from '../models/Indicator';

class IndicatorService {
  getAll = async (scorecardUuid) => {
    let indicators = JSON.parse(JSON.stringify(await Indicator.findByScorecard(scorecardUuid)));;
    return indicators.sort((a, b) => a.name > b.name);
  }

  saveIndicatorSection = (scorecardUuid, facilityId, successCallback, errorCallback) => {
    this._requestForIndicator(facilityId, (indicators) => {
      // Save the predefined indicators
      indicatorHelper.savePredefinedIndicator(scorecardUuid, indicators, successCallback);
      saveLanguageIndicator(scorecardUuid, indicators, successCallback)
    }, (error) => {
      !!errorCallback && errorCallback(error);
    })
  }

  getIndicatorList = async (scorecardUuid, searchText, isEdit) => {
    let savedIndicators = [];

    if (isEdit)
      savedIndicators = Indicator.getCustomIndicators(scorecardUuid);
    else
      savedIndicators = searchText != '' ? await Indicator.filter(scorecardUuid, searchText) : await this.getAll(scorecardUuid);

    return indicatorHelper.getIndicatorsAttrs(savedIndicators);
  }

  checkAndSavePredefinedIndicatorsUuid(scorecard, successCallback, errorCallback) {
    this._requestForIndicator(scorecard.facility_id, (indicators) => {
      indicators.map(indicator => {
        // Check and update indicator_uuid of predefined indicators
        const predefinedIndicator = Indicator.find(indicator.id, PREDEFINED);
        if (!!predefinedIndicator && !predefinedIndicator.indicator_uuid)
          Indicator.update(predefinedIndicator.uuid, { indicator_uuid: indicator.uuid }, scorecard.uuid);
      });

      successCallback();
    }, (response) => {
      const error = response === ERROR_DOWNLOAD_SCORECARD ? ERROR_SOMETHING_WENT_WRONG : response;
      errorCallback(error);
    });
  }

  // private methods

  _requestForIndicator(facilityId, successCallback, errorCallback) {
    sendRequestToApi(() => { return new IndicatorApi().load(facilityId) }, (indicators) => {
      if (!!indicators)
        !!successCallback && successCallback(indicators);
      else
        !!errorCallback && errorCallback(ERROR_DOWNLOAD_SCORECARD);  // error status 0 means no response (the response returns as null)
    }, (error) => !!errorCallback && errorCallback(error));
  }
}

export default IndicatorService;