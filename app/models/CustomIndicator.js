import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';

const CustomIndicator = (() => {
  return {
    find,
    getAll,
    update,
    deleteAll,
    filter,
    create,
    deleteFile,
  }

  function getAll(scorecardUuid) {
    return realm.objects('CustomIndicator').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function find(uuid) {
    return realm.objects('CustomIndicator').filtered(`uuid='${uuid}'`)[0];
  }

  function create(data) {
    realm.write(() => {
      realm.create('CustomIndicator', data, 'modified');
    });
  }

  function update(uuid, params) {
    if (find(uuid)) {
      realm.write(() => {
        realm.create('CustomIndicator', Object.assign(params, {uuid: uuid}), 'modified');
      })
    }
  }

  function deleteAll(scorecardUuid) {
    const customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (customIndicators.length > 0) {
      realm.write(() => {
        _removeAudioFiles(customIndicators);
        realm.delete(customIndicators);
      });
    }
  }

  function filter(scorecardUuid, text) {
    return realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${scorecardUuid}' AND (name CONTAINS '${text}' OR tag CONTAINS '${text}')`);
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

  // Private method

  function _removeAudioFiles(collection) {
    let filePaths = collection.map(x => x.local_audio).filter(path => !!path);

    for(let i=0; i<filePaths.length; i++) {
      deleteFile(filePaths[i]);
    }
  }
})();

export default CustomIndicator;
