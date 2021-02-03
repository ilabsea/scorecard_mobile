import React, { Component } from 'react';
import { View } from 'react-native';

import CloseButton from './CloseButton';
import SaveButton from './SaveButton';

import CustomStyle from '../themes/customStyle';

class ModalConfirmationButtons extends Component {
  render() {
    return(
      <View style={[CustomStyle.modalBtnWrapper]}>
        <CloseButton
          onPress={() => this.props.onClose()}
          label={this.props.closeButtonLabel}
        />

        <SaveButton
          disabled={this.props.isConfirmButtonDisabled}
          onPress={() => this.props.onConfirm()}
          label={this.props.confirmButtonLabel}
        />
      </View>
    );
  }
}

export default ModalConfirmationButtons;