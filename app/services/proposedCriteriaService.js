import realm from '../db/schema';

const proposedCriteriaService = (() => {
  return {
    getAll,
    getAllDistinctTag,
    getAllByParticipant,
    getProposedCriterias,
    deleteProposedCriterias,
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

    realm.write(() => {
      realm.delete(proposedCriterias);
    });
  }

})();

export default proposedCriteriaService;