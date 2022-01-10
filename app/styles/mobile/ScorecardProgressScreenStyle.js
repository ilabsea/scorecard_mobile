import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { getMobileFontSizeByPixelRatio, bottomButtonFontSize, subTitleFontSize, bodyFontSize } from '../../utils/font_size_util';
import { XHDPIRatio } from '../../constants/screen_size_constant';

const ScorecardProgressScreenStyles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: isShortScreenDevice() ? 5 : 10,
  },
  title: {
    fontSize: subTitleFontSize(),
    fontFamily: FontFamily.title,
    paddingBottom: 0,
    marginBottom: -wp('0.9%')
  },
  facilityCode: {
    fontSize: 12,
    color: Color.grayColor,
  },
  subTitle: {
    fontSize: getMobileFontSizeByPixelRatio(XHDPIRatio, 12, 12),
    color: Color.grayColor,
  },
  btn: {
    backgroundColor: Color.headerColor,
    borderRadius: 4,
    height: isShortScreenDevice() ? 45 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  btnText: {
    color: Color.whiteColor,
    fontSize: bottomButtonFontSize(),
  },
  btnSubText: {
    color: Color.whiteColor,
    fontSize: 11.5,
    fontFamily: FontFamily.body,
    marginLeft: 4,
    marginTop: 2,
    color: Color.darkRedColor
  },
  progressBar: {
    height: 20,
    backgroundColor: Color.lightGrayColor,
    marginBottom: 15,
  },
  uploadPercentageLabel: {
    textAlign: 'center',
    zIndex: 1,
    left: '48%',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: bodyFontSize(),
  },
  lockIcon: {
    fontSize: wp('5%'),
    position: 'absolute',
    right: 10,
    color: Color.whiteColor
  }
});

export default ScorecardProgressScreenStyles;