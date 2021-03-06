import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice, isShortWidthScreen } from '../../utils/responsive_util';
import { cardBorderRadius } from '../../constants/border_radius_constant';

const getContainerHeight = () => {
  if (isShortWidthScreen())
    return hp('15%');

  return isShortScreenDevice() ? hp('16.5%') : hp('14.5%')
}

const titlePaddingTop = () => {
  if (isShortScreenDevice())
    return 8;

  return isShortWidthScreen() ? 5 : 10
}

const SelectedCriteriaItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: getContainerHeight(),
    borderRadius: cardBorderRadius
  },
  container: {
    paddingLeft: 10,
    marginTop: 4,
    justifyContent: 'center',
    flex: 1
  },
  titleText: {
    lineHeight: 22,
    paddingTop: titlePaddingTop(),
  },
  subText: {
    marginTop: -6,
    marginLeft: 0,
  },
  viewDetailContainer: {
    height: 28,
    marginTop: 4,
  }
});

export default SelectedCriteriaItemComponentStyles;