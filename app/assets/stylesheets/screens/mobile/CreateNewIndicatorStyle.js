import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { titleSize } from '../../../../constants/mobile_font_size_constant';

const CreateNewIndicatorStyles = StyleSheet.create({
  headerTitle: {
    fontSize: wp(titleSize),
    color: '#2e2e2e',
  },
  chooseIndicatorTitle: {
    fontSize: wp(titleSize),
    color: '#2e2e2e',
    marginTop: 20,
  }
});

export default CreateNewIndicatorStyles;