import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { bigNavigationHeaderTitleFontSize } from '../../utils/font_size_util';

const BigHeaderComponentStyles = StyleSheet.create({
  container: {
    height: isShortScreenDevice() ? hp('18%') : hp('17%'),
  },
  bigTitle: {
    fontSize: bigNavigationHeaderTitleFontSize(),
  }
});

export default BigHeaderComponentStyles;