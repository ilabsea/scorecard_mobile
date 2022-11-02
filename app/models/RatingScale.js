import realm from '../db/schema';

const MODEL = 'RatingScale';

const RatingScale = (() => {
  return {
    findByScore,
  }

  function findByScore(score) {
    return realm.objects(MODEL).filtered(`value = '${score}'`)[0];
  }
})();

export default RatingScale;