import messaging from '@react-native-firebase/messaging';
import Scorecard from '../models/Scorecard';
import { SUBMITTED, COMPLETED } from '../constants/scorecard_constant';
import { navigationRef } from '../navigators/app_navigator';

const notificationService = (() => {
  return {
    handleReceivePushNotification,
    handleAppOpenFromNotification,
  }

  function handleReceivePushNotification() {
    _watchNotificationInForeground();
    _watchNotificationInBackground();
    _handlePressNotificationInBackground();
  }

  // When the app is opened from a quit state
  function handleAppOpenFromNotification() {
    messaging().getInitialNotification()
      .then(remoteMessage => {
        // if remoteMessage != null, it means the notification caused the app to open from quit state
        if (remoteMessage)
          _handleUpdateScorecardMilestone(remoteMessage, true);
      });
  }

  // private methods

  // Watch the push notification when the app is running and in the foreground
  function _watchNotificationInForeground() {
    messaging().onMessage(async remoteMessage => {
      _handleUpdateScorecardMilestone(remoteMessage);
    });
  }

  // Watch the push notification when the app is running or quit, but in the background
  // If the app is in quit state, the setBackgroundMessageHandler will work with the push notification that doesn't contain the data only
  function _watchNotificationInBackground() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      _handleUpdateScorecardMilestone(remoteMessage);
    });
  }

  // When the user presses on the push notification and the app is running, but in the background
  function _handlePressNotificationInBackground() {
    messaging().onNotificationOpenedApp(remoteMessage => {
      _handleUpdateScorecardMilestone(remoteMessage, true);
    });
  }

  function _handleUpdateScorecardMilestone(remoteMessage, hasRedirection = false) {
    if (!remoteMessage || Object.keys(remoteMessage.data).length === 0)
      return;

    const payload = JSON.parse(remoteMessage.data.payload);
    const { scorecard } = payload;

    if (scorecard.status === COMPLETED) {
      Scorecard.update(scorecard.uuid, { milestone: SUBMITTED });
      hasRedirection && _redirectToScorecardProgress(scorecard.uuid);
    }
  }

  function _redirectToScorecardProgress(scorecardUuid) {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'Home' },
      { name: 'ScorecardProgress', params: {uuid: scorecardUuid} }
    ]});
  }
})();

export default notificationService