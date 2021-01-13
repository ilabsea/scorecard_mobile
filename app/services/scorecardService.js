import realm from '../db/schema';
import ScorecardApi from '../api/ScorecardApi';
import CustomIndicatorApi from '../api/CustomIndicatorApi';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import { getErrorType } from './api_service';

const scorecardService = (() => {
  const scorecardApi = new ScorecardApi();
  const customIndicatorApi = new CustomIndicatorApi();
  var scorecard, customIndicators, scorecard_uuid, progressNumber, totalNumber;

  return {
    upload,
    removeScorecardAsset,
    isExists,
    saveScorecardDetail,
    find,
    update,
    getProposedCriterias
  }

  function find(uuid) {
    return realm.objects('Scorecard').filtered(`uuid='${uuid}'`)[0];
  }

  function update(uuid, params={}) {
    realm.write(() => {
      realm.create('Scorecard', Object.assign(params, {uuid: uuid}), 'modified');
    })
  }

  function upload(uuid, callback, errorCallback) {
    scorecard_uuid = uuid;
    scorecard = realm.objects('Scorecard').filtered(`uuid='${scorecard_uuid}'`)[0];
    customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid='${scorecard_uuid}'`);
    progressNumber = 0;
    let indicators = customIndicators.filter(x => !x.id_from_server);
    totalNumber = indicators.length + 1;

    if (!scorecard || !scorecard.isCompleted) { return; }

    try {
      uploadCustomIndicator(0, indicators, callback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  // ------Step1------
  // upload all custom criterias then upload scorecard with its dependcy
  function uploadCustomIndicator(index, indicators, callback, errorCallback) {
    if (index == indicators.length) {
      uploadScorecard(callback, errorCallback);
      return ;
    }

    let customIndicator = indicators[index];
    customIndicatorApi.post(scorecard_uuid, customIndicatorData(customIndicator))
      .then(function (response) {
        if (response.status == 201) {
          realm.write(() => {
            customIndicator.id_from_server = response.data.id;
          });
        }

        updateProgress(callback);
        uploadCustomIndicator(index + 1, indicators, callback);
      });
  }

  // ------Step2------
  function uploadScorecard(callback, errorCallback) {
    let attrs = scorecardAttr();
    attrs.facilitators_attributes = facilitatorsAttr();
    attrs.participants_attributes = participantsAttr();
    attrs.raised_indicators_attributes = proposedCriteriasAttr();
    attrs.voting_indicators_attributes = votingCriteriasAttr();
    attrs.ratings_attributes = ratingsAttr();

    scorecardApi.put(scorecard_uuid, attrs)
      .then(function (response) {
        if (response.status == 200) {
          realm.write(() => {
            scorecard.uploaded_date = new Date().toDateString();
          });
        }
        else if (response.status === undefined)
          errorCallback(getErrorType(response.error));

        updateProgress(callback);
      });
  }

  function updateProgress(callback) {
    progressNumber++;
    !!callback && callback( progressNumber / totalNumber );
  }

  // Praviate methods
  function ratingsAttr() {
    let ratings = getJSON('Rating');
    let columns = ['uuid', 'scorecard_uuid', 'participant_uuid', 'score'];

    return ratings.map(rating => {
      let attr = getAttributes(rating, columns);
      attr.voting_indicator_uuid = rating.voting_criteria_uuid;
      return attr;
    });
  }

  function getIndicator(criteria) {
    let indicatorable_id = criteria.indicatorable_id;
    let indicatorable_type = 'Indicator';

    if (criteria.indicatorable_type != 'predefined') {
      indicatorable_id = customIndicators.filter(x => x.uuid == indicatorable_id)[0].id_from_server;
      indicatorable_type = 'CustomIndicator';
    }

    return { id: indicatorable_id, type: indicatorable_type };
  }

  function votingCriteriasAttr() {
    let votingCriterias = getJSON('VotingCriteria');
    let columns = ['uuid', 'scorecard_uuid', 'median', 'strength', 'weakness', 'desired_change', 'suggested_action'];

    return getCriteriaAttr(votingCriterias, columns);
  }

  function getCriteriaAttr(criterias, columns, has_tag) {
    return criterias.map(criteria => {
      let indicator = getIndicator(criteria);
      let attr = getAttributes(criteria, columns);

      attr.indicatorable_id = indicator.id;
      attr.indicatorable_type = indicator.type;

      if (!!has_tag) {
        attr.tag_attributes = { name: criteria.tag }
      }

      return attr;
    })
  }

  function proposedCriteriasAttr() {
    let proposedCriterias = getJSON('ProposedCriteria');
    let columns = ['scorecard_uuid', 'participant_uuid'];

    return getCriteriaAttr(proposedCriterias, columns, true);
  }

  function scorecardAttr() {
    return {
      conducted_date: scorecard.conducted_date,
      number_of_caf: scorecard.number_of_caf,
      number_of_participant: scorecard.number_of_participant,
      number_of_female: scorecard.number_of_female,
      number_of_disability: scorecard.number_of_disability,
      number_of_ethnic_minority: scorecard.number_of_ethnic_minority,
      number_of_youth: scorecard.number_of_youth,
      number_of_id_poor: scorecard.number_of_id_poor,
    }
  }

  function participantsAttr() {
    let participants = getJSON('Participant');
    let columns = ['uuid', 'age', 'gender', 'disability', 'minority', 'youth', 'scorecard_uuid'];

    return participants.map(participant => {
      let attr = getAttributes(participant, columns);
      attr.poor_card = participant.poor;

      return attr;
    });
  }

  function getAttributes(obj, columns) {
    return Object.keys(obj)
      .filter(key => columns.indexOf(key) >= 0)
      .reduce((obj2, key) => Object.assign(obj2, { [key]: obj[key] }), {});
  }

  function facilitatorsAttr() {
    let facilitators = realm.objects('Facilitator').filtered(`scorecard_uuid='${scorecard_uuid}'`);
    let data = facilitators.map(facilitator => ({
      caf_id: facilitator.id,
      position: facilitator.position,
      scorecard_uuid: facilitator.scorecard_uuid
    }));

    return data;
  }

  function getJSON(realmModelName) {
    return JSON.parse(JSON.stringify(realm.objects(realmModelName).filtered(`scorecard_uuid='${scorecard_uuid}'`)));
  }

  function customIndicatorData(indicator) {
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

  function removeScorecardAsset(uuid, callback) {
    let scorecard = realm.objects('Scorecard').filtered(`uuid='${uuid}'`)[0];
    let tables = ['CustomIndicator', 'Facilitator', 'Participant', 'ProposedCriteria', 'VotingCriteria', 'Rating'];

    realm.write(() => {
      for(let i=0; i<tables.length; i++) {
        let collection = realm.objects(tables[i]).filtered(`scorecard_uuid='${uuid}'`);

        if (tables[i] == 'CustomIndicator') {
          removeAudioFiles(collection);
        }

        realm.delete(collection);
      }

      scorecard.deleted_date = new Date().toDateString();
    })
  }

  function removeAudioFiles(collection) {
    let filePaths = collection.map(x => x.local_audio).filter(path => !!path);

    for(let i=0; i<filePaths.length; i++) {
      deleteFile(filePaths[i]);
    }
  }

  function deleteFile(filePath) {
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
  function isExists(uuid) {
    return realm.objects('Scorecard').filtered(`uuid == '${uuid}'`)[0] != undefined
  }

  function saveScorecardDetail(response) {
    AsyncStorage.setItem('SELECTED_SCORECARD_UUID', response.uuid);
    realm.write(() => {
      realm.create('Scorecard', _buildData(response), 'modified');
    });
  }

  function _buildData(response) {
    return ({
      uuid: response.uuid,
      unit_type: response.unit_type_name,
      facility_id: response.facility_id,
      facility: response.facility_name,
      scorecard_type: response.scorecard_type,
      name: response.name,
      description: response.description,
      year: response.year,
      local_ngo_name: response.local_ngo_name,
      local_ngo_id: response.local_ngo_id,
      province: response.province,
      district: response.district,
      commune: response.commune,
      program_id: response.program_id,
    })
  }

  function getProposedCriterias(scorecardUuid, participantUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid = '${scorecardUuid}' AND participant_uuid = '${participantUuid}'`);
  }
})();

export default scorecardService;
