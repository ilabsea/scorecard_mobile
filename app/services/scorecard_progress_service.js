import { VOTING } from '../constants/scorecard_step_constant';
import VotingIndicator from '../models/VotingIndicator';
import Scorecard from '../models/Scorecard';
import settingHelper from '../helpers/setting_helper';

const scorecardProgressService = (() => {
  return {
    isAllowToFinish,
    getProgressMessage,
  }

  function isAllowToFinish(scorecard) {
    if (scorecard.finished)
      return false;

    const votingIndicators = VotingIndicator.getAll(scorecard.uuid);

    if (votingIndicators.length == 0)
      return false;

    return votingIndicators.filter(votingIndicator => !votingIndicator.suggested_action).length > 0 ? false : true;
  }

  async function getProgressMessage(indicators, scorecard, hasValidOwnerAndEndpoint) {
    if (!hasValidOwnerAndEndpoint)
      return await _getInvalidOwnerAndEndpointMessage(scorecard.uuid);

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
  async function _getInvalidOwnerAndEndpointMessage(scorecardUuid) {
    const { owner, endpoint } = await settingHelper.getCurrentSignInData();
    const scorecard = Scorecard.find(scorecardUuid)
    const scorecardEndpointData = scorecard.endpoint_url.split('@');
    const scorecardOwner = `${scorecardEndpointData[0]}@${scorecardEndpointData[1]}`;
    const scorecardEndpoint = scorecardEndpointData[2];

    if (owner === scorecardOwner && endpoint === scorecardEndpoint)
      return '';

    return endpoint != scorecardEndpoint ? 'theServerUrlHasBeenChanged' : 'theOwnerHasBeenChanged';
  }
})();

export default scorecardProgressService;