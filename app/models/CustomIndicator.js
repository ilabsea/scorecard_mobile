import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';

const MODEL = 'CustomIndicator';

const CustomIndicator = (() => {
  return {
    find,
    getAll,
    update,
    filter,
    create,
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

  function filter(scorecardUuid, text) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND (name CONTAINS[c] '${text}' OR tag CONTAINS[c] '${text}')`);
  }

  function isNameExist(scorecardUuid, name, selectedIndicatorUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND uuid != '${selectedIndicatorUuid}' AND name ==[c] '${ name }'`).length > 0 ? true : false;
  }

  function findByScorecardAndName(scorecardUuid, name) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND name ==[c] '${name}'`);
  }
})();

export default CustomIndicator;
