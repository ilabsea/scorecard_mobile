import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { isShortWidthScreen } from '../../utils/responsive_util';
import Color from '../../themes/color';

const iconWrapperHeight = wp('10%');
const iconWrapperWidth = wp('15.7%');
const iconSize = wp('10%');
let iconSizeRatio = iconSize * 0.8;

const CriteriaRatingItemComponentStyles = StyleSheet.create({
  ratingIndicatorContainer: {
    borderColor: Color.paleGrayColor,
    shadowOffset: {width: 0, height: 1},
    elevation: 1.8,
    paddingTop: 3
  },
  ratingIndicatorWrapper: {
    backgroundColor: Color.accordionContentBgColor,
    paddingBottom: 8,
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  ratingIconContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 40,
  },
  indicatorLabel: {
    fontSize: wp('4.2%'),
    fontFamily: FontFamily.title,
    textTransform: 'capitalize',
    marginRight: 10,
  },
  ratingListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: -2,
    justifyContent: 'center'
  },
  ratingWrapper: {
    alignItems: 'center',
    marginHorizontal: 2,
    borderWidth: 4,
    borderColor: '#d1d2d4',
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 8
  },
  iconWrapper: {
    marginBottom: 10,
    width: iconWrapperWidth,
    height: iconWrapperHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingItemContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingIcon: {
    width: iconSizeRatio,
    height: iconSizeRatio,
    maxWidth: iconSize,
    maxHeight: iconSize,
  },
  playSoundLabel: {
    marginRight: 2,
    color: Color.whiteColor,
    fontSize: wp('2.7%'),
  },
  ratingPlaySoundContainer: {
    borderRadius: 2,
    width: '85%',
    maxWidth: 100,
    flexDirection: 'row',
  },
  ratingLabel: {
    fontSize: isShortWidthScreen() ? 10 : 11,
    marginTop: 10,
  }
});

export default CriteriaRatingItemComponentStyles;