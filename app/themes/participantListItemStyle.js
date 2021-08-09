import Color from '../themes/color';
import { StyleSheet } from 'react-native';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import { getDeviceStyle, modalHeadingTitleSize } from '../utils/responsive_util';
import { numberContainerSize, numberLabelSize } from '../utils/participant_list_util';
import { modalBorderRadius } from '../constants/border_radius_constant';

const participantListItemStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
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
    marginTop: -4
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
    borderWidth: 0,
    paddingVertical: 16,
    alignItems: 'center',
    paddingTop: 18,
  },
});

export default participantListItemStyle;
