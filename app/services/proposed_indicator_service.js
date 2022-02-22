import ProposedIndicator from '../models/ProposedIndicator';
import indicatorHelper from '../helpers/indicator_helper';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';
import { CUSTOM } from '../constants/indicator_constant';
import uuidv4 from '../utils/uuidv4';
import { sortIndicatorByRaisedCount } from '../utils/indicator_util';

const proposedIndicatorService = (() => {
  return {
    handleCreateAndRemoveIndicator,
    create,
    update,
    getProposedIndicators,
    getSelectedProposedIndicators,
    deleteProposedIndicators,
    hasProposedIndicator,
  }

  function handleCreateAndRemoveIndicator(scorecardUuid, indicator, participantUuid) {
    const proposedIndicator = ProposedIndicator.findByParticipant(scorecardUuid, indicator.uuid, participantUuid);

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
      // indicatorable_id: indicator.type === CUSTOM ? indicator.indicator_uuid : indicator.indicatorable_id,
      indicatorable_id: indicator.indicatorable_id,
      indicatorable_type: indicator.type,
      indicatorable_name: indicator.name,
      participant_uuid: participantUuid,
      tag: indicator.tag,
      order: parseInt(ProposedIndicator.getLastOrderNumber(scorecardUuid)) + 1,
    };

    console.log('create attri == ', attrs)

    ProposedIndicator.create(attrs);
  }

  // function create(scorecardUuid, indicator, participantUuid) {
  //   const attrs = {
  //     uuid: uuidv4(),
  //     scorecard_uuid: scorecardUuid.toString(),
  //     indicatorable_id: indicator.uuid.toString(),
  //     indicatorable_type: indicator.type || CUSTOM,
  //     indicatorable_name: indicator.name,
  //     participant_uuid: participantUuid,
  //     tag: indicator.tag,
  //     order: parseInt(ProposedIndicator.getLastOrderNumber(scorecardUuid)) + 1,
  //   };

  //   ProposedIndicator.create(attrs);
  // }

  function update(scorecardUuid, indicatorId, params) {
    const proposedIndicators = ProposedIndicator.findByIndicator(scorecardUuid, indicatorId);

    proposedIndicators.map(proposedIndicator => {
      ProposedIndicator.update(proposedIndicator.uuid, params);
    });
  }

  function getProposedIndicators(scorecardUuid) {
    const allIndicators = ProposedIndicator.getAllByScorecard(scorecardUuid);
    let proposedIndicators = JSON.parse(JSON.stringify(ProposedIndicator.getAllDistinct(scorecardUuid)));

    proposedIndicators.map(proposedIndicator => {
      proposedIndicator.count = allIndicators.filter(x => x.indicatorable_id == proposedIndicator.indicatorable_id && x.indicatorable_type == proposedIndicator.indicatorable_type ).length;
      const indicator = indicatorHelper.getDisplayIndicator(proposedIndicator);
      proposedIndicator.raised_count = allIndicators.filter(x => x.indicatorable_id == proposedIndicator.indicatorable_id).length;
      proposedIndicator.name = indicator.name || indicator.content;

      return proposedIndicator;
    });

    return sortIndicatorByRaisedCount(proposedIndicators);
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
})();

export default proposedIndicatorService;