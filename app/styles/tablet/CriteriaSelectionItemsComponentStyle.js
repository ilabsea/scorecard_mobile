import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const CriteriaSelectionItemsStyles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  indicatorContainer: {
    borderBottomColor: Color.paleGrayColor,
    width: '100%',
  },
  tagTitle: {
    fontFamily: FontFamily.title,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5
  }
});

export default CriteriaSelectionItemsStyles;