import realm from '../db/schema';

const proposedCriteriaService = (() => {
  return {
    getAll,
    getAllDistinctTag,
    getProposedCriterias,
  }

  function getAll(scorecardUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function getAllDistinctTag(scorecardUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(tag)`);
  }

  function getProposedCriterias(scorecardUuid) {
    let allCriterias = getAll(scorecardUuid);
    let criterias = JSON.parse(JSON.stringify(getAllDistinctTag(scorecardUuid)));
    criterias.map(criteria => criteria.count = allCriterias.filter(x => x.tag == criteria.tag).length);

    return criterias;
  }

})();

export default proposedCriteriaService;
