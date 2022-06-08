import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { CUSTOM } from '../../constants/main_constant';
import BottomSheetPickerTabletStyles from '../../styles/tablet/BottomSheetPickerComponentStyle';
import BottomSheetPickerMobileStyles from '../../styles/mobile/BottomSheetPickerComponentStyle';

const styles = getDeviceStyle(BottomSheetPickerTabletStyles, BottomSheetPickerMobileStyles);

class BottomSheetPickerContentListItem extends React.Component {
  renderListItem() {
    return this.props.items.map((item, index) => {
      const isAbleToDelete = this.isAbleToDelete(item);

      return (
        <TouchableOpacity key={index}
          onPress={() => this.props.onSelectItem(item)}
          style={[styles.itemContainer, { borderBottomWidth: index == this.props.items.length - 1 ? 0 : 1 }]}
        >
          { this.props.customListItem ? this.props.customListItem(item)
            :
            <View style={{flex: 1}}>
              <Text style={[styles.itemTitle, { color: this.itemColor(item, Color.blackColor) }]}>{ item.label }</Text>
              { this.props.showSubtitle && <Text style={[styles.itemSubtitle, { color: this.itemColor(item, Color.grayColor) }]}>{ item.value }</Text> }
            </View>
          }

          { this.hasSelected(item) &&
            <MaterialIcon name='check' color={this.itemColor(item, Color.clickableColor)} size={22} style={{marginRight: (item.type == CUSTOM && isAbleToDelete) ? 20 : 0}} />
          }

          { isAbleToDelete && 
            <TouchableOpacity onPress={() => this.props.showConfirmDelete(item)} style={[styles.editButton, { borderWidth: 0, alignItems: 'flex-end' }]} >
              <MaterialIcon name='delete' color={Color.errorColor} size={20} />
            </TouchableOpacity>
          }
        </TouchableOpacity>
      )
    })
  }

  isAbleToDelete(item) {
    return !!this.props.showConfirmDelete && item.type == CUSTOM && this.props.isAllowToDelete(item.value);
  }

  hasSelected(item) {
    return item.disabled || item.value === this.props.selectedItem;
  }

  itemColor(item, defaultColor) {
    return (item.disabled && item.value != this.props.selectedItem) ? Color.disableCardColor : defaultColor;
  }

  render() {
    return this.renderListItem();
  }
}

export default BottomSheetPickerContentListItem;