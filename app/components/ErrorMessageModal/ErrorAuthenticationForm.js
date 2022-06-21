import React from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import TextFieldInput from '../Share/TextFieldInput';
import ModalBottomButtons from '../Share/InfoModal/ModalBottomButtons';
import { pressableItemSize } from '../../utils/component_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorAuthenticationForm extends React.Component {
  static contextType = LocalizationContext;

  _renderShowPasswordIcon = () => {
    const buttonPadding = 2;

    return (
      <TextInput.Icon
        name={this.props.showPasswordIcon}
        color="#959595"
        onPress={() => this.props.toggleShowPassword()}
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
          secureTextEntry={this.props.showPasswordIcon == 'eye' ? true : false}
          right={this._renderShowPasswordIcon()}
        />
      </React.Fragment>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        { this._renderTextInputs() }
        { this.props.message != '' &&
          <Text style={[{ textAlign: 'center', marginTop: -10, color: this.props.isError ? 'red' : 'green'}, responsiveStyles.label]}>
            {this.props.message}
          </Text>
        }

        <ModalBottomButtons
          onClose={this.props.onDismiss}
          closeButtonLabel={translations.close}
          onConfirm={() => this.props.save()}
          confirmButtonLabel={translations.save}
          isConfirmButtonDisabled={!this.props.isValidForm || this.props.isLoading || this.props.isLocked}
          hasConfirmButton={true}
        />
      </React.Fragment>
    )
  }
}

export default ErrorAuthenticationForm;