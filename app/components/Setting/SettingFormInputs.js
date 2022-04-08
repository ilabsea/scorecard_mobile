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

  render() {
    const {translations} = this.context;
    const {email, password, emailErrorMsg, passwordErrorMsg} = this.props;
    const emailLabel = `${translations.email} *`;
    const passwordLabel = `${translations.password} *`;
    const removeScorecardValue = `${environment.removeScorecardDay} ${translations.days}`;

    return (
      <View>
        <TextFieldInput
          value={email}
          label={emailLabel}
          placeholder={translations["enterEmail"]}
          fieldName="email"
          onChangeText={this.props.onChangeText}
          message={translations[emailErrorMsg]}
          onFocus={() => this.props.closeDropDown()}
          keyboardType='email-address'
          caretHidden={false}
        />

        <TextFieldInput
          value={password}
          label={passwordLabel}
          placeholder={translations["enterPassword"]}
          fieldName="password"
          onChangeText={this.props.onChangeText}
          message={translations[passwordErrorMsg]}
          secureTextEntry={this.state.showPasswordIcon == 'eye' ? true : false}
          onFocus={() => this.props.closeDropDown()}
          right={this.renderShowPasswordIcon()}
        />

        <TextFieldInput
          value={removeScorecardValue}
          label={translations.submittedScorecardWillBeRemovedIn}
          fieldName="removeScorecardDuration"
          onChangeText={this.props.onChangeText}
          disabled={true}
        />
      </View>
    )
  }
}

export default SettingFormInputs;