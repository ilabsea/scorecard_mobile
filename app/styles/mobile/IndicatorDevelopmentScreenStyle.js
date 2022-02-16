import { StyleSheet, PixelRatio } from 'react-native';
import { titleFontSize } from '../../utils/font_size_util';
import { XHDPIRatio } from '../../constants/screen_size_constant';

const devicePixelRatio = Math.round(PixelRatio.roundToNearestPixel(PixelRatio.get()));

const IndicatorDevelopmentScreenStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: devicePixelRatio <= XHDPIRatio ? 5 : 15,
  },
  titleLabel: {
    fontSize: titleFontSize(),
    flex: 1,
  },
});

export default IndicatorDevelopmentScreenStyles;