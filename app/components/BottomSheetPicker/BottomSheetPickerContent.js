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
import EndpointUrlTermConditions from '../EndpointUrlTermConditions';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import { containerPadding } from '../../utils/responsive_util';

let _this = null;

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

    _this = this;
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
    return <BottomSheetPickerContentListItem
              items={this.state.items}
              selectedItem={this.state.selectedItem}
              onSelectItem={(item) => this.onSelectItem(item)}
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
            label={this.context.translations.addNewUrlEndpoint}
            onPress={() => this.props.showEndpointUrlForm() }
          />
  }

  renderBottomSection() {
    return <View style={{paddingTop: 10}}>
              <EndpointUrlTermConditions/>

              <FormBottomSheetButton isValid={true} save={() => _this.props.changeSelectedEndpoint()}
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
          />

          { this.props.hasSearchBox && this.renderSearchBox() }
          { this.renderList() }
          { this.renderBottomSection() }
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