import realm from '../db/schema';
import criteriaHelper from '../helpers/criteria_helper';

const proposedCriteriaService = (() => {
  return {
    getAll,
    getAllDistinctTag,
    getAllByParticipant,
    getAllDistinct,
    getProposedCriterias,
    deleteProposedCriterias,
    getSelectedCriterias,
  }

  function getAll(scorecardUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function getAllByParticipant(scorecardUuid, participantUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid = '${scorecardUuid}' AND participant_uuid = '${participantUuid}'`);
  }

  function getAllDistinctTag(scorecardUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(tag)`);
  }

  function getAllDistinct(scorecardUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(indicatorable_id, indicatorable_type)`);
  }

  function getProposedCriterias(scorecardUuid) {
    let allCriterias = getAll(scorecardUuid);
    let criterias = JSON.parse(JSON.stringify(getAllDistinct(scorecardUuid)));

    criterias.map(criteria =>
      criteria.count = allCriterias.filter(x => x.indicatorable_id == criteria.indicatorable_id && x.indicatorable_type == criteria.indicatorable_type ).length
    );

    return criterias;
  }

  function deleteProposedCriterias(scorecardUuid) {
    const proposedCriterias = getAll(scorecardUuid);

    if (proposedCriterias.length > 0) {
      realm.write(() => {
        realm.delete(proposedCriterias);
      });
    }
  }

  function getSelectedCriterias(scorecardUuid, orderedIndicatorableIds) {
    const proposedCriterias = getProposedCriterias(scorecardUuid);
    const selectedCriterias = proposedCriterias.filter(x => orderedIndicatorableIds.includes(x.indicatorable_id));
    const orderedCriterias = criteriaHelper.getOrderedCriterias(selectedCriterias, orderedIndicatorableIds);

    return orderedCriterias.length > 0 ? orderedCriterias : selectedCriterias;
  }
})();

export default proposedCriteriaService;