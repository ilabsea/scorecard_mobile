import ScorecardApi from '../api/ScorecardApi';
import CustomIndicatorApi from '../api/CustomIndicatorApi';
import { getErrorType } from './api_service';
import scorecardReferenceService from './scorecard_reference_service';
import IndicatorService from './indicator_service';

import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import ScorecardReference from '../models/ScorecardReference';

import { scorecardAttributes } from '../utils/scorecard_attributes_util';
import { IN_REVIEW } from '../constants/milestone_constant';

class ScorecardService {

  constructor() {
    this.responsibleModel = 'Scorecard';
    this.scorecard = null;
    this.scorecardApi = new ScorecardApi();
    this.customIndicators = null;
    this.scorecard_uuid = null;
    this.progressNumber = 0;
    this.totalNumber = 0;
  }

  // ------Step1------
  // check the indicator_uuid of the predefined indicators
  upload(uuid, callback, errorCallback) {
    this.scorecard_uuid = uuid;
    this.scorecard = Scorecard.find(uuid)

    if (Indicator.arePredefinedIndicatorsHaveUuid(this.scorecard.facility_id))
      this.uploadScorecardReference(callback, errorCallback);
    else {
      new IndicatorService().checkAndSavePredefinedIndicatorsUuid(this.scorecard, () => {
        this.uploadScorecardReference(callback, errorCallback);
      }, (error) => {
        !!errorCallback && errorCallback(error);
      });
    }
  }

  // ------Step2------
  // upload the selected images of the scorecard
  uploadScorecardReference(callback, errorCallback) {
    this.customIndicators = Indicator.getCustomIndicators(this.scorecard_uuid);
    this.progressNumber = 0;
    const customIndicatorsWithNoId = this.customIndicators.filter(x => !x.id);
    this.totalNumber = customIndicatorsWithNoId.length + ScorecardReference.findByScorecard(this.scorecard_uuid).length + 1;

    if (!this.scorecard || !this.scorecard.isInLastPhase) { return; }

    scorecardReferenceService.upload(this.scorecard_uuid, () => { this.updateProgress(callback) }, () => {
      try {
        this.uploadCustomIndicator(0, customIndicatorsWithNoId, callback, errorCallback)
      } catch (error) {
        console.log(error);
      }
    }, (errorType) => {
      !!errorCallback && errorCallback(errorType);
    });
  }

  // ------Step3------
  // upload all custom indicators then upload scorecard with its dependcy
  uploadCustomIndicator(index, indicators, callback, errorCallback) {
    const _this = this;
    if (index == indicators.length) {
      this.uploadScorecard(callback, errorCallback);
      return ;
    }

    const customIndicator = indicators[index];
    CustomIndicatorApi.post(this.scorecard_uuid, customIndicator, (response) => {
      if (!!response && !!JSON.parse(response).id) {
        // Update the id of the custom indicator with the id that received from the server
        // This 'id' is used as 'indicatorable_id' when submitting the scorecard 
        Indicator.update(customIndicator.indicator_uuid, { id: JSON.parse(response).id }, this.scorecard_uuid);
      }
      _this.updateProgress(callback);
      _this.uploadCustomIndicator(index + 1, indicators, callback, errorCallback);
    }, (errorType) => {
      !!errorCallback && errorCallback(errorType);
    })
  }

  // ------Step4------
  async uploadScorecard(callback, errorCallback) {
    const _this = this;
    let attrs = await scorecardAttributes(_this.scorecard);

    this.scorecardApi.put(this.scorecard_uuid, attrs, (response) => {
      Scorecard.update(_this.scorecard.uuid, {
        uploaded_date: new Date(),
        milestone: IN_REVIEW
      });
      _this.updateProgress(callback);
    }, (error) => {
      !!errorCallback && errorCallback(getErrorType(error.status));
      _this.updateProgress(callback);
    });
  }

  updateProgress(callback) {
    this.progressNumber++;
    !!callback && callback( this.progressNumber / this.totalNumber );
  }

  // --------------------New scorecard---------------------
  find = (scorecardUuid, successCallback, failedCallback) => {
    this.scorecardApi.load(scorecardUuid, successCallback, failedCallback)
  }
}

export default ScorecardService;