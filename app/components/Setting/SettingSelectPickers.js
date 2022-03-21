import React from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import SettingLanguagePicker from './SettingLanguagePicker';
import SettingProposedIndicatorMethodPicker from './SettingProposedIndicatorMethodPicker';

class SettingSelectPickers extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.languagePickerRef = React.createRef();
    this.indicatorMethodRef = React.createRef();
  }

  closeDropdownPickers() {
    this.languagePickerRef.current?.languageController.close();
    this.indicatorMethodRef.current?.proposedIndicatorMethodController.close();
  }

  render() {
    return (
      <View>
        <SettingLanguagePicker ref={this.languagePickerRef} indicatorMethodRef={this.indicatorMethodRef} />
        <SettingProposedIndicatorMethodPicker
          ref={this.indicatorMethodRef}
          formRef={this.props.formRef}
          formModalRef={this.props.formModalRef}
        />
      </View>
    )
  }
}

export default SettingSelectPickers;