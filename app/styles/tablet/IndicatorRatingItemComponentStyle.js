import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const iconWrapperSize = 98;
const iconSize = 80;
let iconSizeRatio = iconSize * 0.8;

const IndicatorRatingItemComponentStyles = StyleSheet.create({
  ratingIndicatorContainer: {
    borderColor: Color.paleGrayColor,
    shadowOffset: {width: 0, height: 1},
    elevation: 1.8,
    paddingTop: 3
  },
  ratingIndicatorWrapper: {
    backgroundColor: Color.whiteColor,
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  ratingIndicatorTitleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 40,
    alignItems: 'center'
  },
  indicatorLabel: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    textTransform: 'capitalize',
    marginRight: 10,
  },
  ratingListContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: -8,
  },
  ratingWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 2.5,
    borderColor: '#d1d2d4',
    paddingBottom: 10,
    borderRadius: 10
  },
  iconWrapper: {
    marginBottom: 10,
    width: iconWrapperSize,
    height: iconWrapperSize,
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
    fontSize: 16,
    color: '#22354c',
    textAlign: 'center'
  },
  playSoundLabel: {
    marginRight: 8,
    color: Color.clickableColor
  },
  ratingPlaySoundContainer: {
    borderRadius: 2,
    borderWidth: 1.2,
    borderColor: Color.clickableColor,
    width: '90%',
    maxWidth: 100,
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
  }
});

export default IndicatorRatingItemComponentStyles;