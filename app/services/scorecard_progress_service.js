import AsyncStorage from '@react-native-async-storage/async-storage';
import { VOTING } from '../constants/scorecard_constant';
import VotingIndicator from '../models/VotingIndicator';
import Scorecard from '../models/Scorecard';
import ScorecardProgressApi from '../api/ScorecardProgressApi';

const scorecardProgressService = (() => {
  return {
    getProgressMessage,
    setOpenCloseVoting,
  }

  async function getProgressMessage(indicators, scorecard) {
    if (!await Scorecard.hasMatchedEndpointUrl(scorecard.uuid))
      return await _getInvalidUserAndEndpointMessage(scorecard.uuid);

    if (scorecard.finished)
      return '';

    let votingIndicators = indicators.length > 0 ? indicators : VotingIndicator.getAll(scorecard.uuid);
    const messages = [
      { label: scorecard.status < VOTING ? 'pleaseCompleteAllTheSteps' : null },
      { label: votingIndicators.filter(votingIndicator => !votingIndicator.median).length > 0 ? 'allIndicatorMustBeVoted' : null },
      { label: votingIndicators.filter(votingIndicator => !votingIndicator.suggested_action).length > 0 ? 'allIndicatorMustHaveSuggestedAction' : null },
    ]
    const infoMessages = messages.filter(message => message.label);
    return infoMessages.length > 0 ? infoMessages[0].label : '';
  }

  async function setOpenCloseVoting({ scorecardUuid, isOpen, successCallback, errorCallback }) {
    const data = {
      scorecard_progress: {
        scorecard_uuid: scorecardUuid,
        status: isOpen ? "open_voting" : "close_voting",
      }
    };

    ScorecardProgressApi.post(data)
      .then(function (response) {
        if (response.status == 200) {
          Scorecard.update(scorecardUuid, { is_open_voting: isOpen });
          successCallback && successCallback();
        }
        else
          !!errorCallback && errorCallback(response.error);
      });
  }

  // private method
  async function _getInvalidUserAndEndpointMessage(scorecardUuid) {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));
    const scorecard = Scorecard.find(scorecardUuid)
    const scorecardEndpointData = scorecard.endpoint_url.split('@');
    const scorecardUser = `${scorecardEndpointData[0]}@${scorecardEndpointData[1]}`;
    const scorecardEndpoint = scorecardEndpointData[2];

    if (savedSetting.email === scorecardUser && savedSetting.backendUrl === scorecardEndpoint)
      return '';

    return savedSetting.backendUrl != scorecardEndpoint ? 'theServerUrlHasBeenChanged' : 'theOwnerHasBeenChanged';
  }
})();

export default scorecardProgressService;