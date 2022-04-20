import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import { environment } from '../../config/environment';

class SettingFormInputs extends React.Component {
  static contextType = LocalizationContext
  state = {
    showPasswordIcon: 'eye',
  }

  renderShowPasswordIcon = () => {
    return (
      <TextInput.Icon
        name={this.state.showPasswordIcon}
        color="#959595"
        onPress={() => this.setState({ showPasswordIcon: this.state.showPasswordIcon == 'eye' ? 'eye-off' : 'eye' })}
      />
    )
  }

  renderEmailTextInput() {
    const { translations } = this.context;
    return <TextFieldInput
              value={this.props.email}
              label={`${translations.email} *`}
              placeholder={translations["enterEmail"]}
              fieldName="email"
              onChangeText={this.props.onChangeText}
              message={translations[this.props.emailErrorMsg]}
              onFocus={() => this.props.closeDropDown()}
              keyboardType='email-address'
              caretHidden={false}
            />
  }

  renderPasswordTextInput() {
    const {translations} = this.context;
    return <TextFieldInput
            value={this.props.password}
            label={`${translations.password} *`}
            placeholder={translations["enterPassword"]}
            fieldName="password"
            onChangeText={this.props.onChangeText}
            message={translations[this.props.passwordErrorMsg]}
            secureTextEntry={this.state.showPasswordIcon == 'eye' ? true : false}
            onFocus={() => this.props.closeDropDown()}
            right={this.renderShowPasswordIcon()}
          />
  }

  renderRemoveDayTextInput() {
    const {translations} = this.context;
    return <TextFieldInput
            value={`${environment.removeScorecardDay} ${translations.days}`}
            label={translations.submittedScorecardWillBeRemovedIn}
            fieldName="removeScorecardDuration"
            onChangeText={this.props.onChangeText}
            disabled={true}
          />
  }

  render() {
    return (
      <View>
        { this.renderEmailTextInput() }
        { this.renderPasswordTextInput() }
        { this.renderRemoveDayTextInput() }
      </View>
    )
  }
}

export default SettingFormInputs;