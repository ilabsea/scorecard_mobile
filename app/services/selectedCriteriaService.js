import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

export const submitCriterias = (scorecard_uuid, criterias) => {
  const selectedCriterias = criterias;
  const selectedTags = criterias.map(x => x.tag);
  const scorecardUuid = scorecard_uuid;

  realm.write(() => {
    cleanVotingCriteria();
    createVotingCriterias();
  });

  function createVotingCriterias() {
    for(let i=0; i<selectedCriterias.length; i++) {
      createVotingCriteria(selectedCriterias[i]);
    }
  }

  function createVotingCriteria(criteria) {
    let obj = realm.objects('VotingCriteria').filtered(`scorecard_uuid='${criteria.scorecard_uuid}' AND tag='${criteria.tag}'`)[0];

    if (!!obj) { return; }

    let data = {
      uuid: uuidv4(),
      scorecard_uuid: criteria.scorecard_uuid,
      indicatorable_id: criteria.indicatorable_id,
      indicatorable_type: criteria.indicatorable_type,
      tag: criteria.tag,
    }

    realm.create('VotingCriteria', data);
  }

  function cleanVotingCriteria() {
    let votingCriterias = realm.objects('VotingCriteria').filtered(`scorecard_uuid='${scorecardUuid}'`);
    let archiveCriterias = votingCriterias.filter(criteria => !selectedTags.includes(criteria.tag));

    realm.delete(archiveCriterias);
  }
}
