import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleSize, normalLabelSize, iconSize, smLabelSize } from '../../../../constants/mobile_font_size_constant';
import { FontFamily } from '../../theme/font';

const UserTableStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  tableHead: {
    height: 40,
    backgroundColor: '#eeeeee',
  },
  headerText: {
    margin: 6,
    fontSize: wp(smLabelSize),
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    margin: 6,
    marginVertical: 10,
    textAlign: 'center',
  },
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  indicatorBadge: {
    padding: 2,
    marginHorizontal: 2,
  },
  indicatorLabel: {
    color: '#ffffff',
    fontSize: wp(smLabelSize),
    backgroundColor: '#787878',
    paddingHorizontal: 5,
    borderRadius: 3,
    maxWidth: 120,
  },
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cellLabel: {
    fontSize: wp(smLabelSize)
  },
  actionCellLabel: {
    color: '#e4761e',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginLeft: 4,
    fontSize: wp(smLabelSize)
  },
  actionCellIcon: {
    fontSize: wp(smLabelSize),
  }
});

export default UserTableStyles;