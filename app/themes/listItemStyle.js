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
    minWidth: 131,
    borderRadius: 4
  },
  criteriaWrapper: {
    flexDirection: 'row',
    padding: 20
  },
  btnAdd: {
    height: 36,
    backgroundColor: Color.headerColor,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    height: 36,
    backgroundColor: Color.btnRemoveBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 87,
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 4,
  }
});

export default ListItemStyle;
