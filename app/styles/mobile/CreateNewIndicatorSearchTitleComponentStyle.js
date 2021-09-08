import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { mobileHeadingTitleSize, isShortWidthScreen } from '../../utils/responsive_util';

const mobileBodyPaddingLeft = isShortWidthScreen() ? wp('4%') : wp('1%');

const CreateNewIndicatorSearchTitleStyles = StyleSheet.create({
  body: {
    flex: 1,
    paddingLeft: mobileBodyPaddingLeft,
  },
  titleLabel: {
    fontSize: mobileHeadingTitleSize(),
    fontFamily: FontFamily.title,
  },
  right: {
    maxWidth: wp('14%'),
    marginRight: -6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    borderWidth: 0,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  searchIcon: {
    fontSize: wp('6%'),
    marginRight: 0,
    color: Color.whiteColor,
  },
  editIcon: {
    fontSize: wp('4.8%'),
    marginRight: 0,
    color: Color.whiteColor,
  }
});

export default CreateNewIndicatorSearchTitleStyles;