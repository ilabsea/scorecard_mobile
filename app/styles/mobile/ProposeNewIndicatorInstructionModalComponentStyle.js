import {StyleSheet} from 'react-native'
import {isShortScreenDevice} from '../../utils/responsive_util';

const ProposeNewIndicatorInstructionModalComponentStyles = StyleSheet.create({
  image: {
    marginTop: 0,
    height: isShortScreenDevice() ? '85%' : '87%',
    width: '100%',
    resizeMode: 'stretch'
  },
  closeButtonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    width: 90,
  }
})

export default ProposeNewIndicatorInstructionModalComponentStyles