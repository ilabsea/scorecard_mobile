import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { numberContainerSize } from '../../utils/participant_list_util';
import { bodyFontSize, mediumIconSize, smallTextFontSize } from '../../utils/font_size_util';

const PrarticipantListItemComponentStyles = StyleSheet.create({
  numberContainer: {
    width: numberContainerSize,
    height: numberContainerSize,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.grayColor,
  },
  numberLabel: {
    fontSize: bodyFontSize(),
    color: Color.whiteColor,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  iconStyle: {
    fontSize: mediumIconSize()
  },
  genderContainer: {
    paddingRight: 5,
    paddingLeft: 12
  },
  attributeLabel: {
    paddingHorizontal: 6,
    fontSize: smallTextFontSize()
  }
});

export default PrarticipantListItemComponentStyles;