import { StyleSheet } from 'react-native';
import { modalTitleFontSize } from '../../utils/font_size_util';

const IndicatorDevelopmentScreenStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  titleLabel: {
    fontSize: modalTitleFontSize(),
    flex: 1,
  },
});

export default IndicatorDevelopmentScreenStyles;