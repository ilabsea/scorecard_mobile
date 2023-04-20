import DeviceInfo from 'react-native-device-info'
import { getDeviceStyle, isShortScreenDevice } from '../utils/responsive_util';
import tabletStyles from '../styles/tablet/ProposedIndicatorCardComponentStyle';
import mobileStyles from '../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(tabletStyles, mobileStyles)

const proposedIndicatorStyleHelper = (() => {
  return {
    getStyleByProposeType,
    getAddNewProposeButtonStyles
  }

  function getStyleByProposeType(isIndicatorBase, type) {
    const allStyles = {
      indicatorBase: {
        solidCard: styles.indicatorCardContainer,
        outlineCard: styles.indicatorBaseOutlinedCardContainer,
        swipeableButton: styles.indicatorBaseSwipeableButton
      },
      participantBase: {
        solidCard: styles.indicatorCardContainer,
        outlineCard: styles.participantBaseOutlinedCardContainer,
        swipeableButton: styles.participantBaseSwipeableButton
      },
    }
    return allStyles[isIndicatorBase ? 'indicatorBase' : 'participantBase'][type]
  }

  function getAddNewProposeButtonStyles(appLanguage, type) {
    if (DeviceInfo.isTablet() || appLanguage == 'km') return {}

    const styles = {
      button: {paddingLeft: isShortScreenDevice() ? 4 : 8, paddingRight: isShortScreenDevice() ? 4 : 8},
      label: {paddingLeft: isShortScreenDevice() ? 4 : 6}
    }
    return styles[type]
  }
})()

export default proposedIndicatorStyleHelper
