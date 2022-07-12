import React from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { LocalizationContext } from '../../Translations';
import TextFieldInput from '../TextFieldInput';
import { pressableItemSize } from '../../../utils/component_util';
import { getDeviceStyle } from '../../../utils/responsive_util';
import PopupModalTabletStyles from '../../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorAuthenticationForm extends React.Component {
  static contextType = LocalizationContext;

  state = {
    passwordIcon: 'eye'
  }

  _renderPasswordIcon = () => {
    const buttonPadding = 2;

    return (
      <TextInput.Icon
        name={this.state.passwordIcon}
        color="#959595"
        onPress={() => this.setState({ passwordIcon: this.state.passwordIcon == 'eye' ? 'eye-off' : 'eye' })}
        accessibilityLabel='Toggle password visibility'
        style={{height: pressableItemSize(buttonPadding), width: pressableItemSize(buttonPadding)}}
      />
    )
  }

  _renderTextInputs() {
    const { translations } = this.context;
    const emailLabel = `${translations['email']} *`;
    const passwordLabel = `${translations['password']} *`;

    return (
      <React.Fragment>
        <TextFieldInput
          value={this.props.email}
          label={emailLabel}
          placeholder={translations.enterEmail}
          fieldName="email"
          onChangeText={this.props.onChangeText}
          message={translations.emailErrorMsg}
          keyboardType='email-address'
        />

        <TextFieldInput
          value={this.props.password}
          label={passwordLabel}
          placeholder={translations.enterPassword}
          fieldName="password"
          onChangeText={this.props.onChangeText}
          message={translations.passwordErrorMsg}
          secureTextEntry={this.state.passwordIcon == 'eye' ? true : false}
          right={this._renderPasswordIcon()}
        />
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this._renderTextInputs() }
        { this.props.message != '' &&
          <Text style={[{ textAlign: 'center', marginTop: -10, color: this.props.isError ? 'red' : 'green'}, responsiveStyles.label]}>
            {this.props.message}
          </Text>
        }
      </React.Fragment>
    )
  }
}

export default ErrorAuthenticationForm;