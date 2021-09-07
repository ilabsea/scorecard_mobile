import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { mobileHeadingTitleSize } from '../../utils/responsive_util';

const CreateNewIndicatorSearchInputStyles = StyleSheet.create({
  searchInput: {
    fontFamily: FontFamily.body,
    fontSize: mobileHeadingTitleSize(),
    color: '#fff',
    borderWidth: 0,
    width: '100%',
    justifyContent: 'center',
    marginTop: 2,
    paddingTop: 0,
    paddingBottom: 0,
  }
});

export default CreateNewIndicatorSearchInputStyles;