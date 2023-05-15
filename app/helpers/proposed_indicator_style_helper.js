import DeviceInfo from 'react-native-device-info'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getDeviceStyle, isShortScreenDevice, containerPadding } from '../utils/responsive_util';
import Color from '../themes/color';
import tabletStyles from '../styles/tablet/ProposedIndicatorCardComponentStyle';
import mobileStyles from '../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(tabletStyles, mobileStyles)

const proposedIndicatorStyleHelper = (() => {
  return {
    getStyleByProposeType,
    getAddNewProposeButtonStyles,
    getSearchBoxMarginTop,
    getCardTitleStyles,
    getSearchResultStyles,
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

  function getSearchBoxMarginTop(instructionHeight) {
    let initPosition = 107;
    if (!DeviceInfo.isTablet())
      initPosition = instructionHeight + (isShortScreenDevice() ? 26 : 28)

    return [initPosition, 77, 47, 12]
  }

  function getSearchResultStyles(isIndicatorBase, searchContainerHeight) {
    return {
              backgroundColor: Color.whiteColor,
              borderRadius: 10,
              elevation: 3,
              left: containerPadding,
              maxHeight: getDeviceStyle(hp('65%'), hp('74%')),
              position: 'absolute',
              top: _getSearchResultTopPosition(isIndicatorBase, searchContainerHeight),
              width: '100%',
              zIndex: 2,
           }
  }

  // private method
  function _getSearchResultTopPosition(isIndicatorBase, searchContainerHeight) {
    if (DeviceInfo.isTablet())
      return searchContainerHeight - (isIndicatorBase ? 119 : 203)

    if (isIndicatorBase)
      return searchContainerHeight - (isShortScreenDevice() ? 117 : 114)

    return searchContainerHeight - (isShortScreenDevice() ? 185 : 183)
  }

  function getCardTitleStyles(isIndicatorBase) {
    return { marginTop: getDeviceStyle(18, 14), marginBottom: isIndicatorBase ? 0 : getDeviceStyle(10, 6) }
  }
})()

export default proposedIndicatorStyleHelper
