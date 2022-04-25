import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';

import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import {LocalizationContext} from '../Translations';
import { environment } from '../../config/environment';
import { facilitatorPickerContentHeight, facilitatorPickerContentExpanedHeight } from '../../constants/modal_constant';

class FacilitatorForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      inlineIcons: new Array(environment.numberOfFacilitators),
    };

    this.pickerContentRef = React.createRef();
    this.isComponentUnmounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.isComponentUnmounted && prevProps.bottomSheetModalIndex != this.props.bottomSheetModalIndex) {
      const modalContentHeight = this.props.bottomSheetModalIndex === 1 ? facilitatorPickerContentExpanedHeight : facilitatorPickerContentHeight;
      this.pickerContentRef.current?.setContentHeight(modalContentHeight);

      if (this.props.bottomSheetModalIndex < 1) Keyboard.dismiss();
    }
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  getSelectedFacilitator = (facilitator) => {
    return (facilitator != undefined && facilitator != null) ? facilitator.value.toString() : null
  }

  showPicker(title, index) {
    this.props.pickerRef.current?.setBodyContent(
      <BottomSheetPickerContent
        ref={this.pickerContentRef}
        title={title}
        isDynamicTitle={false}
        items={this.props.facilitators}
        selectedItem={this.getSelectedFacilitator(this.props.selectedFacilitators[index])}
        contentHeight={facilitatorPickerContentHeight}
        hasSearchBox={true}
        onSearchBoxFocus={() => this.props.pickerModalRef.current?.expand()}
        onSelectItem={(item) => this.props.onChangeFacilitator(item, index)}
      />
    );
    this.props.pickerModalRef.current?.present();
  }

  renderFacilitators = () => {
    const {translations} = this.context;

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
                  customContainerStyle={{ marginTop: 40 }}
                  showPicker={() => this.showPicker(title, index)}
               />
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