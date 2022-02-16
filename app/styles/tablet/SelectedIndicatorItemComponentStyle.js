import { StyleSheet } from 'react-native';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const SelectedIndicatorItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: 140,
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
    flex: 1,
    marginTop: 6,
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
    color: 'red',
  },
  selectedItem: {
    backgroundColor: '#f5cfb6',
    elevation: 30,
  }
});

export default SelectedIndicatorItemComponentStyles;