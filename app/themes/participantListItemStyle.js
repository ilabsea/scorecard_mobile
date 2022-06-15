import Color from '../themes/color';
import { StyleSheet } from 'react-native';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import { getDeviceStyle, modalHeadingTitleSize } from '../utils/responsive_util';
import { numberContainerSize, numberLabelSize } from '../utils/participant_list_util';
import { pressableItemSize } from '../utils/component_util';
import { modalBorderRadius } from '../constants/border_radius_constant';
import { popupModalMinHeight } from '../constants/component_style_constant';

const participantListItemStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: popupModalMinHeight,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    paddingTop: getDeviceStyle(20, 10),
    borderRadius: modalBorderRadius
  },
  header: {
    fontSize: modalHeadingTitleSize(),
    fontFamily: FontFamily.title,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  numberContainer: {
    width: numberContainerSize,
    height: numberContainerSize,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  numberLabel: {
    fontSize: numberLabelSize,
    color: 'white',
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  button: {
    paddingLeft: 15,
    paddingRight: 20,
    alignSelf: 'center',
  },
  buttonLabel: {
    color: Color.primaryButtonColor,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: pressableItemSize(16)
  },
});

export default participantListItemStyle;
