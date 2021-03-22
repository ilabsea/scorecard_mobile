import { StyleSheet } from 'react-native';

const UserTableStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  tableHead: {
    height: 40,
    backgroundColor: '#eeeeee',
  },
  headerText: {
    margin: 6,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    margin: 6,
    marginVertical: 10,
    textAlign: 'center',
  },
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  indicatorBadge: {
    padding: 2,
    marginHorizontal: 2,
  },
  indicatorLabel: {
    color: '#ffffff',
    fontSize: 14,
    backgroundColor: '#787878',
    paddingHorizontal: 5,
    borderRadius: 3,
    maxWidth: 120,
  },
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cellLabel: {
    fontSize: 16
  },
  actionCellLabel: {
    color: '#e4761e',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginLeft: 4,
  },
  actionCellIcon: {
    fontSize: 18
  }
});

export default UserTableStyles;