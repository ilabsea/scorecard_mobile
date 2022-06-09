import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';
import { DOWNLOADED, RUNNING, SUBMITTED, IN_REVIEW } from '../constants/milestone_constant';
import { INDICATOR_DEVELOPMENT } from '../constants/scorecard_constant';
import scorecardHelper from '../helpers/scorecard_helper';
import settingHelper from '../helpers/setting_helper';
import scorecardDataUtil from '../utils/scorecard_data_util';

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
    getScorecardsWithoutEndpoint,
    allScorecardContainEndpoint,
    hasMatchedEndpointUrl,
    isEditable,
    isStepEditable,
    stepIsDone,
    isRefreshable,
    isDeletable,
    isShareable,
    getScorecardWithoutProgramUuid,
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
    const data = await scorecardDataUtil.getBuildData(response);

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

  function getScorecardsWithoutEndpoint() {
    return realm.objects('Scorecard').filtered(`endpoint_url == null OR endpoint_url == ''`);
  }

  async function isEditable(scorecard) {
    if (!await hasMatchedEndpointUrl(scorecard.uuid) && !scorecard.milestone)
      return false;

    return !scorecard.finished;
  }

  async function isStepEditable(scorecard, currentStep) {
    const scorecardProgressStep = scorecard.status || INDICATOR_DEVELOPMENT;
    return await isEditable(scorecard) && scorecardProgressStep >= currentStep;
  }

  function stepIsDone(scorecard, currentStep) {
    if (scorecard.finished)
      return true;

    const scorecardProgressStep = scorecard.status || INDICATOR_DEVELOPMENT;
    return scorecardProgressStep > currentStep;
  }

  // Compare the selected endpoint with the endpoint stored in the scorecard (exclude the user)
  function allScorecardContainEndpoint(editEndpoint) {
    const scorecards = getAll();
    return scorecards.filter(scorecard => _getEndpoint(scorecard.endpoint_url) === editEndpoint).length > 0;
  }

  async function hasMatchedEndpointUrl(scorecardUuid) {
    const endpointUrl = await settingHelper.getFullyEndpointUrl();
    if (!endpointUrl) return false;

    const scorecard = find(scorecardUuid);
    return !!scorecard ? scorecard.endpoint_url === endpointUrl : false;
  }

  async function isRefreshable(scorecard) {
    return await hasMatchedEndpointUrl(scorecard.uuid) && scorecard.isUploaded;
  }

  async function isDeletable(scorecard) {
    return await hasMatchedEndpointUrl(scorecard.uuid) && !scorecard.isUploaded;
  }

  async function isShareable(scorecard) {
    return await hasMatchedEndpointUrl(scorecard.uuid) && scorecard.isCompleted;
  }

  function getScorecardWithoutProgramUuid() {
    return realm.objects('Scorecard').filtered('program_uuid = ""');
  }

  // Private
  function _getEndpoint(endpointUrl) {
    return !!endpointUrl ? endpointUrl.split('@')[2] : '';
  }
})();

export default Scorecard;