import Color from '../themes/color';
import {StyleSheet} from 'react-native';

const ListItemStyle = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderColor: Color.listItemBorderColor
  },
  criteria: {
    height: 36,
    backgroundColor: '#787878',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 16,
  },
  criteriaWrapper: {
    flexDirection: 'row',
    padding: 16,
  },
  btn: {
    height: 36,
    backgroundColor: Color.headerColor,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 87,
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  footer: {
    flexDirection: 'row',
    marginLeft: 20,
    paddingRight: 10,
    height: 42,
    borderTopWidth: 1,
    borderColor: Color.borderColor,
    alignItems: 'center'
  },
  viewDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnRemove: {
    backgroundColor: Color.btnRemoveBgColor,
  }
});

export default ListItemStyle;
