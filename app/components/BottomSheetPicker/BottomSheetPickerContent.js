import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Item, Icon } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import { containerPadding } from '../../utils/responsive_util';
import { pressableItemSize, listItemPaddingVertical } from '../../utils/component_util';

class BottomSheetPickerContent extends React.Component {
  static contextType = LocalizationContext;
  state = {
    selectedItem: this.props.selectedItem
  }

  onSelectItem(item) {
    this.setState({ selectedItem: item.value });
    this.props.onSelectItem(item)
  }

  renderListItem() {
    return this.props.items.map((item, index) => {
      return (
        <TouchableOpacity key={index}
          onPress={() => this.onSelectItem(item)}
          style={[styles.itemContainer, { borderBottomWidth: index == this.props.items.length - 1 ? 0 : 1 }]}
        >
          <Text style={{flex: 1}}>{ item.label }</Text>
          { this.state.selectedItem === item.value && <MaterialIcon name='check' color={Color.clickableColor} size={20} /> }
        </TouchableOpacity>
      )
    })
  }

  renderList() {
    return (
      <ScrollView contentContainerStyle={{ padding: containerPadding, paddingTop: 10, flexGrow: 1, paddingBottom: 20 }}>
        <Pressable>{ this.renderListItem() }</Pressable>
      </ScrollView>
    )
  }

  render() {
    const modalTitle = this.props.isDynamicTitle ? this.context.translations[this.props.title] : this.props.title;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{height: hp('48%'), backgroundColor: Color.whiteColor, paddingBottom: 15}}>
          <BottomSheetModalTitle title={modalTitle} />
          { this.renderList() }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: pressableItemSize(listItemPaddingVertical),
    borderColor: Color.paleGrayColor,
    alignItems: 'center'
  }
});

export default BottomSheetPickerContent;