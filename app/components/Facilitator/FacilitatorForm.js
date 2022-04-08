import React, { Component } from 'react';
import { View } from 'react-native';

import Color from '../../themes/color';
import SelectPicker from '../SelectPicker';
import CustomSelectPicker from '../CustomSelectPicker';
import {LocalizationContext} from '../Translations';
import { environment } from '../../config/environment';

class FacilitatorForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    // this.controllers = new Array(environment.numberOfFacilitators);

    this.state = {
      openIndex: null,
      inlineIcons: new Array(environment.numberOfFacilitators),
    };
  }

  getSelectedFacilitator = (facilitator) => {
    return (facilitator != undefined && facilitator != null) ? facilitator.value : null
  }

  closeSelectBox = (exceptIndex) => {
    if (exceptIndex == 2 || exceptIndex == 3) {
      this.setState({ openIndex: exceptIndex });
      this.props.updateContainerPadding(190);
    }

    // for (let i = 0; i < this.controllers.length; i++) {
    //   if (exceptIndex == i)
    //     continue;

    //   this.controllers[i].close();
    // }
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

  renderFacilitators = () => {
    const {translations} = this.context;
    let pickerzIndex = 9000;
    let itemIndex = 0;

    return Array(environment.numberOfFacilitators)
      .fill()
      .map((_, index) => {
        itemIndex += 1;
        pickerzIndex -= 1000;

        return (
          <CustomSelectPicker
            key={index}
            id={index + 1}
            isRequire={ index == 0 || index == 1 }
            openId={this.state.openPickerId}
            setOpenId={(openId) => this.setState({ openPickerId: openId })}
            items={this.props.facilitators}
            selectedItem={this.getSelectedFacilitator(this.props.selectedFacilitators[index])}
            zIndex={pickerzIndex}
            label={translations.facilitator}
            placeholder={translations['selectFacilitator']}
            itemIndex={0}
            customWrapperStyle={{ marginBottom: 15, marginTop: 20 }}
            unselectedBorder={{ borderColor: Color.grayColor, borderWidth: 2 }}
            onSelectItem={(item) => this.props.onChangeFacilitator(item, index)}
            onOpen={() => this.onOpen(index)}
            onClose={() => this.onDropdownClose(index)}
            searchable={true}
            searchPlaceholder={translations.searchForFacilitator}
            searchContainerStyle={{paddingHorizontal: 0, paddingVertical: 5, borderBottomColor: Color.lightGrayColor}}
            searchTextInputStyle={{borderWidth: 0}}
            searchTextInputProps={{
              ref: (searchInputRef) => this.searchRef = searchInputRef,
              inlineImageLeft: this.state.inlineIcons[index],
              inlineImagePadding: 6,
            }}
          />
        )

        // return (
        //   <SelectPicker
        //     key={index}
        //     items={this.props.facilitators}
        //     selectedItem={this.getSelectedFacilitator(this.props.selectedFacilitators[index])}
        //     isRequire={index == 0 || index == 1}
        //     label={translations['facilitator']}
        //     placeholder={translations['selectFacilitator']}
        //     searchablePlaceholder={translations['searchForFacilitator']}
        //     zIndex={pickerzIndex}
        //     customContainerStyle={index == 0 ? {marginTop: 0} : {}}
        //     customLabelStyle={[{zIndex: pickerzIndex + 1}, index == 0 ? { marginTop: -10 } : {}]}
        //     showCustomArrow={true}
        //     onChangeItem={(text) => this.props.onChangeFacilitator(text, index)}
        //     itemIndex={itemIndex}
        //     mustHasDefaultValue={false}
        //     controller={(instance) => this.controllers[index] = instance}
        //     onOpen={() => this.onOpen(index)}
        //     onClose={() => this.onDropdownClose(index)}
        //     searchable={true}
        //     searchTextInputProps={{
        //       ref: (searchInputRef) => this.searchRef = searchInputRef,
        //       inlineImageLeft: this.state.inlineIcons[index],
        //       inlineImagePadding: 6,
        //     }}
        //   />
        // );
      });
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