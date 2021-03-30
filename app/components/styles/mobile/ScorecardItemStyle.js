import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../../assets/stylesheets/theme/font';
import { mdLabelSize, smLabelSize, xlIconSize } from '../../../constants/mobile_font_size_constant';
import { isShortScreenDevice, isShortWidthScreen } from '../../../utils/responsive_util';

const getSwipeableHeight = () => {
  if (isShortScreenDevice())
    return 117;

  return isShortWidthScreen() ? 111 : 126;
}

const ScorecardItemStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: -5,
    marginBottom: -6
  },
  subTitle: {
    fontFamily: FontFamily.title,
    marginBottom: 8,
    flex: 1,
    fontSize: wp(smLabelSize),
    marginTop: 3,
  },
  viewDetailContainer: {
    height: 32
  },
  viewDetailLabel: {
    fontSize: wp(smLabelSize),
  },
  viewDetailIcon: {
    fontSize: wp('4%'),
    marginRight: 6,
  },
  statusIcon: {
    fontSize: wp(xlIconSize),
    color: '#fff'
  },
  lockIcon: {
    fontSize: wp('5%'),
  },
  swipeableContainer: {
    backgroundColor: '#fff',
    maxHeight: getSwipeableHeight(),
    marginBottom: 12,
  },
  deleteContainer: {
    backgroundColor: 'red',
    maxHeight: getSwipeableHeight(),
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteLabel: {
    fontSize: wp(mdLabelSize)
  }
});

export default ScorecardItemStyles;