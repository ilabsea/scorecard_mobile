import realm from '../db/schema';
import Scorecard from './Scorecard';
import { CUSTOM } from '../constants/indicator_constant';

const  MODEL = 'Indicator';

const Indicator = (() => {
  return {
    find,
    create,
    update,
    filter,
    findByScorecard,
    findByScorecardAndName,
    isNameExist,
    getCustomIndicators,
    destroy,
    arePredefinedIndicatorsHaveUuid,
    getIndicatorsWithoutEndpointUrl,
    hasNoEndpointUrl,
    deleteAll,
  };

  function find(indicatorId, type) {
    if (type === CUSTOM)
      return realm.objects(MODEL).filtered(`indicator_uuid = '${indicatorId}'`)[0];

    return realm.objects(MODEL).filtered(`id = ${indicatorId}`)[0];
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function update(uuid, params) {
    realm.write(() => {
      realm.create(MODEL, Object.assign(params, { uuid: uuid }), 'modified');
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
  }

  function findByScorecard(scorecardUuid) {
    const facilityId = Scorecard.find(scorecardUuid).facility_id;
    return realm.objects(MODEL).filtered(`facility_id = '${facilityId}' OR scorecard_uuid = '${scorecardUuid}'`);
  }

  function findByScorecardAndName(scorecardUuid, name, selectedIndicatorUuid = null) {
    const facilityId = Scorecard.find(scorecardUuid).facility_id;
    const predefinedIndicators = realm.objects(MODEL).filtered(`facility_id = '${facilityId}' AND name ==[c] '${name}'`);

    if (predefinedIndicators.length > 0)
      return predefinedIndicators;

    const query = !selectedIndicatorUuid ? `scorecard_uuid = '${scorecardUuid}' AND name ==[c] '${name}'`
                  : `scorecard_uuid = '${ scorecardUuid }' AND indicator_uuid != '${ selectedIndicatorUuid }' AND name ==[c] '${ name }'`;
    
    return realm.objects(MODEL).filtered(query);
  }

  function isNameExist(scorecardUuid, name, selectedIndicatorUuid) {
    return findByScorecardAndName(scorecardUuid, name, selectedIndicatorUuid).length > 0;
  }

  function getCustomIndicators(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND type = '${CUSTOM}'`);
  }

  function destroy(indicator) {
    realm.write(() => {
      realm.delete(indicator);
    });
  }

  function arePredefinedIndicatorsHaveUuid(facilityId) {
    return realm.objects(MODEL).filtered(`facility_id = '${ facilityId }' AND indicator_uuid = null`).length == 0;
  }

  function getIndicatorsWithoutEndpointUrl() {
    return realm.objects(MODEL).filtered(`endpoint_url = '' OR endpoint_url = null`);
  }

  function hasNoEndpointUrl() {
    const indicators = getIndicatorsWithoutEndpointUrl();
    return indicators.length > 0;
  }

  function deleteAll() {
    const indicators = realm.objects(MODEL);

    if (indicators.length > 0) {
      realm.write(() => {
        realm.delete(indicators);
      });
    }
  }
})();

export default Indicator;