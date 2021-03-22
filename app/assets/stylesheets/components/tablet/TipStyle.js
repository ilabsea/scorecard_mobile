import { StyleSheet } from 'react-native';

const TipStyles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
    paddingRight: 10
  },
  title: {
    marginBottom: 0,
    flex: 1,
  },
  viewTipLabel: {
    fontSize: 16
  },
  iconSize: {
    fontSize: 24
  }
});

export default TipStyles;