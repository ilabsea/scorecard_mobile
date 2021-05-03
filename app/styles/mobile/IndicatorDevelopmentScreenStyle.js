import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xlLabelSize } from '../../constants/mobile_font_size_constant';

const IndicatorDevelopmentScreenStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  titleLabel: {
    fontSize: wp(xlLabelSize),
    flex: 1,
  },
});

export default IndicatorDevelopmentScreenStyles;