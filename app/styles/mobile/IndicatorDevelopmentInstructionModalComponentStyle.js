import { StyleSheet } from 'react-native';
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
});

export default indicatorDevelopmentInstructionModalStyles;