import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../../utils/responsive_util';

const BigHeaderStyles = StyleSheet.create({
  container: {
    height: isShortScreenDevice() ? hp('18%') : hp('17%'),
  },
  bigTitle: {
    fontSize: isShortScreenDevice() ? wp('5.6%') : wp('6.4%'),
  }
});

export default BigHeaderStyles;