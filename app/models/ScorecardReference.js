import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import ImagePicker from 'react-native-image-crop-picker';

const MODEL_NAME = 'ScorecardReference'

const ScorecardReference = (() => {
  return {
    create,
    destroy,
    findByScorecard,
    hasItem,
    deleteAllByScorecardUuid
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL_NAME, _buildData(data));
    });
  }

  function destroy(scorecardUuid, filePath) {
    const image = realm.objects(MODEL_NAME).filtered(`scorecard_uuid = '${scorecardUuid}' AND image_path = '${filePath}'`);

    if(image) {
      realm.write(() => {
        realm.delete(image);
      });

      ImagePicker.cleanSingle(filePath);
    }
  }

  function deleteAllByScorecardUuid(scorecardUuid) {
    const scorecardReferences = realm.objects(MODEL_NAME).filtered(`scorecard_uuid = '${scorecardUuid}'`);
    if (scorecardReferences.length == 0)
      return;

    scorecardReferences.forEach(scorecardReference => {
      if (!!scorecardReference.image_path)
        ImagePicker.cleanSingle(scorecardReference.image_path);

      realm.write(() => {
        realm.delete(scorecardReference);
      });
    });
  }

  function findByScorecard(scorecardUuid) {
    return realm.objects(MODEL_NAME).filtered(`scorecard_uuid = '${scorecardUuid}' SORT(order DESC)`);
  }

  function hasItem(scorecardUuid) {
    return realm.objects(MODEL_NAME).filtered(`scorecard_uuid = '${scorecardUuid}'`).length > 0 ? true : false;
  }

  // private method
  function _buildData(data) {    
    return {
      uuid: uuidv4(),
      scorecard_uuid: data.scorecard_uuid,
      image_path: data.image_path,
      order: _getOrderNumber(data.scorecard_uuid)
    }
  }

  function _getOrderNumber(scorecardUuid) {
    const scorecardReferences = findByScorecard(scorecardUuid);

    if (scorecardReferences.length == 0)
      return 1;
    else
      return scorecardReferences[0].order + 1;
  }
})();

export default ScorecardReference;