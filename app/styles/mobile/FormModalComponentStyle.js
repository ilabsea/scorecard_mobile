import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';
import { modalBorderRadius } from '../../constants/border_radius_constant';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import { XHDPIRatio } from '../../constants/screen_size_constant';

const mdFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 15, 14);
const smFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 14, 13);


const FormModalComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 18,
    minHeight: 530,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    borderRadius: modalBorderRadius
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 15,
  },
  titleText: {
    fontSize: mdFontSize,
    fontFamily: FontFamily.title,
    marginBottom: 10,
  },
  subTitleText: {
    fontSize: smFontSize,
  },
  orderNumberText: {
    fontSize: mdFontSize,
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputText: {
    fontSize: smFontSize,
    borderWidth: 0,
    height: 30,
    marginVertical: 10,
    paddingHorizontal: 0
  },
  btnRemove: {
    marginLeft: 15,
    marginTop: 0
  },
  removeIcon: {
    color: Color.redColor,
    fontSize: getMobileFontSizeByPixelRatio(XHDPIRatio, 20, 18),
  }
});

export default FormModalComponentStyles;