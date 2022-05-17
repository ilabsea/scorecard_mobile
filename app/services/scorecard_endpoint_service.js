import AsyncStorage from '@react-native-community/async-storage';
import pkg from '../../package';
import settingHelper from '../helpers/setting_helper';
import Scorecard from '../models/Scorecard';

const scorecardEndpointService = (() => {
  return {
    isRequireToUpdateScorecardEndpoint,
    setIsNotFirstTimeAppOpen,
    handleUpdateScorecardEndpointUrl,
  }

  // To do: Remove the update endpoint in the future
  // When updating the app to version 1.5.2, user requires to update the re-authenicate in
  // in setting screen to update the endpoint_url of the scorecard that has null on that field
  // because when updating the app from previous versoin to 1.5.2, some scorecard will have
  // endpoint_url as null or ''
  function isAppVersionForUpdateScorecard() {
    return pkg.version == '1.5.2'
  }

  // Todo: rename to shouldShowReauthenticationMessage
  async function isRequireToUpdateScorecardEndpoint() {
    return isAppVersionForUpdateScorecard() && await _isFirstTimeAppOpen()
  }

  function setIsNotFirstTimeAppOpen() {
    AsyncStorage.setItem('IS_FIRST_TIME_APP_OPEN', 'false');
  }

  async function handleUpdateScorecardEndpointUrl() {
    if (!isAppVersionForUpdateScorecard())
      return;

    console.log('===== start updating scorecard endpoint URL =====')
    const endpointUrl = await settingHelper.getEndpointUrl();
    const scorecards = Scorecard.getScorecardsWithoutEndpoint();

    console.log('===== scorecard no endpoint ===== ', scorecards.length)

    scorecards.map(scorecard => {
      Scorecard.update(scorecard.uuid, { endpoint_url: endpointUrl });
    });
  }

  // private method
  async function _isFirstTimeAppOpen() {
    const isFirstTimeOpen = await AsyncStorage.getItem('IS_FIRST_TIME_APP_OPEN');
    return isFirstTimeOpen == null && isFirstTimeOpen == undefined;
  }
})();

export default scorecardEndpointService;