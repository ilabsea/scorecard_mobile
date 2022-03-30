import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleFontSize } from '../../utils/font_size_util';

const screenHeight = Dimensions.get('screen').height;

const RaisingProposedComponentStyles = StyleSheet.create({
  headingTitle: {
    fontSize: titleFontSize()
  },
  noDataContainer: {
    marginTop: -wp('30%')
  }
});

export default RaisingProposedComponentStyles;