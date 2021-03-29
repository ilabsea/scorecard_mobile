import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';

const iconWrapperSize = 98;
const iconSize = 80;
let iconSizeRatio = iconSize * 0.8;

const CriteriaRatingItemStyles = StyleSheet.create({
  ratingIndicatorContainer: {
    marginTop: 30
  },
  ratingIconContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginRight: 40,
  },
  indicatorLabel: {
    fontSize: 18,
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
    borderWidth: 4,
    borderColor: '#ebebeb',
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
    color: '#fff',
  }
});

export default CriteriaRatingItemStyles;