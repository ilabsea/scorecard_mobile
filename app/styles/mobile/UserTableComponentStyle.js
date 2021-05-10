import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize, xsLabelSize } from '../../constants/mobile_font_size_constant';

const UserTableComponentStyles = StyleSheet.create({
  headerText: {
    fontSize: wp(xsLabelSize),
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
  },
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default UserTableComponentStyles;