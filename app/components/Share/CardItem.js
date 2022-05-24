import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';

import ArrowRightIcon from './ArrowRightIcon';

import { getDeviceStyle, cardItemPadding } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';

class CardItem extends React.Component {
  renderArrowIcon() {
    return <View style={{justifyContent: 'center'}}>
            <ArrowRightIcon/>
           </View>
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}
        style={[listItemStyles.card, styles.container, this.props.containerStyle]}
      >
        <View style={{flex: 1, justifyContent: 'center'}}>
          { this.props.content }
        </View>

        { this.renderArrowIcon() }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: Color.whiteColor,
    minHeight: pressableItemSize(getDeviceStyle(28, 20)),
    marginBottom: 14,
    paddingHorizontal: cardItemPadding,
  }
});

export default CardItem;