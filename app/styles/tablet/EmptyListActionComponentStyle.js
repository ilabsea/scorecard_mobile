import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const EmptyListActionComponentStyles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontFamily: FontFamily.body,
    marginVertical: 10
  },
  icon: {
    fontSize: 100,
    color: '#bab7ba',
  },
  messageContainer: {
    marginTop: -(220 / 3),
    alignItems: 'center',
    height: 220
  }
});

export default EmptyListActionComponentStyles;