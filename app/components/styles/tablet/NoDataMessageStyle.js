import { StyleSheet, Dimensions } from 'react-native';

const NoDataMessageStyles = StyleSheet.create({
  label: {
    fontSize: 24,
    marginVertical: 10
  },
  icon: {
    fontSize: 100,
    color: "#e1e0e1"
  },
  messageContainer: {
    marginTop: -(220 / 3),
    alignItems: 'center',
    height: 220
  }
});

export default NoDataMessageStyles;