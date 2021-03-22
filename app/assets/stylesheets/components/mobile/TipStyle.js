import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleSize, normalLabelSize, iconSize } from '../../../../constants/mobile_font_size_constant';

const TipStyles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
    paddingRight: 10,
  },
  title: {
    marginBottom: 0,
    flex: 1,
    fontSize: wp(titleSize),
  },
  viewTipLabel: {
    fontSize: wp(normalLabelSize),
  },
  iconSize: {
    fontSize: wp(iconSize)
  }
});

export default TipStyles;