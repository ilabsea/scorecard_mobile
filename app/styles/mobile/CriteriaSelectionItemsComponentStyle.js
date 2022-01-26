import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const CriteriaSelectionItemsStyles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    marginHorizontal: -10,
    justifyContent: 'center'
  },
  indicatorContainer: {
    borderBottomColor: Color.paleGrayColor,
    width: '100%',
  },
  tagTitle: {
    fontFamily: FontFamily.title,
    fontSize: wp(mdLabelSize),
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 5
  }
});

export default CriteriaSelectionItemsStyles; 