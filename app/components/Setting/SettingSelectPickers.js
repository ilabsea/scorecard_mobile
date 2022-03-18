import React from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import SettingLanguagePicker from './SettingLanguagePicker';
import SettingProposedIndicatorTypePicker from './SettingProposedIndicatorTypePicker';

class SettingSelectPickers extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.languagePickerRef = React.createRef();
    this.indicatorTypeRef = React.createRef();
  }

  closeDropdownPickers() {
    this.languagePickerRef.current?.languageController.close();
    this.indicatorTypeRef.current?.proposedIndicatorTypeController.close();
  }

  render() {
    return (
      <View>
        <SettingLanguagePicker ref={this.languagePickerRef} />
        <SettingProposedIndicatorTypePicker ref={this.indicatorTypeRef} />
      </View>
    )
  }
}

export default SettingSelectPickers;