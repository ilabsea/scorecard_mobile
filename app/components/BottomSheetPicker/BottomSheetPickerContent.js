import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import BottomSheetPickerContentListItem from './BottomSheetPickerContentListItem';
import { containerPadding } from '../../utils/responsive_util';

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
    return <BottomSheetPickerContentListItem
              items={this.props.items}
              selectedItem={this.state.selectedItem}
              onSelectItem={(item) => this.onSelectItem(item)}
              lastListItem={this.props.lastListItem}
              showSubtitle={this.props.showSubtitle}
           />
  }

  renderList() {
    return (
      <ScrollView contentContainerStyle={[styles.scrollViewContainer, this.props.scrollViewStyle]}>
        <Pressable>{ this.renderListItem() }</Pressable>
      </ScrollView>
    )
  }

  render() {
    const modalTitle = this.props.isDynamicTitle ? this.context.translations[this.props.title] : this.props.title;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{height: hp(this.props.contentHeight), backgroundColor: Color.whiteColor, paddingBottom: 15}}>
          <BottomSheetModalTitle title={modalTitle} />
          { this.renderList() }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: containerPadding,
    paddingTop: 10,
    flexGrow: 1,
    paddingBottom: 20
  },
});

export default BottomSheetPickerContent;