import { getDeviceStyle } from '../utils/responsive_util';
import tabletStyles, {tabletLabelFontSize} from '../styles/tablet/ProposedIndicatorCardComponentStyle';
import mobileStyles, {mobileLabelFontSize} from '../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(tabletStyles, mobileStyles)

const proposedIndicatorStyleHelper = (() => {
  return {
    getStyleByProposeType
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
        swipeableButton: styles.participantBaseSwipebleButton
      },
    }

    return allStyles[isIndicatorBase ? 'indicatorBase' : 'participantBase'][type]
  }
})()

export default proposedIndicatorStyleHelper
