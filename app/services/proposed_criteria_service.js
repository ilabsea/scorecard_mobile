import ProposedCriteria from '../models/ProposedCriteria';

const proposedCriteriaService = (() => {
  return {
    update
  }

  function update(scorecardUuid, indicatorId, params) {
    const proposedCriterias = ProposedCriteria.findByIndicator(scorecardUuid, indicatorId);

    proposedCriterias.map(proposedCriteria => {
      ProposedCriteria.update(proposedCriteria.uuid, params);
    });
  }
})();

export default proposedCriteriaService;