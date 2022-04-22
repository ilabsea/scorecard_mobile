import React, { Component } from 'react';
import { View } from 'react-native';

import Color from '../../themes/color';
import CustomDropdownPicker from '../CustomDropdownPicker/CustomDropdownPicker';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import {LocalizationContext} from '../Translations';
import { environment } from '../../config/environment';
import { facilitatorPickerContentHeight } from '../../constants/modal_constant';

class FacilitatorForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      openIndex: null,
      inlineIcons: new Array(environment.numberOfFacilitators),
    };
  }

  getSelectedFacilitator = (facilitator) => {
    return (facilitator != undefined && facilitator != null) ? facilitator.value.toString() : null
  }

  closeSelectBox = (exceptIndex) => {
    if (exceptIndex == 2 || exceptIndex == 3) {
      this.setState({ openIndex: exceptIndex });
      this.props.updateContainerPadding(190);
    }
  }

  onDropdownClose = (index) => {
    this.updateInlineIcons(index, false);

    if (index == 2 || index == 3)
      this.setState({ openIndex: null });

    if (!this.state.openIndex)
      this.props.updateContainerPadding(0);
  }

  onOpen(index) {
    this.updateInlineIcons(index, true);
    !!this.searchRef && this.searchRef.focus();
    this.closeSelectBox(index);
  }

  updateInlineIcons(index, hasIcon) {
    let inlineIcons = this.state.inlineIcons;
    inlineIcons[index] = hasIcon ? 'search_icon' : '';
    this.setState({ inlineIcons });
  }

  showPicker(title, index) {
    this.props.pickerRef.current?.setBodyContent(
      <BottomSheetPickerContent
        title={title}
        isDynamicTitle={false}
        items={this.props.facilitators}
        selectedItem={this.getSelectedFacilitator(this.props.selectedFacilitators[index])}
        contentHeight={facilitatorPickerContentHeight}
        onSelectItem={(item) => this.props.onChangeFacilitator(item, index)}
      />
    );
    this.props.pickerModalRef.current?.present();
  }

  renderFacilitators = () => {
    const {translations} = this.context;
    // let pickerzIndex = 9000;
    // let itemIndex = 0;

    return Array(environment.numberOfFacilitators)
      .fill()
      .map((_, index) => {
        const title = `${translations.facilitator} ${index + 1}${index == 0 || index == 1 ? ' *' : ''}`

        return <BottomSheetPicker
                  key={index}
                  title={title}
                  label={translations.selectFacilitator}
                  items={this.props.facilitators}
                  selectedItem={this.getSelectedFacilitator(this.props.selectedFacilitators[index])}
                  showSubtitle={false}
                  contentHeight='50%'
                  customContainerStyle={{ marginTop: 40 }}
                  showPicker={() => this.showPicker(title, index)}
               />
      });

    // return Array(environment.numberOfFacilitators)
    //   .fill()
    //   .map((_, index) => {
    //     itemIndex += 1;
    //     pickerzIndex -= 1000;

    //     return (
    //       <CustomDropdownPicker
    //         key={index}
    //         id={index + 1}
    //         isRequire={ index == 0 || index == 1 }
    //         openId={this.state.openPickerId}
    //         setOpenId={(openId) => this.setState({ openPickerId: openId })}
    //         items={this.props.facilitators}
    //         selectedItem={this.getSelectedFacilitator(this.props.selectedFacilitators[index])}
    //         zIndex={pickerzIndex}
    //         label={translations.facilitator}
    //         placeholder={translations['selectFacilitator']}
    //         itemIndex={0}
    //         customWrapperStyle={{ marginBottom: 15, marginTop: 20 }}
    //         unselectedBorder={{ borderColor: Color.grayColor, borderWidth: 2 }}
    //         onSelectItem={(item) => this.props.onChangeFacilitator(item, index)}
    //         onOpen={() => this.onOpen(index)}
    //         onClose={() => this.onDropdownClose(index)}
    //         searchable={true}
    //         searchPlaceholder={translations.searchForFacilitator}
    //         searchContainerStyle={{paddingHorizontal: 0, paddingVertical: 5, borderBottomColor: Color.lightGrayColor}}
    //         searchTextInputStyle={{borderWidth: 0}}
    //         searchTextInputProps={{
    //           ref: (searchInputRef) => this.searchRef = searchInputRef,
    //           inlineImageLeft: this.state.inlineIcons[index],
    //           inlineImagePadding: 6,
    //         }}
    //       />
    //     )
    //   });
  };

  render() {
    return (
      <View>
        { this.renderFacilitators() }
      </View>
    )
  }
}

export default FacilitatorForm;