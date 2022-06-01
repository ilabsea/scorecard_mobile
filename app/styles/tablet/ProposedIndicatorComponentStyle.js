import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleFontSize } from '../../utils/font_size_util';

const ProposedIndicatorComponentStyles = StyleSheet.create({
  headingTitle: {
    fontSize: titleFontSize()
  },
  noDataContainer: {
    marginTop: -wp('30%')
  }
});

export default ProposedIndicatorComponentStyles;