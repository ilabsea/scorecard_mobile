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
  indicatorOutlinedCardContainer: {
    marginTop: 46,
    height: 120,
    width: '100%',
    borderWidth: 1,
    borderColor: Color.lightGrayColor,
    elevation: 0
  }
});

export default ProposedIndicatorCardComponentStyles;