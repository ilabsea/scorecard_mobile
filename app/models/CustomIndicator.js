import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';

const MODEL = 'CustomIndicator';

const CustomIndicator = (() => {
  return {
    find,
    getAll,
    update,
    deleteAll,
    filter,
    create,
    deleteFile,
    isNameExist,
    findByScorecardAndName,
  }

  function getAll(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function find(uuid) {
    return realm.objects(MODEL).filtered(`uuid='${uuid}'`)[0];
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function update(uuid, params) {
    if (find(uuid)) {
      realm.write(() => {
        realm.create(MODEL, Object.assign(params, {uuid: uuid}), 'modified');
      })
    }
  }

  function deleteAll(scorecardUuid) {
    const customIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (customIndicators.length > 0) {
      realm.write(() => {
        _removeAudioFiles(customIndicators);
        realm.delete(customIndicators);
      });
    }
  }

  function filter(scorecardUuid, text) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND (name CONTAINS[c] '${text}' OR tag CONTAINS[c] '${text}')`);
  }

  function deleteFile(filePath) {
    RNFS.exists(filePath)
      .then( (result) => {
        console.log("file exists: ", result);

        if (!result) { return; }

        return RNFS.unlink(filePath)
          .then(() => {
            console.log('FILE DELETED');
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function isNameExist(scorecardUuid, name, selectedIndicatorUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND uuid != '${selectedIndicatorUuid}' AND name ==[c] '${ name }'`).length > 0 ? true : false;
  }

  function findByScorecardAndName(scorecardUuid, name) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND name ==[c] '${name}'`);
  }

  // Private method

  function _removeAudioFiles(collection) {
    let filePaths = collection.map(x => x.local_audio).filter(path => !!path);

    for(let i=0; i<filePaths.length; i++) {
      deleteFile(filePaths[i]);
    }
  }
})();

export default CustomIndicator;
