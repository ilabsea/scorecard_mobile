import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';

const ParticipantModalListItemComponentStyles = StyleSheet.create({
  label: {
    margin: 0,
    fontSize: wp(smLabelSize),
  }
});

export default ParticipantModalListItemComponentStyles;