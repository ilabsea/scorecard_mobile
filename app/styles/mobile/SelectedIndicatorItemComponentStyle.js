import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice, isShortWidthScreen, getDeviceStyle } from '../../utils/responsive_util';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const getContainerHeight = () => {
  if (isShortWidthScreen())
    return hp('15%');

  return isShortScreenDevice() ? hp('16.5%') : hp('14.5%')
}

const titlePaddingTop = () => {
  if (isShortScreenDevice())
    return 8;

  return isShortWidthScreen() ? 5 : 10
}

const SelectedIndicatorItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: getContainerHeight(),
    borderRadius: cardBorderRadius,
    marginHorizontal: 4
  },
  listItem: {
    paddingLeft: 0,
    paddingTop: 0,
    flexDirection: 'column',
    borderRadius: 4,
    flex: 1
  },
  container: {
    paddingLeft: 10,
    marginTop: 4,
    justifyContent: 'center',
    flex: 1
  },
  titleText: {
    lineHeight: 22,
    paddingTop: titlePaddingTop(),
  },
  subText: {
    marginTop: -6,
    marginLeft: 0,
  },
  viewDetailContainer: {
    height: 28,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: Color.borderColor,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: getDeviceStyle(4, 2),
  },
  removeButton: {
    flexDirection: 'row',
    paddingLeft: 6,
    paddingRight: 16,
  },
  removeIcon: {
    color: 'red',
    marginRight: 8,
    alignSelf: 'center',
    marginTop: -4
  },
  removeLabel: {
    fontFamily: FontFamily.title,
    fontSize: 14,
    color: 'red',
  },
  selectedItem: {
    backgroundColor: '#f5cfb6',
    elevation: 30
  }
});

export default SelectedIndicatorItemComponentStyles;