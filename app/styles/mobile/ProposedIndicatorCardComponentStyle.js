import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { isSmallMobileScreenDevice } from '../../utils/responsive_util';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ProposedIndicatorCardComponentStyles = StyleSheet.create({
  indicatorCardContainer: {
    elevation: 2,
    height: isSmallMobileScreenDevice() ? 90 : 95,
    marginTop: 14,
    paddingHorizontal: 14
  },
  label: {
    fontSize: getMobileFontSizeByPixelRatio(14.2, 14),
    fontFamily: FontFamily.body,
  },
  subLabel: {
    fontSize: wp('3.2%'),
    fontFamily: FontFamily.body,
    color: Color.lightGrayColor
  },
  participantCardContainer: {
    elevation: 2,
    height: 83,
    minHeight: 60,
    marginTop: 8,
    paddingHorizontal: 14,
  },
  indicatorBaseOutlinedCardContainer: {
    marginBottom: 0,
    marginTop: 35,
    width: '100%',
    borderWidth: 1,
    borderColor: Color.lightGrayColor,
    elevation: 0
  },
  indicatorBaseSwipeableButton: {
    marginTop: 35,
    width: 70,
  },
  participantBaseOutlinedCardContainer: {
    marginBottom: 0,
    marginTop: 35,
    width: '100%',
    borderWidth: 1,
    borderColor: Color.lightGrayColor,
    elevation: 0
  },
  participantBaseSwipeableButton: {
    marginTop: 35,
    width: 90,
  },
  indicatorOutlinedLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 14
  },
  participantInfoContainer: {
    flex: 1,
    maxHeight: 45,
    marginTop: 7
  },
  participantInfoSubLabel: {
    marginTop: -6,
    zIndex: 0,
    fontFamily: FontFamily.body,
  }
});

export default ProposedIndicatorCardComponentStyles;