import realm from '../db/schema';
import Scorecard from './Scorecard';
import CustomIndicator from './CustomIndicator';
import { CUSTOM } from '../constants/indicator_constant';

const  MODEL = 'Indicator';

const Indicator = (() => {
  return {
    find,
    create,
    filter,
    findByScorecard,
    findByScorecardAndName,
    isNameExist,
    getCustomIndicators,
  };

  // function find(id) {
  //   return realm.objects('Indicator').filtered(`id = ${id}`)[0];
  // }

  function find(indicatorId, type) {
    if (type === CUSTOM)
      return realm.objects(MODEL).filtered(`indicator_uuid = '${indicatorId}'`)[0];
    
    return realm.objects(MODEL).filtered(`id = ${indicatorId}`)[0];
    // return realm.objects(MODEL).filtered(`id = ${indicatorId} OR indicator_uuid = '${indicatorId}'`)[0];
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  // Filter predefinded and custom indicator by name or tag
  function filter(scorecardUuid, text) {
    const facilityId = Scorecard.find(scorecardUuid).facility_id;
    let indicators = realm.objects(MODEL).filtered(`facility_id = '${facilityId}' AND (name CONTAINS[c] '${text}' OR tag CONTAINS[c] '${text}')`);
    const customIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND type = '${ CUSTOM }' AND (name CONTAINS[c] '${text}' OR tag CONTAINS[c] '${text}')`);
    if (customIndicators.length > 0)
      indicators = [...indicators, ...customIndicators];

    return indicators;

    // const facilityId = Scorecard.find(scorecardUuid).facility_id;
    // let indicators = realm.objects(MODEL).filtered(`facility_id = '${facilityId}' AND (name CONTAINS[c] '${text}' OR tag CONTAINS[c] '${text}')`);
    // const customIndicators = CustomIndicator.filter(scorecardUuid, text);

    // if (customIndicators.length > 0)
    //   indicators = [...indicators, ...customIndicators];

    // return indicators;
  }

  function findByScorecard(scorecardUuid) {
    const facilityId = Scorecard.find(scorecardUuid).facility_id;
    return realm.objects(MODEL).filtered(`facility_id = '${facilityId}' OR scorecard_uuid = '${scorecardUuid}'`);
    // return realm.objects(MODEL).filtered(`facility_id = '${facilityId}'`);
  }

  function findByScorecardAndName(scorecardUuid, name) {
    const facilityId = Scorecard.find(scorecardUuid).facility_id;
    return realm.objects(MODEL).filtered(`facility_id = '${facilityId}' AND name ==[c] '${name}'`);
  }

  function isNameExist(scorecardUuid, name) {
    const indicators = findByScorecardAndName(scorecardUuid, name);
    return indicators.length > 0 ? true : false;
  }

  function getCustomIndicators(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND type = '${CUSTOM}'`);
  }
})();

export default Indicator;