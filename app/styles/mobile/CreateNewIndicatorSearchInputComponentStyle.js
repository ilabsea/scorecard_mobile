import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { isShortWidthScreen } from '../../utils/responsive_util';
import { navigationHeaderTitleFontSize } from '../../utils/font_size_util';

const mobileMarginLeft = isShortWidthScreen() ? -6 : -16;

const CreateNewIndicatorSearchInputStyles = StyleSheet.create({
  container: {
    marginLeft: mobileMarginLeft,
    marginRight: 4,
    backgroundColor: Color.headerColor
  },
  searchInput: {
    fontFamily: FontFamily.body,
    fontSize: navigationHeaderTitleFontSize(),
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