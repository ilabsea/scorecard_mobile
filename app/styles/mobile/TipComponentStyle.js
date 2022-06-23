import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
import { cardBorderRadius } from '../../constants/border_radius_constant';

const TipComponentStyles = StyleSheet.create({
  title: {
    marginBottom: 0,
    flex: 1,
    fontSize: wp(smLabelSize),
    marginLeft: -8,
    paddingRight: 5,
  },
  viewDetailIcon: {
    fontSize: wp('4%'),
  },
  tipIconContainer: {
    width: 50,
    borderTopLeftRadius: cardBorderRadius,
    borderBottomLeftRadius: cardBorderRadius
  },
  tipIcon: {
    width: 28,
    height: 28,
  }
});

export default TipComponentStyles;