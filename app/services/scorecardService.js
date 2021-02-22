import realm from '../db/schema';
import ScorecardApi from '../api/ScorecardApi';
import CustomIndicatorApi from '../api/CustomIndicatorApi';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import { getErrorType } from './api_service';
import { deleteScorecardDownload } from './scorecard_download_service';
import { deleteLanguageIndicators } from './language_indicator_service';
import votingCriteriaService from './votingCriteriaService';
import proposedCriteriaService from './proposedCriteriaService';

import Scorecard from '../models/Scorecard';
import CustomIndicator from '../models/CustomIndicator';
import Facilitator from '../models/Facilitator';
import Participant from '../models/Participant';
import Rating from '../models/Rating';

import BaseModelService from './baseModelService';

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
    this.totalNumber = indicators.length + 1;

    if (!this.scorecard || !this.scorecard.isInLastPhase) { return; }

    try {
      this.uploadCustomIndicator(0, indicators, callback, errorCallback);
    } catch (error) {
      console.log(error);
    }
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
  uploadScorecard(callback, errorCallback) {
    const _this = this;
    let attrs = this.scorecardAttr();
    attrs.facilitators_attributes = this.facilitatorsAttr();
    attrs.participants_attributes = this.participantsAttr();
    attrs.raised_indicators_attributes = this.proposedCriteriasAttr();
    attrs.voting_indicators_attributes = this.votingCriteriasAttr();
    attrs.ratings_attributes = this.ratingsAttr();

    this.scorecardApi.put(this.scorecard_uuid, attrs)
      .then(function (response) {
        if (response.status == 200) {
          Scorecard.update(_this.scorecard.uuid, { uploaded_date: new Date().toDateString() });
        }
        else if (response.error)
          errorCallback(getErrorType(response.error.status));

        _this.updateProgress(callback);
      });
  }

  updateProgress(callback) {
    this.progressNumber++;
    !!callback && callback( this.progressNumber / this.totalNumber );
  }

  // Praviate methods
  ratingsAttr() {
    let ratings = this.getJSON('Rating');
    let columns = ['uuid', 'scorecard_uuid', 'participant_uuid', 'score'];

    return ratings.map(rating => {
      let attr = this.getAttributes(rating, columns);
      attr.voting_indicator_uuid = rating.voting_criteria_uuid;
      return attr;
    });
  }

  getIndicator(criteria) {
    let indicatorable_id = criteria.indicatorable_id;
    let indicatorable_type = 'Indicator';

    if (criteria.indicatorable_type != 'predefined') {
      indicatorable_id = this.customIndicators.filter(x => x.uuid == indicatorable_id)[0].id_from_server;
      indicatorable_type = 'CustomIndicator';
    }

    return { id: indicatorable_id, type: indicatorable_type };
  }

  votingCriteriasAttr() {
    let votingCriterias = this.getJSON('VotingCriteria');
    let columns = ['uuid', 'scorecard_uuid', 'median', 'strength', 'weakness', 'desired_change', 'suggested_action'];

    return this.getCriteriaAttr(votingCriterias, columns);
  }

  getCriteriaAttr(criterias, columns, has_tag) {
    return criterias.map(criteria => {
      let indicator = this.getIndicator(criteria);
      let attr = this.getAttributes(criteria, columns);

      attr.indicatorable_id = indicator.id;
      attr.indicatorable_type = indicator.type;

      if (!!has_tag) {
        attr.tag_attributes = { name: criteria.tag }
      }

      return attr;
    })
  }

  proposedCriteriasAttr() {
    let proposedCriterias = this.getJSON('ProposedCriteria');
    let columns = ['scorecard_uuid', 'participant_uuid'];

    return this.getCriteriaAttr(proposedCriterias, columns, true);
  }

  scorecardAttr() {
    let facilitators = Facilitator.getAll(this.scorecard.uuid);
    let participants = Participant.getAll(this.scorecard.uuid);

    return {
      conducted_date: this.scorecard.conducted_date,
      number_of_caf: facilitators.length,
      number_of_participant: participants.length,
      number_of_female: participants.filter(p => p.gender == "female").length,
      number_of_disability: participants.filter(p => !!p.disability).length,
      number_of_ethnic_minority: participants.filter(p => !!p.minority).length,
      number_of_youth: participants.filter(p => !!p.youth).length,
      number_of_id_poor: participants.filter(p => !!p.poor).length,
    }
  }

  participantsAttr() {
    let participants = this.getJSON('Participant');
    let columns = ['uuid', 'age', 'gender', 'disability', 'minority', 'youth', 'scorecard_uuid'];

    return participants.map(participant => {
      let attr = this.getAttributes(participant, columns);
      attr.poor_card = participant.poor;

      return attr;
    });
  }

  getAttributes(obj, columns) {
    return Object.keys(obj)
      .filter(key => columns.indexOf(key) >= 0)
      .reduce((obj2, key) => Object.assign(obj2, { [key]: obj[key] }), {});
  }

  facilitatorsAttr() {
    let facilitators = Facilitator.getAll(this.scorecard_uuid);
    let data = facilitators.map(facilitator => ({
      caf_id: facilitator.id,
      position: facilitator.position,
      scorecard_uuid: facilitator.scorecard_uuid
    }));

    return data;
  }

  getJSON(realmModelName) {
    return JSON.parse(JSON.stringify(realm.objects(realmModelName).filtered(`scorecard_uuid='${this.scorecard_uuid}'`)));
  }

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
  delete(scorecardUuid) {
    const scorecard = Scorecard.find(scorecardUuid);

    if (scorecard.isUploaded)
      return;

    super.delete(scorecardUuid, this.responsibleModel);
    this._deleteScorecardData(scorecardUuid);
  }

  _deleteScorecardData = (scorecardUuid) => {
    Participant.deleteAll(scorecardUuid);
    deleteScorecardDownload(scorecardUuid);
    deleteLanguageIndicators(scorecardUuid);
    Facilitator.deleteAll(scorecardUuid);
    Rating.deleteAll(scorecardUuid);
    CustomIndicator.deleteAll(scorecardUuid);
    votingCriteriaService.deleteVotingCriteria(scorecardUuid);
    proposedCriteriaService.deleteProposedCriterias(scorecardUuid);
  }
}

export default ScorecardService;
