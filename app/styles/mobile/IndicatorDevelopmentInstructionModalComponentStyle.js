import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { isMediumScreenDevice, isShortScreenDevice } from '../../utils/responsive_util';

const numberOfListItem = (isMediumScreenDevice() || isShortScreenDevice()) ? 2 : 3;
let imageHeight = (118 * numberOfListItem) + 20;

if (isMediumScreenDevice())
  imageHeight = imageHeight - 40;

const indicatorDevelopmentInstructionModalStyles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 16,
  },
  instructionImage: {
    width: '100%',
    height: imageHeight,
    resizeMode: 'contain'
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  closeButtonContainer: {
    backgroundColor: Color.whiteColor,
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Color.clickableColor,
    borderRadius: 5
  },
  closeButtonLabel: {
    color: Color.clickableColor,
    fontSize: bodyFontSize()
  }
});

export default indicatorDevelopmentInstructionModalStyles;