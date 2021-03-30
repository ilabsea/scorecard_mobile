import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize, xlIconSize } from '../../../../constants/mobile_font_size_constant';

const ContactListItemStyles = StyleSheet.create({
  statusIcon: {
    fontSize: wp(xlIconSize),
    color: '#fff'
  },
  subText: {
    marginTop: -4
  },
  viewDetailLabel: {
    fontSize: wp(smLabelSize),
  },
  viewDetailIcon: {
    fontSize: wp('4.5%'),
    marginRight: 6
  },
});

export default ContactListItemStyles;