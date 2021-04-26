import { StyleSheet } from 'react-native';

const SelectedCriteriaItemStyles = StyleSheet.create({
  itemContainer: {
    height: 140
  },
  container: {
    paddingLeft: 10,
    flex: 1,
    marginTop: 6,
    justifyContent: 'center',
  },
  titleText: {
    lineHeight: 30,
    paddingTop: 6,
  },
  subText: {
    marginTop: -5,
    marginLeft: 0,
  },
  viewDetailContainer: {
    height: 35,
    marginTop: 5,
  }
});

export default SelectedCriteriaItemStyles;