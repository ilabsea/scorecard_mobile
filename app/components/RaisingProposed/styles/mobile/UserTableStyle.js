import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize, xsLabelSize } from '../../../../constants/mobile_font_size_constant';

const UserTableStyles = StyleSheet.create({
  headerText: {
    fontSize: wp(smLabelSize),
  },
  indicatorLabel: {
    fontSize: wp(xsLabelSize),
  },
  cellLabel: {
    fontSize: wp(smLabelSize),
  },
  actionCellLabel: {
    fontSize: wp(smLabelSize),
  },
  actionCellIcon: {
    fontSize: wp(smLabelSize),
    marginRight: -3,
  },
  actionCellLabel: {
    fontSize: wp(smLabelSize),
  }
});

export default UserTableStyles;