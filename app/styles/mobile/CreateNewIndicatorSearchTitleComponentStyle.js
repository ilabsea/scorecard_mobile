import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
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
  },
  searchIcon: {
    fontSize: wp('6%'),
    marginRight: 0,
  },
});

export default CreateNewIndicatorSearchTitleStyles;