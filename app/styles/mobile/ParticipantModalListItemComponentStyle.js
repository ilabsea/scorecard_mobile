import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';

const ParticipantModalListItemComponentStyles = StyleSheet.create({
  genderContainer: {
    width: 50,
    justifyContent: 'center'
  },
  label: {
    margin: 0,
    fontSize: wp(smLabelSize),
  }
});

export default ParticipantModalListItemComponentStyles;