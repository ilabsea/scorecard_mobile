import AsyncStorage from '@react-native-community/async-storage';
import { VOTING } from '../constants/scorecard_constant';
import VotingIndicator from '../models/VotingIndicator';
import Scorecard from '../models/Scorecard';

const scorecardProgressService = (() => {
  return {
    isAllowToFinish,
    getProgressMessage,
  }

  async function isAllowToFinish(scorecard) {
    if (scorecard.finished || !await Scorecard.hasMatchedEndpointUrl(scorecard.uuid))
      return false;

    const votingIndicators = VotingIndicator.getAll(scorecard.uuid);

    if (votingIndicators.length == 0)
      return false;

    return votingIndicators.filter(votingIndicator => !votingIndicator.suggested_action).length > 0 ? false : true;
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