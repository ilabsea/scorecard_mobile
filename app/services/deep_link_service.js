import { Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-community/async-storage';

import newScorecardService from './new_scorecard_service';
import Scorecard from '../models/Scorecard';
import scorecardProgress from '../db/jsons/scorecardProgress';

import { navigate } from '../navigators/app_navigator';

const deepLinkService = (() => {
  return {
    watchInitialURL,
    watchIncommingDeepLink,
    unwatchIncommingDeepLink,
  }

  async function watchInitialURL() {
    const initialUrl = await Linking.getInitialURL();
    if (!!initialUrl)
      AsyncStorage.setItem('INITITAL_URL', initialUrl);
  }

  async function watchIncommingDeepLink(setCurrentScorecard) {
    const initialUrl = await AsyncStorage.getItem('INITITAL_URL');

    if (!!initialUrl) {
      AsyncStorage.removeItem('INITITAL_URL');
      _handleRedirection(initialUrl, setCurrentScorecard);
    }


    Linking.addEventListener('url', (res) => {
      _handleRedirection(res.url, setCurrentScorecard);
    })
  }

  function unwatchIncommingDeepLink() {
    Linking.removeEventListener('url', (res) => {});
  }

  //Private method
  async function _handleRedirection(url, setCurrentScorecard) {
    const authToken = await AsyncStorage.getItem('AUTH_TOKEN');
    if (!authToken) {
      navigate('Setting');
      return;
    }

    const scorecardUuid = url.slice(-6);
    newScorecardService.handleExistedScorecard(scorecardUuid, () => {
      Clipboard.setString(url);
      navigate('NewScorecard');
    }, () => {
      const scorecard = Scorecard.find(scorecardUuid);

      if (scorecard.isUploaded || scorecard.finished) {
        setCurrentScorecard(scorecard);
        navigate('ScorecardProgress', { uuid: scorecardUuid });
        return;
      }

      const step = scorecardProgress[scorecard.status - 1];
      navigate(step.routeName, { scorecard_uuid: scorecardUuid, local_ngo_id: scorecard.local_ngo_id });
    });
  }
})();

export default deepLinkService;