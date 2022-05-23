import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { pressableItemSize, listItemPaddingVertical } from '../../utils/component_util';

const BottomSheetPickerComponentStyles = StyleSheet.create({
  itemTitle: {
    fontSize: bodyFontSize(),
  },
  itemSubtitle: {
    fontSize: 13,
    color: Color.grayColor,
    marginTop: -10
  },
  itemContainer: {
    flexDirection: 'row',
    height: pressableItemSize(listItemPaddingVertical),
    borderColor: Color.paleGrayColor,
    alignItems: 'center',
  },
  editButton: {
    width: pressableItemSize(), 
    height: pressableItemSize(),
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BottomSheetPickerComponentStyles;