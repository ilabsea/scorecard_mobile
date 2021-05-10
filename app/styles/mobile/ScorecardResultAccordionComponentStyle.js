import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize, smLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';

const ScorecardResultAccordionComponentStyles = StyleSheet.create({
  titleText: {
    fontSize: wp(mdLabelSize),
  },
  itemTitleText: {
    fontSize: wp(smLabelSize),
    flex: 3,
    alignSelf: 'center',
  },
  itemValueText: {
    fontSize: wp(mdLabelSize),
    flex: 1,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    maxWidth: 90,
    height: 34,
    backgroundColor: '#cacaca',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  btnText: {
    fontSize: wp(smLabelSize),
  },
  btnEdit: {
    backgroundColor: Color.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnEditText: {
    color: Color.whiteColor,
    marginRight: 6,
    fontSize: wp(smLabelSize),
  },
  btnEditIcon: {
    color: Color.whiteColor,
    fontSize: wp('2.5%'),
  }
});

export default ScorecardResultAccordionComponentStyles;