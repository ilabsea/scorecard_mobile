import { StyleSheet } from 'react-native';
import { FontFamily } from '../../theme/font';

const CriteriaListStyles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FontFamily.title,
    flex: 1,
    color: '#22354c',
  },
  viewAllLabel: {
    textTransform: 'uppercase',
    color: '#e4761e',
    fontWeight: 'bold',
  },
  criteriaCardContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    marginRight: 15,
    elevation: 3,
  },
});

export default CriteriaListStyles;