import DeviceInfo from 'react-native-device-info'
import { getDeviceStyle, isShortScreenDevice } from '../utils/responsive_util';
import tabletStyles from '../styles/tablet/ProposedIndicatorCardComponentStyle';
import mobileStyles from '../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(tabletStyles, mobileStyles)

const proposedIndicatorStyleHelper = (() => {
  return {
    getStyleByProposeType,
    getAddNewProposeButtonStyles,
    getSearchBoxMarginTop,
    getSearchResultTopPosition,
    getCardTitleStyles,
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

  function getSearchResultTopPosition(isIndicatorBase, searchContainerHeight, instructionHeight) {
    if (DeviceInfo.isTablet())
      return _calculateSearchResultPosition(searchContainerHeight, instructionHeight + 6, isIndicatorBase ? [82, 119] : [164, 203])

    if (isIndicatorBase)
      return _calculateSearchResultPosition(searchContainerHeight, instructionHeight, isShortScreenDevice() ? [75, 117] : [74, 114])

    return _calculateSearchResultPosition(searchContainerHeight, instructionHeight, isShortScreenDevice() ? [146, 185] : [144, 183])
  }

  function getCardTitleStyles(isIndicatorBase) {
    return { marginTop: getDeviceStyle(18, 14), marginBottom: isIndicatorBase ? 0 : getDeviceStyle(10, 6) }
  }

  // private method
  function _calculateSearchResultPosition(searchContainerHeight, instructionHeight, positions) {
    return [instructionHeight + 80, searchContainerHeight - positions[0], searchContainerHeight - positions[1]]
  }
})()

export default proposedIndicatorStyleHelper
