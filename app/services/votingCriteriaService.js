import realm from '../db/schema';
import ratings from '../db/jsons/ratings';
import uuidv4 from '../utils/uuidv4';
import { Median } from '../utils/math';

export const submitVoting = (criterias, participant_uuid) => {
  realm.write(() => {
    for(let i=0; i<criterias.length; i++) {
      realm.create('Rating', _buildRatingData(criterias[i], participant_uuid));
      _updateCriteria(criterias[i]);
    }
  });

  function _updateCriteria(criteria) {
    let criteriaObj = realm.objects('VotingCriteria').filtered(`uuid='${criteria.uuid}'`)[0];
    criteriaObj[_getCountMethod(criteria)] += 1;
    criteriaObj.median = _getEverageScore(criteriaObj);
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

  function _getEverageScore(criteria) {
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
