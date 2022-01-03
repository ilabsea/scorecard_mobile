import ScorecardApi from '../api/ScorecardApi';
import CustomIndicatorApi from '../api/CustomIndicatorApi';
import { getErrorType } from './api_service';
import scorecardReferenceService from './scorecard_reference_service';

import Scorecard from '../models/Scorecard';
import CustomIndicator from '../models/CustomIndicator';
import ScorecardReference from '../models/ScorecardReference';

import { scorecardAttributes } from '../utils/scorecard_attributes_util';

import BaseModelService from './baseModelService';
import { handleApiResponse, sendRequestToApi } from './api_service';
import { IN_REVIEW } from '../constants/milestone_constant';

class ScorecardService extends BaseModelService {

  constructor() {
    super();
    this.responsibleModel = 'Scorecard';
    this.scorecard = null;
    this.scorecardApi = new ScorecardApi();
    this.customIndicatorApi = new CustomIndicatorApi();
    this.customIndicators = null;
    this.scorecard_uuid = null;
    this.progressNumber = 0;
    this.totalNumber = 0;
  }

  upload(uuid, callback, errorCallback) {
    this.scorecard_uuid = uuid;
    this.scorecard = Scorecard.find(uuid)
    this.customIndicators = CustomIndicator.getAll(uuid);
    this.progressNumber = 0;
    let indicators = this.customIndicators.filter(x => !x.id_from_server);
    this.totalNumber = indicators.length + ScorecardReference.findByScorecard(uuid).length + 1;

    if (!this.scorecard || !this.scorecard.isInLastPhase) { return; }

    scorecardReferenceService.upload(uuid, () => { this.updateProgress(callback) }, () => {
      try {
        sendRequestToApi(() => this.uploadCustomIndicator(0, indicators, callback, errorCallback));
      } catch (error) {
        console.log(error);
      }
    }, (errorType) => {
      !!errorCallback && errorCallback(errorType);
    });
  }

  // ------Step1------
  // upload all custom criterias then upload scorecard with its dependcy
  uploadCustomIndicator(index, indicators, callback, errorCallback) {
    const _this = this;
    if (index == indicators.length) {
      this.uploadScorecard(callback, errorCallback);
      return ;
    }

    let customIndicator = indicators[index];

    this.customIndicatorApi.post(this.scorecard_uuid, this.customIndicatorData(customIndicator))
      .then(function (response) {
        if (response.status == 201) {
          CustomIndicator.update(customIndicator.uuid, {id_from_server: response.data.id});
        }

        _this.updateProgress(callback);
        _this.uploadCustomIndicator(index + 1, indicators, callback, errorCallback);
      });
  }

  // ------Step2------
  async uploadScorecard(callback, errorCallback) {
    const _this = this;
    let attrs = scorecardAttributes(_this.scorecard);

    this.scorecardApi.put(this.scorecard_uuid, attrs)
      .then(function (response) {
        if (response.status == 200) {
          Scorecard.update(_this.scorecard.uuid, {
            uploaded_date: new Date(),
            milestone: IN_REVIEW
          });
        }
        else if (response.error)
          !!errorCallback && errorCallback(getErrorType(response.error.status));

        _this.updateProgress(callback);
      });
  }

  updateProgress(callback) {
    this.progressNumber++;
    !!callback && callback( this.progressNumber / this.totalNumber );
  }

  // Praviate methods
  customIndicatorData(indicator) {
    let attrs = {
      uuid: indicator.uuid,
      name: indicator.name,
      tag_attributes: { name: indicator.tag },
    };

    let data = new FormData();
    data.append('custom_indicator', JSON.stringify(attrs));

    if (!!indicator.local_audio) {
      data.append('audio', {
        uri: 'file://' + indicator.local_audio,
        type: 'audio/x-mp3',
        name: 'audio.mp3'
      });
    }

    return data;
  }

  // --------------------New scorecard---------------------
  find = async (scorecardUuid, successCallback, failedCallback) => {
    sendRequestToApi(() => this._findScorecard(scorecardUuid, successCallback, failedCallback));
  }

  // private method
  _findScorecard = async (scorecardUuid, successCallback, failedCallback) => {
    const response = await this.scorecardApi.load(scorecardUuid);

    handleApiResponse(response, (responseData) => {
      !!successCallback && successCallback(responseData);
    }, (error) => {
      !!failedCallback && failedCallback(error);
    });
  }
}

export default ScorecardService;
