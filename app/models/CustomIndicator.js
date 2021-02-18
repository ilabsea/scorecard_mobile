import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';

const CustomIndicator = (() => {
  return {
    getAll,
  }

  function getAll(scorecardUuid) {
    return realm.objects('CustomIndicator').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }
})();

export default CustomIndicator;
