import Color from '../themes/color';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

import { getDeviceStyle } from '../utils/responsive_util';
import { mdLabelSize, smLabelSize, mdIconSize } from '../constants/mobile_font_size_constant';

const ListItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: getDeviceStyle(20, wp(mdLabelSize)),
    fontFamily: FontFamily.title,
    color: '#3a3a3a',
    marginBottom: 6,
  },
  subTextWrapper: {
    flexDirection: 'row',
    marginTop: getDeviceStyle(4, 0),
    alignItems: 'center'
  },
  subText: {
    marginLeft: 8,
    fontSize: getDeviceStyle(14, wp(smLabelSize)),
    fontFamily: FontFamily.body,
  },
  subTextIcon: {
    fontSize: getDeviceStyle(24, wp('5%')),
    color: Color.subText,
    marginTop: getDeviceStyle(0, -5)
  },
  contentWrapper: {
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1
  },
  statusIconWrapper: {
    width: getDeviceStyle('25%', wp('18%')),
    maxWidth: 130,
    backgroundColor: '#787878',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    maxHeight: 160,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 4,
    flexDirection: 'row',
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  viewDetail: {
    height: getDeviceStyle(48, 38),
    borderTopWidth: 1,
    borderTopColor: Color.borderColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: getDeviceStyle(0, 4)
  },
  buttonLabel: {
    fontSize: getDeviceStyle(16, wp(mdLabelSize)),
  }
});

export default ListItemStyle;
