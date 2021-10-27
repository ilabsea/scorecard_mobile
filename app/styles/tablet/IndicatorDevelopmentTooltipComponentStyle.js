import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';

const indicatorDevelopmentTooltipStyles = StyleSheet.create({
  content: {
    width: wp('33%'),
    height: 305,
    marginTop: -15,
    backgroundColor: Color.whiteColor,
  },
  imageContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 2
  },
  instructionImage: {
    width: 200,
    height: 255,
    resizeMode: 'contain'
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 6
  },
  closeLabel: {
    color: Color.clickableColor,
    fontSize: 14
  }
});

export default indicatorDevelopmentTooltipStyles;