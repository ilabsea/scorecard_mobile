import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice, isShortWidthScreen, getDeviceStyle } from '../../utils/responsive_util';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const getContainerHeight = () => {
  if (isShortWidthScreen())
    return hp('12.5%');

  return isShortScreenDevice() ? hp('13.5%') : hp('11.5%')
}

const titlePaddingTop = () => {
  if (isShortScreenDevice())
    return 8;

  return isShortWidthScreen() ? 5 : 8
}

const SelectedIndicatorItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: getContainerHeight(),
    borderRadius: cardBorderRadius,
    marginHorizontal: 4,
  },
  container: {
    paddingLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    lineHeight: 22,
    paddingTop: titlePaddingTop(),
    marginTop: -4,
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
  selectedItem: {
    backgroundColor: '#f5cfb6',
    elevation: 10
  },
  removeButton: {
    backgroundColor: Color.redColor,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    height: getContainerHeight(),
  },
  removeLabel: {
    fontSize: bodyFontSize(),
    color: Color.whiteColor
  },
  draggableIconContainer: {
    width: 20,
    marginLeft: -10,
    paddingTop: isShortWidthScreen() ? 3 : 1,
  }
});

export default SelectedIndicatorItemComponentStyles;