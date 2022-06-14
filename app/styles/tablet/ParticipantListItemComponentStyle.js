import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { numberContainerSize } from '../../utils/participant_list_util';
import { pressableItemSize } from '../../utils/component_util';
import { mediumIconSize, bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { cardItemPadding } from '../../utils/responsive_util';

const PrarticipantListItemComponentStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 14,
    minHeight: pressableItemSize(28),
    backgroundColor: Color.whiteColor,
    borderRadius: 4,
    paddingHorizontal: cardItemPadding
  },
  numberContainer: {
    width: numberContainerSize,
    height: numberContainerSize,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.grayColor,
  },
  numberLabel: {
    fontSize: bodyFontSize(),
    color: Color.whiteColor,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  // iconStyle: {
  //   fontSize: mediumIconSize(),
  // },
  // genderContainer: {
  //   paddingRight: 10,
  //   paddingLeft: 16
  // },
  attributeLabel: {
    paddingHorizontal: 8,
    fontSize: smallTextFontSize()
  }
});

export default PrarticipantListItemComponentStyles;