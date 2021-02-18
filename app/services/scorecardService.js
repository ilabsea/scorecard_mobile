import realm from '../db/schema';
import ScorecardApi from '../api/ScorecardApi';
import CustomIndicatorApi from '../api/CustomIndicatorApi';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import { getErrorType } from './api_service';
import facilitatorService from './facilitator_service';
import { deleteParticipants } from './participant_service';
import { deleteScorecardDownload } from './scorecard_download_service';
import { deleteLanguageIndicators } from './language_indicator_service';
import ratingService from './ratingService';
import votingCriteriaService from './votingCriteriaService';
import customIndicatorService from './custom_indicator_service';
import proposedCriteriaService from './proposedCriteriaService';

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
    this.scorecard = realm.objects('Scorecard').filtered(`uuid='${uuid}'`)[0];
    this.customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid='${this.scorecard_uuid}'`);
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

    // this.customIndicatorApi = new CustomIndicatorApi();
    this.customIndicatorApi.post(this.scorecard_uuid, this.customIndicatorData(customIndicator))
      .then(function (response) {
        if (response.status == 201) {
          realm.write(() => {
            customIndicator.id_from_server = response.data.id;
          });
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
          realm.write(() => {
            _this.scorecard.uploaded_date = new Date().toDateString();
          });
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
    return {
      conducted_date: this.scorecard.conducted_date,
      number_of_caf: this.scorecard.number_of_caf,
      number_of_participant: this.scorecard.number_of_participant,
      number_of_female: this.scorecard.number_of_female,
      number_of_disability: this.scorecard.number_of_disability,
      number_of_ethnic_minority: this.scorecard.number_of_ethnic_minority,
      number_of_youth: this.scorecard.number_of_youth,
      number_of_id_poor: this.scorecard.number_of_id_poor,
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
    let facilitators = realm.objects('Facilitator').filtered(`scorecard_uuid='${this.scorecard_uuid}'`);
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

  // ------------------Removing Scorecard--------------------

  removeScorecardAsset(uuid, callback) {
    let scorecard = realm.objects('Scorecard').filtered(`uuid='${uuid}'`)[0];
    let tables = ['CustomIndicator', 'Facilitator', 'Participant', 'ProposedCriteria', 'VotingCriteria', 'Rating'];

    realm.write(() => {
      for(let i=0; i<tables.length; i++) {
        let collection = realm.objects(tables[i]).filtered(`scorecard_uuid='${uuid}'`);

        if (tables[i] == 'CustomIndicator') {
          this.removeAudioFiles(collection);
        }

        realm.delete(collection);
      }

      this.scorecard.deleted_date = new Date().toDateString();
    })
  }

  removeAudioFiles(collection) {
    let filePaths = collection.map(x => x.local_audio).filter(path => !!path);

    for(let i=0; i<filePaths.length; i++) {
      this.deleteFile(filePaths[i]);
    }
  }

  deleteFile(filePath) {
    RNFS.exists(filePath)
      .then( (result) => {
        console.log("file exists: ", result);

        if (!result) { return; }

        return RNFS.unlink(filePath)
          .then(() => {
            console.log('FILE DELETED');
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // --------------------New scorecard---------------------
  delete(scorecardUuid) {
    const scorecard = this.find(scorecardUuid);

    if (scorecard.isUploaded)
      return;

    super.delete(scorecardUuid, this.responsibleModel);
    this._deleteScorecardData(scorecardUuid);
  }

  _deleteScorecardData = (uuid) => {
    deleteParticipants(uuid);
    deleteScorecardDownload(uuid);
    deleteLanguageIndicators(uuid);
    facilitatorService.deleteFacilitators(uuid);
    ratingService.deleteRatings(uuid);
    votingCriteriaService.deleteVotingCriteria(uuid);
    customIndicatorService.deleteCustomIndicators(uuid);
    proposedCriteriaService.deleteProposedCriterias(uuid);
  }
}

export default ScorecardService;
