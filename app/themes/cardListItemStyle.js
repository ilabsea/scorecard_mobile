import Color from '../themes/color';
import { StyleSheet } from 'react-native';

const cardListItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  h1: {
    fontSize: 24,
    color: '#3a3a3a',
    marginBottom: 6,
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 20,
    color: '#3a3a3a',
    marginBottom: 6,
    fontWeight: 'bold'
  },
  paragraph: {
    fontSize: 16,
    flex: 1
  },
  contentWrapper: {
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1
  },
  statusIconWrapper: {
    width: 160,
    backgroundColor: Color.tipBgColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    height: 180,
    marginBottom: 20,
    flexDirection: 'row',
  },
  viewDetail: {
    height: 48,
    borderTopWidth: 1,
    borderTopColor: Color.borderColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10
  }
});

export default cardListItemStyle;
