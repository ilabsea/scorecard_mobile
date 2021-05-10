import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { isShortScreenDevice } from '../../utils/responsive_util';
import { lgLabelSize, xlLabelSize, mdLabelSize } from '../../constants/mobile_font_size_constant';

const ProposedcriteriaListModalComponentStyles = StyleSheet.create({
  container: {
    width: wp('92%'),
    alignSelf: 'center',
    padding: 18,
    maxHeight: hp('85%'),
  },
  header: {
    fontSize: isShortScreenDevice() ? wp(lgLabelSize) : wp(xlLabelSize),
  },
  label: {
    fontSize: wp(mdLabelSize),
  },
});

export default ProposedcriteriaListModalComponentStyles;