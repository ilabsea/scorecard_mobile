import { StyleSheet } from 'react-native';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';

const IndicatorAccordionComponentStyles = StyleSheet.create({
  indicatorCardContainer: {
    elevation: 2,
    height: 105,
    marginTop: 12,
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
    marginTop: 12,
    paddingHorizontal: 14
  }
});

export default IndicatorAccordionComponentStyles;