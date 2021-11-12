import { Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-community/async-storage';

import newScorecardService from './new_scorecard_service';
import { getErrorType } from './api_service';
import Scorecard from '../models/Scorecard';
import scorecardProgress from '../db/jsons/scorecardProgress';

import { navigate, navigationRef } from '../navigators/app_navigator';

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

    if (!!initialUrl) {
      AsyncStorage.removeItem('INITITAL_URL');
      _handleRedirection(initialUrl, updateModalStatus, closeModal, handleOccupiedScorecard);
    }

    // const handleRedirection = (res) => _handleRedirection(res.url, updateModalStatus, closeModal, handleOccupiedScorecard);
    // Linking.addEventListener('url', handleRedirection);

    Linking.addEventListener('url', async (res) => {
      _handleRedirection(res.url, updateModalStatus, closeModal, handleOccupiedScorecard);
    })
  }

  //Private method
  function _handleRedirection(url, updateModalStatus, closeModal, handleOccupiedScorecard) {
    const scorecardUuid = url.slice(-6);
    updateModalStatus(true, scorecardUuid, null);

    setTimeout(() => {
      newScorecardService.handleExistedScorecard(scorecardUuid, () => {
        Clipboard.setString(url);

        if (!!Scorecard.find(scorecardUuid)) {
          console.log('== scorecard already exist ====')

          closeModal();
          // navigate('ScorecardDetail', {scorecard_uuid: scorecardUuid})
          navigationRef.current?.reset({ index: 0, routes: [{ name: 'ScorecardDetail', params: { scorecard_uuid: scorecardUuid } }] });
          return;
        }

        newScorecardService.joinScorecard(scorecardUuid,
          (errorType) => updateModalStatus(false, scorecardUuid, errorType),
          () => {
            closeModal();
            navigationRef.current?.reset({ index: 1, routes: [{ name: 'ScorecardDetail', params: { scorecard_uuid: scorecardUuid } }] });
            // navigate('ScorecardDetail', {scorecard_uuid: scorecardUuid})
          },
          (error) => updateModalStatus(false, scorecardUuid, getErrorType(error.status))
        );
      }, () => {
        const scorecard = Scorecard.find(scorecardUuid);

        if (scorecard.isUploaded || scorecard.finished) {
          handleOccupiedScorecard(scorecard);
          return;
        }

        console.log('== scorecard continue ====')

        closeModal();
        const step = scorecardProgress[scorecard.status - 1];
        navigationRef.current?.reset({ index: 0, routes: [{ name: step.routeName, params: { scorecard_uuid: scorecardUuid, local_ngo_id: scorecard.local_ngo_id } }] });
        // navigate(step.routeName, { scorecard_uuid: scorecardUuid, local_ngo_id: scorecard.local_ngo_id });
      });
    }, 50);
  }
})();

export default deepLinkService;