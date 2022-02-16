import { StyleSheet } from 'react-native';
import { isShortWidthScreen, isShortScreenDevice } from '../../utils/responsive_util';

const titlePaddingTop = () => {
  if (isShortScreenDevice())
    return 8;

  return isShortWidthScreen() ? 5 : 6
}

const ProposedIndicatorItemStyles = StyleSheet.create({
  titleText: {
    lineHeight: 22,
    paddingTop: titlePaddingTop(),
  },
  subText: {
    marginTop: -5,
    marginLeft: 0
  }
});

export default ProposedIndicatorItemStyles;