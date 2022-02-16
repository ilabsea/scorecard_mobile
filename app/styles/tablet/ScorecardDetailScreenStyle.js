import { StyleSheet } from 'react-native';
import { subTitleFontSize } from '../../utils/font_size_util';

const ScorecardDetailScreenStyles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    fontSize: subTitleFontSize(),
    marginBottom: -10
  }
});

export default ScorecardDetailScreenStyles;