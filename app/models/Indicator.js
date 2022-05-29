import realm from '../db/schema';
import Scorecard from './Scorecard';
import { CUSTOM } from '../constants/indicator_constant';
import settingHelper from '../helpers/setting_helper';

const  MODEL = 'Indicator';

const Indicator = (() => {
  return {
    getAll,
    find,
    create,
    update,
    filter,
    findByScorecard,
    findByScorecardAndName,
    findByUuidAndCurrentEndpointId,
    isNameExist,
    getCustomIndicators,
    destroy,
    arePredefinedIndicatorsHaveUuid,
  };

  function getAll() {
    console.log('++ all indicator = ', realm.objects(MODEL))
  }

  function find(indicatorId, type) {
    if (type === CUSTOM)
      return realm.objects(MODEL).filtered(`indicator_uuid = '${indicatorId}'`)[0];

    return realm.objects(MODEL).filtered(`id = ${indicatorId}`)[0];
  }

  async function create(data, scorecardUuid) {
    const params = await _buildData(data, scorecardUuid);

    realm.write(() => {
      realm.create(MODEL, params, 'modified');
    });
  }

  async function update(uuid, data, scorecardUuid) {
    const params = await _buildData(data, scorecardUuid)

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

  async function findByScorecard(scorecardUuid) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    const facilityId = Scorecard.find(scorecardUuid).facility_id;
    return realm.objects(MODEL).filtered(`facility_id = '${facilityId}' OR scorecard_uuid = '${scorecardUuid}' AND endpoint_id = ${parseInt(endpointId)}`);
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

  async function findByUuidAndCurrentEndpointId(indicatorUuid) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    return realm.objects(MODEL).filtered(`indicator_uuid = '${indicatorUuid}' AND endpoint_id = ${parseInt(endpointId)}`)[0];
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

  //private method
  async function _buildData(data, scorecardUuid) {
    const scorecard = Scorecard.find(scorecardUuid);
    const params = {
      program_uuid: scorecard.program_uuid || '',
      endpoint_id: await settingHelper.getSavedEndpointUrlId(),
      facility_id: data.facility_id || parseInt(scorecard.facility_id),
    }

    return { ...data, ...params };
  }
})();

export default Indicator;