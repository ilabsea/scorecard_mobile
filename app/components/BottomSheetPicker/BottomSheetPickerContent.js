import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import BottomSheetPickerContentListItem from './BottomSheetPickerContentListItem';
import SearchBox from '../SearchBox/SearchBox';
import OutlinedButton from '../OutlinedButton';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import { containerPadding } from '../../utils/responsive_util';

class BottomSheetPickerContent extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.selectedItem,
      searchedFacilitator: '',
      items: this.props.items,
      contentHeight: this.props.contentHeight,
    };
  }

  setContentHeight(contentHeight) {
    this.setState({ contentHeight });
  }

  onSelectItem(item) {
    if (item.disabled)
      return;

    this.setState({ selectedItem: item.value });
    this.props.onSelectItem(item)
  }

  renderListItem() {
    console.log('server url = ', this.state.items)

    return <BottomSheetPickerContentListItem
              items={this.state.items}
              selectedItem={this.state.selectedItem}
              onSelectItem={(item) => this.onSelectItem(item)}
              showSubtitle={this.props.showSubtitle}
              showEditForm={this.props.showEditForm}
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
      searchedFacilitator: text,
      items: filteredFacilitator
    });
  }

  renderSearchBox() {
    return <SearchBox
              value={this.state.searchedFacilitator}
              onChangeText={(text) => this.searchFacilitator(text)}
              onFocus={(status) => this.props.onSearchBoxFocus()}
              onClearSearch={() => this.searchFacilitator('')}
           />
  }

  renderRightButton() {
    return <OutlinedButton
            icon="plus"
            label={this.context.translations.addNew}
            onPress={() => this.props.showEndpointUrlForm() }
          />
  }

  renderBottomSection() {
    return <View style={{paddingTop: 10}}>
              { !!this.props.bottomInfoMessage && this.props.bottomInfoMessage }

              <FormBottomSheetButton isValid={true} save={() => this.props.changeSelectedEndpoint()}
                wrapperStyle={{paddingTop: 0, marginTop: 10}}
                label={this.context.translations.change}
              />
           </View>
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{height: hp(this.state.contentHeight), backgroundColor: Color.whiteColor}}>
          <BottomSheetModalTitle title={this.props.title} isRequire={this.props.isRequire}
            rightContainerStyle={{marginTop: -10}}
            rightButton={this.renderRightButton()}
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