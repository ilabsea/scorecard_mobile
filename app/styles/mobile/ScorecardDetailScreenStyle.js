import { StyleSheet } from 'react-native';
import { subTitleFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ScorecardDetailScreenStyles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  title: {
    fontSize: subTitleFontSize(),
    fontFamily: FontFamily.body,
    lineHeight: 34,
    marginBottom: -10
  }
});

export default ScorecardDetailScreenStyles;