import { StyleSheet } from 'react-native';
import { FontFamily } from '../../theme/font';

const ListUserStyles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  headingTitle: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    color: '#22354c',
  },
});

export default ListUserStyles;