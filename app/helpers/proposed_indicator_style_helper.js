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

  function getSearchBoxMarginTop(appLanguage) {
    let initPosition = 107;
    if (!DeviceInfo.isTablet())
      initPosition = isShortScreenDevice() ? 124 : appLanguage == 'en' ? 96 : 122;

    return [initPosition, 77, 47, 12]
  }

  function getSearchResultTopPosition(isIndicatorBase, searchContainerHeight, appLanguage) {
    if (DeviceInfo.isTablet())
      return _calculateSearchResultPosition(searchContainerHeight, isIndicatorBase ? [24, 82, 119] : [109, 164, 203])

    if (isIndicatorBase) {
      const indicatorPositions = {en: 30, km: 4}
      return _calculateSearchResultPosition(searchContainerHeight, isShortScreenDevice() ? [5, 75, 117] : [indicatorPositions[appLanguage], 74, 114])
    }
    const participantPositions = {en: 99, km: 72}
    return _calculateSearchResultPosition(searchContainerHeight, isShortScreenDevice() ? [73, 146, 185] : [participantPositions[appLanguage], 144, 183])
  }

  // private method
  function _calculateSearchResultPosition(searchContainerHeight, positions) {
    return [searchContainerHeight - positions[0], searchContainerHeight - positions[1], searchContainerHeight - positions[2]]
  }
})()

export default proposedIndicatorStyleHelper
