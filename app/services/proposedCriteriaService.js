import criteriaHelper from '../helpers/criteria_helper';
import createNewIndicatorHelper from '../helpers/create_new_indicator_helper';
import Participant from '../models/Participant';
import ProposedCriteria from '../models/ProposedCriteria';

const proposedCriteriaService = (() => {
  return {
    getProposedCriterias,
    deleteProposedCriterias,
    getSelectedCriterias,
    saveProposedCriterias,
  }

  function getProposedCriterias(scorecardUuid) {
    let allCriterias = ProposedCriteria.findByScorecard(scorecardUuid, false);
    let criterias = JSON.parse(JSON.stringify(ProposedCriteria.getAllDistinct(scorecardUuid)));

    criterias.map(criteria =>
      criteria.count = allCriterias.filter(x => x.indicatorable_id == criteria.indicatorable_id && x.indicatorable_type == criteria.indicatorable_type ).length
    );

    return criterias;
  }

  function deleteProposedCriterias(scorecardUuid) {
    const proposedCriterias = ProposedCriteria.findByScorecard(scorecardUuid, false);

    if (proposedCriterias.length > 0)
      ProposedCriteria.destroy(proposedCriterias);
  }

  function getSelectedCriterias(scorecardUuid, orderedIndicatorableIds) {
    const proposedCriterias = getProposedCriterias(scorecardUuid);
    const selectedCriterias = proposedCriterias.filter(x => orderedIndicatorableIds.includes(x.indicatorable_id));
    const orderedCriterias = criteriaHelper.getOrderedCriterias(selectedCriterias, orderedIndicatorableIds);

    return orderedCriterias.length > 0 ? orderedCriterias : selectedCriterias;
  }

  function saveProposedCriterias(params, callback) {
    const { scorecard_uuid, participant_uuid, unselected_indicators, selected_indicators } = params;
    const participants = JSON.parse(JSON.stringify(Participant.findByScorecard(scorecard_uuid)));

    createNewIndicatorHelper.deleteUnselectedProposedIndicator(scorecard_uuid, participant_uuid, unselected_indicators);
    createNewIndicatorHelper.createNewProposedIndicator(scorecard_uuid, participant_uuid, selected_indicators);
    Participant.create({ uuid: participant_uuid, raised: true });

    !!callback && callback(participants);
  }
})();

export default proposedCriteriaService;