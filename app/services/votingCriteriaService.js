import AsyncStorage from '@react-native-community/async-storage';
import realm from '../db/schema';
import ratings from '../db/jsons/ratings';
import uuidv4 from '../utils/uuidv4';
import { Median } from '../utils/math';
import Rating from '../models/Rating';

const votingCriteriaService = (() => {
  return {
    submitVoting,
    getAll,
    getSelectedTags,
    getSelectedIndicatorableIds,
    create,
    filterByTag,
    submitCriterias,
    savePlayingCriteriaAudio,
    isPlayingCriteria,
    clearPlayingCriteria,
    deleteVotingCriteria,
  }

  function find(uuid) {
    return realm.objects('VotingCriteria').filtered(`uuid='${uuid}'`)[0];
  }

  function getAll(scorecardUuid) {
    return realm.objects('VotingCriteria').filtered(`scorecard_uuid='${scorecardUuid}' SORT(order ASC)`);
  }

  function getSelectedTags(scorecardUuid) {
    return getAll(scorecardUuid).map(x => x.tag);
  }

  function getSelectedIndicatorableIds(scorecardUuid) {
    return getAll(scorecardUuid).map(x => x.indicatorable_id);
  }

  function cleanArchiveCriterias(scorecardUuid, selectedCriterias) {
    let votingCriterias = votingCriteriaService.getAll(scorecardUuid);
    let archiveCriterias = votingCriterias.filter(criteria =>
      !selectedCriterias.filter(sc => sc.indicatorable_id == criteria.indicatorable_id && sc.indicatorable_type == criteria.indicatorable_type).length
    )

    archiveCriterias.map(votingCriteria => {
      Rating.destroy(scorecardUuid, votingCriteria.uuid);
    });

    realm.write(() => {
      realm.delete(archiveCriterias);
    });
  }

  function create(data) {
    realm.write(() => {
      realm.create('VotingCriteria', data, 'modified');
    });
  }

  function filterByTag(scorecardUuid, tag) {
    return realm.objects('VotingCriteria').filtered(`scorecard_uuid='${scorecardUuid}' AND tag='${tag}'`);
  }

  function filterByIndicator(scorecardUuid, indicatorable_id, indicatorable_type) {
    return realm.objects('VotingCriteria').filtered(`scorecard_uuid='${scorecardUuid}' AND indicatorable_id='${indicatorable_id}' AND indicatorable_type='${indicatorable_type}'`);
  }

  function submitCriterias(scorecard_uuid, selectedCriterias, callback) {
    cleanArchiveCriterias(scorecard_uuid, selectedCriterias);
    let savedCriterias = [];

    for(let i=0; i<selectedCriterias.length; i++) {
      const order = i+1;
      let criteria = selectedCriterias[i];
      let obj = filterByIndicator(criteria.scorecard_uuid, criteria.indicatorable_id, criteria.indicatorable_type)[0];

      if (!!obj && obj.order == order) { continue; }

      let data = {
        uuid: !!obj ? obj.uuid : uuidv4(),
        scorecard_uuid: criteria.scorecard_uuid,
        indicatorable_id: criteria.indicatorable_id,
        indicatorable_type: criteria.indicatorable_type,
        tag: criteria.tag,
        order: order,
      }

      create(data);
      savedCriterias.push(data);
    }

    callback(savedCriterias);
  }

  function submitVoting(criterias, participant_uuid) {
    for(let i=0; i<criterias.length; i++) {
      Rating.create(_buildRatingData(criterias[i], participant_uuid));
      _updateCriteria(criterias[i]);
    }

    function _updateCriteria(criteria) {
      let criteriaObj = find(criteria.uuid);
      realm.write(() => {
        criteriaObj[_getCountMethod(criteria)] += 1;
        criteriaObj.median = _getAverageScore(criteriaObj);
      });
    }

    function _buildRatingData(criteria, participant_uuid) {
      return {
        uuid: uuidv4(),
        scorecard_uuid: criteria.scorecard_uuid,
        voting_criteria_uuid: criteria.uuid,
        participant_uuid: participant_uuid,
        score: criteria.ratingScore
      }
    }

    function _getCountMethod(criteria) {
      return ratings.filter(rating => rating.value == criteria.ratingScore)[0]['countMethodName'];
    }

    function _getAverageScore(criteria) {
      let arr = [];

      for(let i=0; i<ratings.length; i++) {
        for(let j=0; j<criteria[ratings[i].countMethodName]; j++) {
          arr.push(ratings[i].value);
        }
      }

      let score = Median(arr);
      return score;
    }
  }

  function savePlayingCriteriaAudio (criteriaPosition) {
    AsyncStorage.setItem('PLAYING_CRITERIA', criteriaPosition);
  }

  async function isPlayingCriteria(criteriaPosition) {
    const playingPosition = await AsyncStorage.getItem('PLAYING_CRITERIA');
    return playingPosition === criteriaPosition
  }

  function clearPlayingCriteria () {
    AsyncStorage.removeItem('PLAYING_CRITERIA');
  }

  function deleteVotingCriteria(scorecardUuid) {
    const votingCriterias = votingCriteriaService.getAll(scorecardUuid);

    if (votingCriterias.length > 0) {
      realm.write(() => {
        realm.delete(votingCriterias);
      });
    }
  }
})();

export default votingCriteriaService;
