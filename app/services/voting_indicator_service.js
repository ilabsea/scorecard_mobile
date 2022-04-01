import AsyncStorage from '@react-native-community/async-storage';
import realm from '../db/schema';
import ratings from '../db/jsons/ratings';
import uuidv4 from '../utils/uuidv4';
import { Median } from '../utils/math';
import Rating from '../models/Rating';
import VotingIndicator from '../models/VotingIndicator';

const votingIndicatorService = (() => {
  return {
    submitVoting,
    getSelectedTags,
    getSelectedIndicatorableIds,
    submitIndicators,
    savePlayingIndicatorAudio,
    isPlayingIndicator,
    clearPlayingIndicator,
    deleteVotingIndicators,
  }

  function getSelectedTags(scorecardUuid) {
    return VotingIndicator.getAll(scorecardUuid).map(x => x.tag);
  }

  function getSelectedIndicatorableIds(scorecardUuid) {
    return VotingIndicator.getAll(scorecardUuid).map(x => x.indicatorable_id);
  }

  function submitIndicators(scorecard_uuid, selectedIndicators, callback) {
    _cleanArchiveIndicators(scorecard_uuid, selectedIndicators);
    let savedIndicators = [];

    for(let i=0; i<selectedIndicators.length; i++) {
      const order = i+1;
      let indicator = selectedIndicators[i];
      let obj = VotingIndicator.filterByIndicator(indicator.scorecard_uuid, indicator.indicatorable_id, indicator.indicatorable_type)[0];

      if (!!obj && obj.order == order) { continue; }

      let data = {
        uuid: !!obj ? obj.uuid : uuidv4(),
        scorecard_uuid: indicator.scorecard_uuid,
        indicatorable_id: indicator.indicatorable_id,
        indicatorable_type: indicator.indicatorable_type,
        tag: indicator.tag,
        order: order,
      }

      VotingIndicator.upsert(data);
      savedIndicators.push(data);
    }

    callback(savedIndicators);
  }

  function submitVoting(indicators, participant_uuid) {
    for(let i=0; i<indicators.length; i++) {
      Rating.create(_buildRatingData(indicators[i], participant_uuid));
      _updateIndicator(indicators[i]);
    }
  }

  function savePlayingIndicatorAudio (indicatorPosition) {
    AsyncStorage.setItem('PLAYING_INDICATOR', indicatorPosition);
  }

  async function isPlayingIndicator(indicatorPosition) {
    const playingPosition = await AsyncStorage.getItem('PLAYING_INDICATOR');
    return playingPosition === indicatorPosition
  }

  function clearPlayingIndicator () {
    AsyncStorage.removeItem('PLAYING_INDICATOR');
  }

  function deleteVotingIndicators(scorecardUuid) {
    const votingIndicators = VotingIndicator.getAll(scorecardUuid);

    if (votingIndicators.length > 0) {
      VotingIndicator.destroy(votingIndicators);
    }
  }

  // private method
  function _cleanArchiveIndicators(scorecardUuid, selectedIndicators) {
    let votingIndicators = VotingIndicator.getAll(scorecardUuid);
    let archiveIndicators = votingIndicators.filter(indicator =>
      !selectedIndicators.filter(sc => sc.indicatorable_id == indicator.indicatorable_id && sc.indicatorable_type == indicator.indicatorable_type).length
    )

    archiveIndicators.map(votingIndicator => {
      Rating.destroy(scorecardUuid, votingIndicator.uuid);
    });

    VotingIndicator.destroy(archiveIndicators);
  }

  function _updateIndicator(indicator) {
    let indicatorObj = VotingIndicator.findByUuid(indicator.uuid);
    realm.write(() => {
      indicatorObj[_getCountMethod(indicator)] += 1;
      indicatorObj.median = _getAverageScore(indicatorObj);
    });
  }

  function _buildRatingData(indicator, participant_uuid) {
    return {
      uuid: uuidv4(),
      scorecard_uuid: indicator.scorecard_uuid,
      voting_indicator_uuid: indicator.uuid,
      participant_uuid: participant_uuid,
      score: indicator.ratingScore
    }
  }

  function _getCountMethod(indicator) {
    return ratings.filter(rating => rating.value == indicator.ratingScore)[0]['countMethodName'];
  }

  function _getAverageScore(indicator) {
    let arr = [];

    for(let i=0; i<ratings.length; i++) {
      for(let j=0; j<indicator[ratings[i].countMethodName]; j++) {
        arr.push(ratings[i].value);
      }
    }

    let score = Median(arr);
    return score;
  }
})();

export default votingIndicatorService;
