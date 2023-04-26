import { StyleSheet, PixelRatio } from 'react-native';
import { titleFontSize } from '../../utils/font_size_util';

const IndicatorDevelopmentScreenStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  titleLabel: {
    fontSize: titleFontSize(),
    flex: 1,
    height: '100%',
    textAlignVertical: "center"
  },
});

export default IndicatorDevelopmentScreenStyles;