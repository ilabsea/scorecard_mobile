import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { titleFontSize } from '../../utils/font_size_util';
import { lgLabelSize } from '../../constants/mobile_font_size_constant';

const RaisingProposedComponentStyles = StyleSheet.create({
  headingTitle: {
    fontSize: titleFontSize(),
  },
  noDataContainer: {
    marginTop: -wp('45%')
  }
});

export default RaisingProposedComponentStyles;