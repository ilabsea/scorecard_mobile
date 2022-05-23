import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { smLabelSize, xlIconSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

const subTitleFontSize = getMobileFontSizeByPixelRatio(12, 11.5);

const ScorecardItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: wp('17%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Color.whiteColor,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.paleGrayColor,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: -5,
    marginBottom: -6
  },
  subTitle: {
    fontFamily: FontFamily.title,
    marginBottom: 8,
    flex: 1,
    fontSize: wp(smLabelSize),
    marginTop: 3,
  },
  viewDetailContainer: {
    height: 32
  },
  viewDetailLabel: {
    fontSize: wp(smLabelSize),
  },
  viewDetailIcon: {
    fontSize: wp('4%'),
    marginRight: 6,
  },
  statusIcon: {
    fontSize: wp(xlIconSize),
    color: Color.whiteColor
  },
  lockIcon: {
    fontSize: wp('5%'),
  },
  deleteContainer: {
    width: 70,
    height: '100%'
  },
  locationLabel: {
    fontSize: subTitleFontSize,
    marginLeft: 4,
    color: Color.grayColor,
    marginRight: 0,
    marginLeft: 0,
    fontFamily: FontFamily.body,
  },
  iconBorder: {
    borderWidth: 1.2,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, 
  },
  removeDateIcon: {
    marginTop: 5,
    marginRight: 4
  },
  removeDateLabel: {
    fontSize: subTitleFontSize,
    color: Color.redColor,
    fontFamily: FontFamily.body,
    textAlign: 'right',
    marginTop: 2
  }
});

export default ScorecardItemComponentStyles;