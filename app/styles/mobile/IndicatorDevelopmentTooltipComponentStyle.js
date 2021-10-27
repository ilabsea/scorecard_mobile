import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { mobileNormalLabelFontSize } from '../../utils/font_size_util';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { mediumMobileHeight } from '../../constants/screen_size_constant';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const imageHeight = screenHeight >= mediumMobileHeight ? wp('54%') : wp('56%');
let contentHeight = isShortScreenDevice() ? 50 : 45;
contentHeight = contentHeight + imageHeight;

const indicatorDevelopmentTooltipStyles = StyleSheet.create({
  content: {
    width: wp('45%'),
    backgroundColor: Color.whiteColor,
  },
  imageContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 2,
  },
  instructionImage: {
    width: screenWidth / 2.5,
    height: imageHeight,
    resizeMode: 'contain'
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 6,
  },
  closeLabel: {
    color: Color.clickableColor,
    fontSize: mobileNormalLabelFontSize,
  }
});

export default indicatorDevelopmentTooltipStyles;