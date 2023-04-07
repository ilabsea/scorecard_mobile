import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const ProposedIndicatorComponentStyles = StyleSheet.create({
  addNewButtonContainer: {
    alignItems: 'center',
    backgroundColor: Color.defaultBgColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 14,
  },
  headingTitle: {
    fontSize: titleFontSize(),
    fontFamily: FontFamily.title
  },
  noDataContainer: {
    marginTop: -wp('45%')
  }
});

export default ProposedIndicatorComponentStyles;