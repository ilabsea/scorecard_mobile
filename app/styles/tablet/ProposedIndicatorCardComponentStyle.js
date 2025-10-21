import { StyleSheet } from 'react-native';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ProposedIndicatorCardComponentStyles = StyleSheet.create({
  indicatorCardContainer: {
    elevation: 2,
    height: 105,
    marginTop: 14,
    paddingHorizontal: 14
  },
  label: {
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body,
  },
  subLabel: {
    fontSize: smallTextFontSize(),
    fontFamily: FontFamily.body,
    color: Color.lightGrayColor
  },
  participantCardContainer: {
    elevation: 2,
    height: 94,
    minHeight: 70,
    marginTop: 8,
    paddingHorizontal: 14
  },
  indicatorBaseOutlinedCardContainer: {
    marginBottom: 1,
    marginTop: 35,
    width: '100%',
    borderWidth: 1,
    borderColor: Color.lightGrayColor,
    elevation: 0,
  },
  indicatorBaseSwipeableButton: {
    marginTop: 35,
    width: 90
  },
  participantBaseOutlinedCardContainer: {
    marginBottom: 1,
    marginTop: 35,
    width: '100%',
    borderWidth: 1,
    borderColor: Color.lightGrayColor,
    elevation: 0,
  },
  participantBaseSwipeableButton: {
    marginTop: 35,
    width: 90
  },
  indicatorOutlinedLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10
  },
  participantInfoContainer: {
    flex: 1,
    maxHeight: 45,
    marginTop: 12
  },
  participantInfoSubLabel: {
    marginTop: -2,
    zIndex: 0,
    fontFamily: FontFamily.body,
  }
});

export const tabletLabelFontSize = bodyFontSize();

export default ProposedIndicatorCardComponentStyles;