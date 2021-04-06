import realm from '../db/schema';
import ScorecardService from './scorecardService';
import Facilitator from '../models/Facilitator';
import { RUNNING } from '../constants/milestone_constant';
import Scorecard from '../models/Scorecard';

const proposedCriteriaService = (() => {
  return {
    getAll,
    getAllDistinctTag,
    getAllByParticipant,
    getAllDistinct,
    getProposedCriterias,
    deleteProposedCriterias,
    updateMilestone,
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

  function updateMilestone(scorecardUuid) {
    const scorecard = Scorecard.find(scorecardUuid);

    if (scorecard.isUploaded)
      return;

    const data = {
      scorecard: {
        milestone: RUNNING,
        facilitators_attributes: Facilitator.getDataForMilestone(scorecardUuid),
      }
    };

    const scorecardService = new ScorecardService();
    scorecardService.updateMilestone(scorecardUuid, data, RUNNING);
  }
})();

export default proposedCriteriaService;
