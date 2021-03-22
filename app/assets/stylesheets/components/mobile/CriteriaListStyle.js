import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleSize, normalLabelSize, iconSize } from '../../../../constants/mobile_font_size_constant';
import { FontFamily } from '../../theme/font';

const TipStyles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: wp(titleSize),
    fontFamily: FontFamily.title,
    flex: 1,
    color: '#22354c',
  },
  viewAllLabel: {
    textTransform: 'uppercase',
    color: '#e4761e',
    fontWeight: 'bold',
  },
  criteriaCardContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    marginRight: 15,
    elevation: 3,
  },
});

export default TipStyles;