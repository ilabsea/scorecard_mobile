import { StyleSheet, Dimensions } from 'react-native';
import Color from '../../themes/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const screenHeight = Dimensions.get('screen').height;

const RaisingProposedComponentStyles = StyleSheet.create({
  headingTitle: {
    fontSize: 20,
  },
  criteriaValue: {
    fontSize: 16,
    marginTop: -2
  },
  noDataContainer: {
    marginTop: -wp('30%')
  }
});

export default RaisingProposedComponentStyles;