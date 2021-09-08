import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const CreateNewIndicatorSearchInputStyles = StyleSheet.create({
  container: {
    marginLeft: -wp('10%'),
    marginRight: 4,
    backgroundColor: Color.headerColor
  },
  searchInput: {
    fontFamily: FontFamily.body,
    fontSize: 19,
    color: '#fff',
    borderWidth: 0,
    width: '100%',
    justifyContent: 'center',
    marginTop: 4,
    paddingTop: 0,
    paddingBottom: 0,
  }
});

export default CreateNewIndicatorSearchInputStyles;