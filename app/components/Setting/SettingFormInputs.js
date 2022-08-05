import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../Share/TextFieldInput';
import { environment } from '../../config/environment';
import { pressableItemSize } from '../../utils/component_util';

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
        accessibilityLabel='toggle password visibility'
        style={{width: pressableItemSize(), height: pressableItemSize()}}
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
              accessibilityLabel="email text input"
              onChangeText={this.props.onChangeText}
              message={translations[this.props.emailErrorMsg]}
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
            accessibilityLabel="password text input"
            onChangeText={this.props.onChangeText}
            message={translations[this.props.passwordErrorMsg]}
            secureTextEntry={this.state.showPasswordIcon == 'eye' ? true : false}
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