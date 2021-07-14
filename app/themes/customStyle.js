import {StyleSheet} from 'react-native';
import { FontFamily } from '../assets/stylesheets/theme/font';
import { getDeviceStyle, modalHeadingTitleSize } from '../utils/responsive_util';
import Color from './color';
import { modalBorderRadius } from '../constants/border_radius_constant';

const CustomStyle = StyleSheet.create({
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: 6,
    backgroundColor: Color.whiteColor,
    width: '100%',
  },
  card: {
    backgroundColor: Color.whiteColor,
    shadowColor: Color.blackColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bottomButton: {
    elevation: 0,
    height: 50,
  },
  modalTitle: {
    fontSize: getDeviceStyle(20, modalHeadingTitleSize()),
    fontFamily: FontFamily.title,
    marginBottom: getDeviceStyle(20, 15),
  },
  modalBtnWrapper: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  indicatorShortcutLabel: {
    fontSize: 60,
    color: Color.paleBlackColor,
    fontFamily: FontFamily.title,
    textTransform: 'uppercase',
  },
  modalContainer: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    width: '70%',
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: modalBorderRadius
  }
});

export default CustomStyle;
