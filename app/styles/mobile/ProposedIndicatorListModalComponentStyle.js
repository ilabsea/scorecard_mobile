import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { titleFontSize, bodyFontSize } from '../../utils/font_size_util';
import { modalBorderRadius } from '../../constants/border_radius_constant';
import { popupModalMinHeight } from '../../constants/component_style_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ProposedIndicatorListModalComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    width: wp('92%'),
    alignSelf: 'center',
    padding: 18,
    maxHeight: hp('85%'),
    minHeight: popupModalMinHeight,
    borderRadius: modalBorderRadius
  },
  header: {
    fontFamily: FontFamily.title,
    textTransform: 'capitalize',
    fontSize: titleFontSize()
  },
  label: {
    fontSize: bodyFontSize(),
  },
  btnWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default ProposedIndicatorListModalComponentStyles;