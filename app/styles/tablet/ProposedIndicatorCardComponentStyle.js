import { StyleSheet } from 'react-native';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';

const ProposedIndicatorCardComponentStyles = StyleSheet.create({
  indicatorCardContainer: {
    elevation: 2,
    height: 105,
    marginTop: 14,
    paddingHorizontal: 14
  },
  label: {
    fontSize: bodyFontSize()
  },
  subLabel: {
    fontSize: smallTextFontSize(),
  },
  participantCardContainer: {
    elevation: 2,
    height: 70,
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
});

export const tabletLabelFontSize = bodyFontSize();

export default ProposedIndicatorCardComponentStyles;