import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { subTitleFontSize } from '../../utils/font_size_util';

const VotingCriteriaFormScreenStyles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: subTitleFontSize()
  },
  itemSeparator: {
    backgroundColor: Color.paleGrayColor,
    height: 20,
    marginBottom: -3
  }
});

export default VotingCriteriaFormScreenStyles;