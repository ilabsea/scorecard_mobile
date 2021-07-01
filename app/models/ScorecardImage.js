import realm from '../db/schema';

const MODEL_NAME = 'Institution'

const ScorecardImage = (() => {
  return {
    create,
    destroy,
    findByScorecard,
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL_NAME, data);
    });
  }

  function destroy(scorecardUuid, filePath) {
    const image = realm.objects(MODEL_NAME).filtered(`scorecard_uuid = '${scorecardUuid}' AND image_path = '${filePath}'`);

    if(image) {
      realm.write(() => {
        realm.delete(image);
      });
    }
  }

  function findByScorecard(scorecardUuid) {
    return realm.objects(MODEL_NAME).filtered(`scorecard_uuid = '${scorecardUuid}'`);
  }
});

export default ScorecardImage;