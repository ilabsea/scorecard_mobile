import { StyleSheet } from 'react-native';
import { mobileSubTitleSize } from '../../utils/responsive_util';

const ScorecardDetailScreenStyles = StyleSheet.create({
  container: {
    paddingTop: 14,
  },
  title: {
    fontSize: mobileSubTitleSize(),
    marginBottom: -10
  }
});

export default ScorecardDetailScreenStyles;