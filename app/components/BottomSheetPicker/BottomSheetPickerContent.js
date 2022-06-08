import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import BottomSheetPickerContentListItem from './BottomSheetPickerContentListItem';
import BottomSheetPickerContentBottomSection from './BottomSheetPickerContentBottomSection';
import SearchBox from '../SearchBox/SearchBox';

import { containerPadding } from '../../utils/responsive_util';

class BottomSheetPickerContent extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.selectedItem,
      searchedItem: '',
      items: this.props.items,
      contentHeight: this.props.contentHeight,
      isButtonDisabled: true,
    };
  }

  updateItems(items) {
    console.log('update items == ', items.length)
    this.setState({ items });
  }

  setContentHeight(contentHeight) {
    this.setState({ contentHeight });
  }

  onSelectItem(item) {
    if (item.disabled)
      return;

    this.setState({
      selectedItem: item.value,
      isButtonDisabled: !!this.props.isSelctedItemMatched ? this.props.isSelctedItemMatched(item.value) : false
    });

    this.props.onSelectItem(item)
  }

  renderListItem() {
    // console.log('picker content items = ', this.state.items)

    return <BottomSheetPickerContentListItem
              items={this.state.items}
              selectedItem={this.state.selectedItem}
              onSelectItem={(item) => this.onSelectItem(item)}
              showSubtitle={this.props.showSubtitle}
              showConfirmDelete={this.props.showConfirmDelete}
              isAllowToDelete={this.props.isAllowToDelete}
              defaultSelectedItem={this.props.selectedItem}
              customListItem={this.props.customListItem}
           />
  }

  renderList() {
    return (
      <ScrollView contentContainerStyle={[styles.scrollViewContainer, this.props.scrollViewStyle]}>
        <Pressable>{ this.renderListItem() }</Pressable>
      </ScrollView>
    )
  }

  searchFacilitator(text) {
    const filteredFacilitator = !!text ? this.props.items.filter(item => item.label.toLowerCase().includes(text.toLowerCase())) : this.props.items;
    this.setState({
      searchedItem: text,
      items: filteredFacilitator
    });
  }

  renderSearchBox() {
    return <SearchBox
              value={this.state.searchedItem}
              onChangeText={(text) => this.searchFacilitator(text)}
              onFocus={(status) => this.props.onSearchBoxFocus()}
              onClearSearch={() => this.searchFacilitator('')}
           />
  }

  renderBottomSection() {
    return <BottomSheetPickerContentBottomSection bottomInfoMessage={this.props.bottomInfoMessage}
            onPressButton={() => this.props.onPressBottomButton()} isButtonDisabled={this.state.isButtonDisabled} />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{height: hp(this.state.contentHeight), backgroundColor: Color.whiteColor}}>
          <BottomSheetModalTitle title={this.props.title} isRequire={this.props.isRequire}
            rightContainerStyle={{marginTop: -10}}
            onPressRightButton={() => this.props.onPressRightButton()}
            hasAddButton={this.props.hasAddButton}
          />

          { this.props.hasSearchBox && this.renderSearchBox() }
          { this.renderList() }
          { this.props.hasBottomButton && this.renderBottomSection() }
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
    paddingBottom: 20,
  },
});

export default BottomSheetPickerContent;