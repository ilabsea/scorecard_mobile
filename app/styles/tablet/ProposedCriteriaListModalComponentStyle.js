import { StyleSheet } from 'react-native';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const ProposedcriteriaListModalComponentStyles = StyleSheet.create({
  container: {
    width: '80%',
    maxHeight: 650,
    alignSelf: 'center',
    borderRadius: modalBorderRadius
  },
  header: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
  }
});

export default ProposedcriteriaListModalComponentStyles;