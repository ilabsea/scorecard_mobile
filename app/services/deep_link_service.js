import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import newScorecardService from './new_scorecard_service';
import { getErrorType } from './api_service';
import Scorecard from '../models/Scorecard';
import scorecardProgress from '../db/jsons/scorecardProgress';
import { ERROR_INCORRECT_SCORECARD_CODE } from '../constants/error_constant';

import { navigationRef } from '../navigators/app_navigator';

const deepLinkService = (() => {
  return {
    watchInitialURL,
    watchIncommingDeepLink,
  }

  async function watchInitialURL() {
    const initialUrl = await Linking.getInitialURL();
    if (!!initialUrl)
      AsyncStorage.setItem('INITITAL_URL', initialUrl);
  }

  async function watchIncommingDeepLink(updateModalStatus, closeModal, handleOccupiedScorecard) {
    const initialUrl = await AsyncStorage.getItem('INITITAL_URL');

    // Handle redirection when the app is killed
    if (!!initialUrl) {
      AsyncStorage.removeItem('INITITAL_URL');
      _handleRedirection(initialUrl, updateModalStatus, closeModal, handleOccupiedScorecard);
    }

    // Handle redirection when the app is in background
    if (!await AsyncStorage.getItem('HANDLE_DEEP_LINK')) {
      AsyncStorage.setItem('HANDLE_DEEP_LINK', 'true');

      Linking.addEventListener('url', (res) => {
        _handleRedirection(res.url, updateModalStatus, closeModal, handleOccupiedScorecard);
      })
    }
  }

  //Private method
  function _handleRedirection(url, updateModalStatus, closeModal, handleOccupiedScorecard) {
    const scorecardUuid = url.slice(-6);

    // If the last 6 digits include a special character or letter, shows an incorrect scorecard code message
    if (!parseInt(scorecardUuid)) {
      updateModalStatus(false, scorecardUuid.match(/\d|\./g).join(''), ERROR_INCORRECT_SCORECARD_CODE);
      return;
    }

    updateModalStatus(true, scorecardUuid, null);        // Show loading popup modal

    setTimeout(() => {
      newScorecardService.handleExistedScorecard(scorecardUuid, () => {
        if (!!Scorecard.find(scorecardUuid)) {
          closeModal();
          _redirectTo('ScorecardDetail', { scorecard_uuid: scorecardUuid });
          return;
        }

        newScorecardService.joinScorecard(scorecardUuid,
          (errorType) => updateModalStatus(false, scorecardUuid, errorType),          // Error caused by the scorecard status
          () => {
            closeModal();
            _redirectTo('ScorecardDetail', { scorecard_uuid: scorecardUuid });        // Join scorecard success
          },
          (error) => updateModalStatus(false, scorecardUuid, getErrorType(error.status))         // Error caused by the request issue (ex: no internet connection, ...)
        );
      }, () => {
        // Handle redirection when scorecard is already exist in the app
        const scorecard = Scorecard.find(scorecardUuid);
        closeModal();

        if (scorecard.isUploaded || scorecard.finished) {
          handleOccupiedScorecard(scorecard);
          return;
        }

        const step = scorecardProgress[scorecard.status - 1];
        _redirectTo(step.routeName, { scorecard_uuid: scorecardUuid, local_ngo_id: scorecard.local_ngo_id });
      });
    }, 50);
  }

  function _redirectTo(screenName, params) {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'Home' },
      { name: screenName, params: params }
    ]});
  }
})();

export default deepLinkService;