import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { lgLabelSize } from '../../constants/mobile_font_size_constant';

const VotingCriteriaFormScreenStyles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: wp(lgLabelSize),
  }
});

export default VotingCriteriaFormScreenStyles;