import React, { Component } from 'react';
import { View } from 'react-native';

import CloseButton from '../../CloseButton';
import SaveButton from '../../SaveButton';

import CustomStyle from '../../../themes/customStyle';
import { bodyFontSize } from '../../../utils/font_size_util';

class CustomAlertMessageButtons extends Component {
  render() {
    return(
      <View style={[CustomStyle.modalBtnWrapper]}>
        <CloseButton
          onPress={() => this.props.onClose()}
          label={this.props.closeButtonLabel}
        />

        { this.props.hasConfirmButton &&
          <SaveButton
            disabled={this.props.isConfirmButtonDisabled}
            onPress={() => this.props.onConfirm()}
            label={this.props.confirmButtonLabel}
            labelStyle={{fontSize: bodyFontSize()}}
          />
        }
      </View>
    );
  }
}

export default CustomAlertMessageButtons;