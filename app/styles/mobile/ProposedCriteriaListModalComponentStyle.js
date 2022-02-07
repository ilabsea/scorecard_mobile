import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { isShortScreenDevice } from '../../utils/responsive_util';
import { lgLabelSize, xlLabelSize, mdLabelSize } from '../../constants/mobile_font_size_constant';
import { modalBorderRadius } from '../../constants/border_radius_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ProposedcriteriaListModalComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    width: wp('92%'),
    alignSelf: 'center',
    padding: 18,
    maxHeight: hp('85%'),
    borderRadius: modalBorderRadius
  },
  header: {
    fontFamily: FontFamily.title,
    textTransform: 'capitalize',
    fontSize: isShortScreenDevice() ? wp(lgLabelSize) : wp(xlLabelSize),
  },
  label: {
    fontSize: wp(mdLabelSize),
  },
  btnWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default ProposedcriteriaListModalComponentStyles;