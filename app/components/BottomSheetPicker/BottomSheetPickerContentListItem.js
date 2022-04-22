import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import BottomSheetPickerTabletStyles from '../../styles/tablet/BottomSheetPickerComponentStyle';
import BottomSheetPickerMobileStyles from '../../styles/mobile/BottomSheetPickerComponentStyle';

const styles = getDeviceStyle(BottomSheetPickerTabletStyles, BottomSheetPickerMobileStyles);

class BottomSheetPickerContentListItem extends React.Component {
  renderListItem() {
    return this.props.items.map((item, index) => {
      if (!item.value && this.props.lastListItem)
        return this.props.lastListItem;

      return (
        <TouchableOpacity key={index}
          onPress={() => this.props.onSelectItem(item)}
          style={[styles.itemContainer, { borderBottomWidth: index == this.props.items.length - 1 ? 0 : 1 }]}
        >
          <View style={{flex: 1}}>
            <Text style={styles.itemTitle}>{ item.label }</Text>
            { this.props.showSubtitle && <Text style={styles.itemSubtitle}>{ item.value }</Text> }
          </View>


          { this.props.selectedItem === item.value && <MaterialIcon name='check' color={Color.clickableColor} size={20} /> }
        </TouchableOpacity>
      )
    })
  }

  render() {
    return this.renderListItem();
  }
}

export default BottomSheetPickerContentListItem;