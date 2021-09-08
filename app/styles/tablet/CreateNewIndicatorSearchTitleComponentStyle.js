import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const CreateNewIndicatorSearchTitleStyles = StyleSheet.create({
  body: {
    flex: 2,
    paddingLeft: wp('1.4%'),
  },
  titleLabel: {
    fontSize: 19,
    fontFamily: FontFamily.title
  },
  right: {
    maxWidth: wp('14%'),
    marginRight: -19,
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
    fontSize: 24,
    marginRight: 16,
    color: Color.whiteColor,
  },
  editIcon: {
    fontSize: 24,
    marginRight: 0,
    color: Color.whiteColor,
  }
});

export default CreateNewIndicatorSearchTitleStyles;