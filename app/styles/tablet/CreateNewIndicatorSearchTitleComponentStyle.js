import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
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
  },
  searchIcon: {
    fontSize: 24,
    marginRight: 16,
  },
});

export default CreateNewIndicatorSearchTitleStyles;