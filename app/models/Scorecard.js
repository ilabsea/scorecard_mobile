import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import { DOWNLOADED, RUNNING, SUBMITTED, IN_REVIEW } from '../constants/milestone_constant';
import { apiDateFormat } from '../constants/date_format_constant';
import scorecardHelper from '../helpers/scorecard_helper';

const Scorecard = (() => {
  return {
    getAll,
    find,
    update,
    upsert,
    destroy,
    isSubmitted,
    isExists,
    tourTipShown,
    hasUnsubmitted,
    getMilestone,
    getSubmittedExpired,
    getAllProvinces,
    getScorecardsInReview,
    allScorecardContainEndpoint,
    hasMatchedEndpointUrl,
  }

  function getAll() {
    return realm.objects('Scorecard').sorted('downloaded_at', true);
  }

  function find(uuid) {
    return realm.objects('Scorecard').filtered(`uuid='${uuid}'`)[0];
  }

  function update(uuid, params={}, callback = null) {
    if (find(uuid)) {
      realm.write(() => {
        realm.create('Scorecard', Object.assign(params, {uuid: uuid}), 'modified');

        !!callback && callback(find(uuid));
      })
    }
  }

  async function upsert(response) {
    AsyncStorage.setItem('SELECTED_SCORECARD_UUID', response.uuid);
    const data = await _buildData(response);

    realm.write(() => {
      realm.create('Scorecard', data, 'modified');
    });
  }

  function destroy(scorecardUuid) {
    let scorecard = find(scorecardUuid);

    if (scorecard) {
      realm.write(() => {
        realm.delete(scorecard);
      });
    }
  }

  function isSubmitted(scorecardUuid) {
    const scorecard = find(scorecardUuid);

    return !!scorecard && scorecard.isUploaded;
  }

  function isExists(uuid) {
    return !!find(uuid);
  }

  function tourTipShown(uuid) {
    return find(uuid).tour_tip_shown;
  }

  function hasUnsubmitted() {
    const scorecards = realm.objects('Scorecard').filtered(`uploaded_date == null`);
    return scorecards.length > 0 ? true : false;
  }

  function getMilestone(scorecard) {
    if (!!scorecard.uploaded_date)
      return SUBMITTED;
    else if (scorecard.status < 2)
      return DOWNLOADED;
    else if (scorecard.status >= 2 && !scorecard.uploaded_date)
      return RUNNING;

    return '';
  }

  function getSubmittedExpired() {
    const scorecards = realm.objects('Scorecard').filtered('uploaded_date != null');
    let expiredScorecards = [];

    for (let i = 0; i < scorecards.length; i++) {
      const isAbleToRemove = scorecardHelper.isExpired(scorecards[i].uploaded_date);

      if (isAbleToRemove)
        expiredScorecards.push(scorecards[i]);
    }

    return expiredScorecards;
  }

  function getAllProvinces() {
    const scorecards = getAll();
    const provinces = [...new Set(scorecards.map(scorecard => scorecard.province))];

    return provinces;
  }

  function getScorecardsInReview() {
    return realm.objects('Scorecard').filtered(`milestone = '${IN_REVIEW}'`);
  }

  // Compare the selected endpoint with the endpoint stored in the scorecard (exclude the user)
  function allScorecardContainEndpoint(editEndpoint) {
    const scorecards = getAll();
    return scorecards.filter(scorecard => _getEndpoint(scorecard.endpoint_url) === editEndpoint).length > 0;
  }

  function hasMatchedEndpointUrl(scorecardUuid, endpointUrl) {
    if (!endpointUrl) return false;

    const scorecard = find(scorecardUuid);
    return !!scorecard ? scorecard.endpoint_url === endpointUrl : false;
  }

  // Private

  async function _buildData(response) {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));

    return ({
      uuid: response.uuid,
      unit_type: _getStringValue(response.unit_type_name),
      facility_id: response.facility_id,
      facility: response.facility != null ? JSON.stringify(response.facility) : '',
      facility_code: _getStringValue(response.facility.code),
      scorecard_type: _getStringValue(response.scorecard_type),
      name: _getStringValue(response.name),
      description: _getStringValue(response.description),
      year: response.year,
      local_ngo_name: _getStringValue(response.local_ngo_name),
      local_ngo_id: response.local_ngo_id,
      province: _getStringValue(response.province),
      district: _getStringValue(response.district),
      commune: _getStringValue(response.commune),
      program_id: response.program_id,
      downloaded_at: new Date(),
      primary_school: response.primary_school != null ? JSON.stringify(response.primary_school) : null,
      planned_start_date: Moment(response.planned_start_date).format(apiDateFormat),
      planned_end_date: Moment(response.planned_end_date).format(apiDateFormat),
      endpoint_url: `${savedSetting.email}@${savedSetting.backendUrl}`,
    })
  }

  function _getStringValue(value) {
    return !!value ? value : '';
  }

  function _getEndpoint(endpointUrl) {
    return !!endpointUrl ? endpointUrl.split('@')[2] : '';
  }
})();

export default Scorecard;
