import { StyleSheet } from 'react-native';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const containerHeight = 110;

const SelectedIndicatorItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: containerHeight,
    borderRadius: cardBorderRadius,
    marginHorizontal: 4,
  },
  container: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    lineHeight: 30,
    paddingTop: 6,
  },
  subText: {
    marginTop: -5,
    marginLeft: 0,
  },
  viewDetailContainer: {
    height: 35,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: Color.borderColor,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: getDeviceStyle(4, 2),
  },
  selectedItem: {
    backgroundColor: '#f5cfb6',
    elevation: 10,
  },
  removeButton: {
    backgroundColor: Color.redColor,
    maxHeight: containerHeight,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeLabel: {
    fontSize: bodyFontSize(),
    color: Color.whiteColor
  },
  draggableIconContainer: {
    width: 20,
    marginLeft: -10,
    paddingTop: 5
  }
});

export default SelectedIndicatorItemComponentStyles;