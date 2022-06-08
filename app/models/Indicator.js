import realm from '../db/schema';
import Scorecard from './Scorecard';
import LanguageIndicator from './LanguageIndicator';
import { CUSTOM, PREDEFINED } from '../constants/indicator_constant';
import settingHelper from '../helpers/setting_helper';

const  MODEL = 'Indicator';

const Indicator = (() => {
  return {
    find,
    create,
    update,
    filter,
    findByScorecard,
    findByScorecardAndName,
    findByUuidAndCurrentEndpointId,
    getCustomIndicators,
    getIndicatorsWithoutProgramUuidOrEndpointId,
    destroy,
    arePredefinedIndicatorsHaveUuid,
    deleteAll,
    getPredefeinedIndicatorsWithoutUuid,
  };

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
  async function filter(scorecardUuid, text) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    const scorecard = Scorecard.find(scorecardUuid);
    const { facility_id, program_uuid } = scorecard;
    const findQuery = ` AND (name CONTAINS[c] '${text}' OR tag CONTAINS[c] '${text}')`;
    const predefindedIndicatorQuery = _mainQuery(program_uuid, endpointId, PREDEFINED, facility_id) + findQuery;
    const customIndicatorQuery = `${_mainQuery(program_uuid, endpointId, CUSTOM, null)} AND scorecard_uuid = '${scorecardUuid}' ${findQuery}`;

    let indicators = realm.objects(MODEL).filtered(predefindedIndicatorQuery)
    const customIndicators = realm.objects(MODEL).filtered(customIndicatorQuery);

    if (customIndicators.length > 0)
      indicators = [...indicators, ...customIndicators];

    return indicators;
  }

  async function findByScorecard(scorecardUuid) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    const scorecard = Scorecard.find(scorecardUuid);
    const { facility_id, program_uuid } = scorecard;

    const predefinedIndicators = realm.objects(MODEL).filtered(_mainQuery(program_uuid, endpointId, PREDEFINED, facility_id));
    const customIndicators = realm.objects(MODEL).filtered(`${_mainQuery(program_uuid, endpointId, CUSTOM, facility_id)} AND scorecard_uuid = '${scorecardUuid}'`);

    return [...predefinedIndicators, ...customIndicators];
  }

  function findByScorecardAndName(scorecardUuid, name, endpointId, selectedIndicatorUuid = null) {
    const scorecard = Scorecard.find(scorecardUuid);
    const languageIndicator = LanguageIndicator.findByScorecardAndContent(scorecardUuid, scorecard.text_language_code, name, selectedIndicatorUuid);

    if (!languageIndicator)
      return [];

    const { facility_id, program_uuid } = scorecard;
    return realm.objects(MODEL).filtered(`${_mainQuery(program_uuid, endpointId, null, facility_id)} AND indicator_uuid = '${languageIndicator.indicator_uuid}'`);
  }

  async function findByUuidAndCurrentEndpointId(indicatorUuid) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    return realm.objects(MODEL).filtered(`indicator_uuid = '${indicatorUuid}' AND endpoint_id = ${parseInt(endpointId)}`)[0];
  }

  function getCustomIndicators(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND type = '${CUSTOM}'`);
  }

  function getIndicatorsWithoutProgramUuidOrEndpointId(scorecardUuid, facilityId) {
    const predefinedIndicators = realm.objects(MODEL).filtered(`facility_id = ${parseInt(facilityId)} AND type = '${PREDEFINED}' AND (program_uuid = '' OR endpoint_id = null)`);
    const customIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND type = '${CUSTOM}' AND (program_uuid = '' OR endpoint_id = null)`);

    return [...predefinedIndicators, ...customIndicators];
  }

  function destroy(indicator) {
    realm.write(() => {
      realm.delete(indicator);
    });
  }

  function arePredefinedIndicatorsHaveUuid(facilityId) {
    return realm.objects(MODEL).filtered(`facility_id = '${ facilityId }' AND indicator_uuid = null`).length == 0;
  }

  function deleteAll() {
    const indicators = realm.objects(MODEL);

    if (indicators.length == 0)
      return;

    realm.write(() => {
      realm.delete(indicators);
    });
  }

  function getPredefeinedIndicatorsWithoutUuid(facilityId) {
    return realm.objects(MODEL).filtered(`facility_id = ${facilityId} AND type = '${PREDEFINED}' AND indicator_uuid = null OR indicator_uuid = ''`);
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

  function _mainQuery(programUuid, endpointId, type, facilityId) {
    let mainQuery = `program_uuid = '${ programUuid }' AND endpoint_id = ${ parseInt(endpointId) }`;
    if (!!type)
      mainQuery = `${mainQuery} AND type = '${type}'`;
    if (!!facilityId)
      mainQuery = `${mainQuery} AND facility_id = ${parseInt(facilityId)}`;

    return mainQuery;
  }
})();

export default Indicator;