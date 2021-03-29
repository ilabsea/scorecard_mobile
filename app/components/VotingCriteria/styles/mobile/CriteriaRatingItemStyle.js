import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize } from '../../../../constants/mobile_font_size_constant';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';

const iconWrapperHeight = wp('14%');
const iconWrapperWidth = wp('27.4%');
const iconSize = wp('14%');
let iconSizeRatio = iconSize * 0.8;

const CriteriaRatingItemStyles = StyleSheet.create({
  ratingIndicatorContainer: {
    marginTop: 15
  },
  ratingIconContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginRight: 40,
  },
  indicatorLabel: {
    fontSize: wp('4.7%'),
    fontFamily: FontFamily.title,
    textTransform: 'capitalize',
    marginRight: 10,
  },
  ratingListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: -8,
  },
  ratingWrapper: {
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 4,
    borderColor: '#ebebeb',
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
  ratingLabel: {
    fontSize: wp(mdLabelSize),
    color: '#22354c',
    textAlign: 'center'
  },
  playSoundLabel: {
    marginRight: 8,
    color: '#fff',
    fontSize: wp(mdLabelSize),
  }
});

export default CriteriaRatingItemStyles;