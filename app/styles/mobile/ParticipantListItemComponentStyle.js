import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { numberContainerSize } from '../../utils/participant_list_util';
import { pressableItemSize } from '../../utils/component_util';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { cardItemPadding } from '../../utils/responsive_util';

const ParticipantListItemComponentStyles = StyleSheet.create({
  itemContainer: {
    marginBottom: 14,
    minHeight: pressableItemSize(20),
    backgroundColor: Color.whiteColor,
    borderRadius: 4,
    paddingHorizontal: cardItemPadding,
    justifyContent: 'center',
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
  attributeLabel: {
    paddingHorizontal: 6,
    fontSize: smallTextFontSize()
  },
  anonymousButton: {
    width: pressableItemSize(),
    height: pressableItemSize(),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  raisedNumberContainer: {
    alignItems: 'center',
    backgroundColor: Color.grayColor,
    borderRadius: 24,
    justifyContent: 'center',
    marginRight: 5,
    height: 21,
    width: 21,
  },
  raisedNumberLabel: {
    color: Color.whiteColor,
    fontSize: 11,
    marginLeft: -1
  }
});

export default ParticipantListItemComponentStyles;