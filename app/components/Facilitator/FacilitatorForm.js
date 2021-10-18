import React, { Component } from 'react';
import { View, Text } from 'react-native';

import SelectPicker from '../SelectPicker';
import {LocalizationContext} from '../Translations';

class FacilitatorForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.numberOfFacilitator = 4;
    this.controllers = new Array(4);

    this.state = {
      openIndex: null,
    };

    this.searchRef = React.createRef();
  }

  getSelectedFacilitator = (facilitator) => {
    return (facilitator != undefined && facilitator != null) ? facilitator.value : null
  }

  closeSelectBox = (exceptIndex) => {
    if (exceptIndex == 2 || exceptIndex == 3) {
      this.setState({ openIndex: exceptIndex });
      this.props.updateContainerPadding(190);
    }

    for (let i = 0; i < this.controllers.length; i++) {
      if (exceptIndex == i)
        continue;

      this.controllers[i].close();
    }
  }

  onDropdownClose = (index) => {
    if (index == 2 || index == 3)
      this.setState({ openIndex: null });

    if (!this.state.openIndex)
      this.props.updateContainerPadding(0);
  }

  onOpen(index) {
    this.searchRef.focus();
    this.closeSelectBox(index);
  }

  renderFacilitators = () => {
    const {translations} = this.context;
    let pickerzIndex = 9000;
    let itemIndex = 0;
    return Array(this.numberOfFacilitator)
      .fill()
      .map((_, index) => {
        itemIndex += 1;
        pickerzIndex -= 1000;

        return (
          <SelectPicker
            key={index}
            items={this.props.facilitators}
            selectedItem={this.getSelectedFacilitator(this.props.selectedFacilitators[index])}
            isRequire={index == 0 || index == 1}
            label={translations['facilitator']}
            placeholder={translations['selectFacilitator']}
            searchablePlaceholder={translations['searchForFacilitator']}
            zIndex={pickerzIndex}
            customContainerStyle={index == 0 ? {marginTop: 0} : {}}
            customLabelStyle={[{zIndex: pickerzIndex + 1}, index == 0 ? { marginTop: -10 } : {}]}
            showCustomArrow={true}
            onChangeItem={(text) => this.props.onChangeFacilitator(text, index)}
            itemIndex={itemIndex}
            mustHasDefaultValue={false}
            controller={(instance) => this.controllers[index] = instance}
            onOpen={() => this.onOpen(index)}
            onClose={() => this.onDropdownClose(index)}
            searchable={true}
            searchTextInputProps={{ ref: (searchInputRef) => this.searchRef = searchInputRef }}
          />
        );
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