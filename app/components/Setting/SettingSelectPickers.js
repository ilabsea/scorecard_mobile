import React from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import SettingLanguagePicker from './SettingLanguagePicker';
import SettingProposedIndicatorMethodPicker from './SettingProposedIndicatorMethodPicker';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';

class SettingSelectPickers extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.languagePickerRef = React.createRef();
    this.indicatorMethodRef = React.createRef();
  }

  render() {
    return (
      <View>
        <SettingProposedIndicatorMethodPicker
          ref={this.indicatorMethodRef}
          formRef={this.props.formRef}
          formModalRef={this.props.formModalRef}
          proposedIndicatorMethod={this.props.proposedIndicatorMethod}
          email={this.props.email}
        />

        <SettingLanguagePicker
          formRef={this.props.formRef}
          formModalRef={this.props.formModalRef}
        />
      </View>
    )
  }
}

export default SettingSelectPickers;