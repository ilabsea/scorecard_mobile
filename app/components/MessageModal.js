import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal} from 'react-native-paper';

import { LocalizationContext } from './Translations';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';

import CustomStyle from '../themes/customStyle';

class MessageModal extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}
          contentContainerStyle={CustomStyle.modalContainer}
        >
          <Text style={CustomStyle.modalTitle}>{this.props.title}</Text>
          <Text style={[CustomStyle.modalContentLabel, {marginTop: 10}]}>
            { this.props.description }
          </Text>

          <View style={CustomStyle.modalBtnWrapper}>
            <CloseButton onPress={this.props.onDismiss} label={translations.close} />
            { this.props.hasConfirmButton &&
              <SaveButton
                label={this.props.confirmButtonLabel}
                onPress={() => this.props.onPressConfirmButton()}
              />
            }
          </View>
        </Modal>
      </Portal>
    );
  }
}

export default MessageModal;