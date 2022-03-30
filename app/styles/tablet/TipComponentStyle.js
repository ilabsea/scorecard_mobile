import { StyleSheet } from 'react-native';
import { cardBorderRadius } from '../../constants/border_radius_constant';

const TipComponentStyles = StyleSheet.create({
  title: {
    marginBottom: 0,
    flex: 1,
    paddingRight: 5,
  },
  viewDetailLabel: {
    fontSize: 16,
  },
  viewDetailIcon: {
    fontSize: 24,
  },
  tipIconContainer: {
    width: 70,
    borderTopLeftRadius: cardBorderRadius,
    borderBottomLeftRadius: cardBorderRadius
  },
  tipIcon: {
    width: 40,
    height: 40,
  }
});

export default TipComponentStyles;