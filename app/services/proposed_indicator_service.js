import AsyncStorage from '@react-native-async-storage/async-storage';
import ProposedIndicator from '../models/ProposedIndicator';
import Participant from '../models/Participant';
import indicatorHelper from '../helpers/indicator_helper';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';
import scorecardProposedIndicatorHelper from '../helpers/scorecard_proposed_indicator_helper';
import uuidv4 from '../utils/uuidv4';
import { sortIndicatorByProposedCount } from '../utils/indicator_util';

const proposedIndicatorService = (() => {
  return {
    handleCreateAndRemoveIndicator,
    create,
    update,
    getProposedIndicators,
    getSelectedProposedIndicators,
    deleteProposedIndicators,
    hasProposedIndicator,
    handleUnconfirmedIndicator,
  }

  function handleCreateAndRemoveIndicator(scorecardUuid, indicator, participantUuid) {
    const proposedIndicator = ProposedIndicator.findByParticipant(scorecardUuid, indicator.indicatorable_id, participantUuid);

    if (!!proposedIndicator) {
      ProposedIndicator.destroy(proposedIndicator);
      return;
    }

    create(scorecardUuid, indicator, participantUuid);
  }

  function create(scorecardUuid, indicator, participantUuid) {
    const attrs = {
      uuid: uuidv4(),
      scorecard_uuid: scorecardUuid.toString(),
      indicatorable_id: indicator.indicatorable_id,
      indicatorable_type: indicator.type,
      indicatorable_name: indicator.name,
      participant_uuid: participantUuid,
      tag: indicator.tag,
      order: scorecardProposedIndicatorHelper.getCurrentOrderNumber(scorecardUuid),
    };

    ProposedIndicator.create(attrs);
    Participant.update(participantUuid, {raised: true})
  }

  function update(scorecardUuid, indicatorId, params) {
    const proposedIndicators = ProposedIndicator.findByIndicator(scorecardUuid, indicatorId);

    proposedIndicators.map(proposedIndicator => {
      ProposedIndicator.update(proposedIndicator.uuid, params);
    });
  }

  function getProposedIndicators(scorecardUuid) {
    let proposedIndicators = JSON.parse(JSON.stringify(ProposedIndicator.getAllDistinct(scorecardUuid)));
    proposedIndicators.map(proposedIndicator => {
      const indicator = indicatorHelper.getDisplayIndicator(proposedIndicator);
      proposedIndicator.proposed_count = ProposedIndicator.findByIndicator(scorecardUuid, proposedIndicator.indicatorable_id).length;
      proposedIndicator.anonymous_count = ProposedIndicator.getNumberAnonymousProposeByIndicator(scorecardUuid, proposedIndicator.indicatorable_id);
      proposedIndicator.name = indicator.name || indicator.content;

      return proposedIndicator;
    });

    return sortIndicatorByProposedCount(proposedIndicators);
  }

  function getSelectedProposedIndicators(scorecardUuid, orderedIndicatorableIds) {
    const proposedIndicators = getProposedIndicators(scorecardUuid);
    const selectedIndicators = proposedIndicators.filter(x => orderedIndicatorableIds.includes(x.indicatorable_id));
    const orderedIndicators = proposedIndicatorHelper.getOrderedSelectedProposedIndicators(selectedIndicators, orderedIndicatorableIds);

    return orderedIndicators.length > 0 ? orderedIndicators : selectedIndicators;
  }

  function deleteProposedIndicators(scorecardUuid) {
    const proposedIndicators = ProposedIndicator.getAllByScorecard(scorecardUuid);

    if (proposedIndicators.length > 0)
      ProposedIndicator.destroy(proposedIndicators);
  }

  function hasProposedIndicator(scorecardUuid) {
    return ProposedIndicator.getAllByScorecard(scorecardUuid).length > 0;
  }

  async function handleUnconfirmedIndicator(scorecardUuid, participantUuid, lastOrderNumber) {
    // Remove the proposed indicators that the user does not confirm to save
    ProposedIndicator.destroyUnconfirmProposedIndicators(scorecardUuid, participantUuid, lastOrderNumber);

    // Recreate the saved proposed indicators that the user unselected and does not confirm to save
    const previousProposedIndicators = JSON.parse(await AsyncStorage.getItem('previous-proposed-indicators')) || [];

    previousProposedIndicators.map(proposedIndicator => {
      if (!ProposedIndicator.findByParticipant(scorecardUuid, proposedIndicator.indicatorable_id, proposedIndicator.participant_uuid)) {
        const data = proposedIndicator;
        data.uuid = uuidv4();
        ProposedIndicator.create(data);
      }
    });
    AsyncStorage.removeItem('previous-proposed-indicators');

    // Check if the particiant doesn't raised any indicator, set the raised status to false
    handleUnraisedParticipant(scorecardUuid, participantUuid)
  }

  // private method
  function handleUnraisedParticipant(scorecardUuid, participantUuid) {
    if (!!participantUuid && ProposedIndicator.getAllDistinctByParticipant(scorecardUuid, participantUuid).length == 0)
      return Participant.update(participantUuid, {raised: false})

    Participant.getAllByScorecard(scorecardUuid).map(participant => {
      const proposedIndicators = ProposedIndicator.getAllDistinctByParticipant(scorecardUuid, participant.uuid)
      if (proposedIndicators.length == 0)
        Participant.update(participant.uuid, {raised: false})
    })
  }
})();

export default proposedIndicatorService;
