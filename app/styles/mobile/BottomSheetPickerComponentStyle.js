import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { pressableItemSize, listItemPaddingVertical } from '../../utils/component_util';

const BottomSheetPickerComponentStyles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: Color.inputBorderLineColor,
    borderRadius: 4,
    marginTop: 5,
    height: 58,
    position: 'relative'
  },
  titleContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
    top: -12,
    backgroundColor: Color.whiteColor,
  },
  titleLabel: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingLeft: 14
  },
  itemTitle: {
    fontSize: bodyFontSize(),
  },
  itemSubtitle: {
    fontSize: 13,
    color: Color.grayColor,
    marginTop: -10
  },
  chooseLabel: {
    paddingRight: 12,
    textTransform: 'uppercase',
  },
  itemContainer: {
    flexDirection: 'row',
    height: pressableItemSize(listItemPaddingVertical),
    borderColor: Color.paleGrayColor,
    alignItems: 'center',
  },
  deleteButton: {
    width: pressableItemSize(), 
    height: pressableItemSize(),
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BottomSheetPickerComponentStyles;