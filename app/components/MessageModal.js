import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal} from 'react-native-paper';

import { LocalizationContext } from './Translations';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';

import CustomStyle from '../themes/customStyle';

import { getDeviceStyle } from '../utils/responsive_util';
import MessageModalTabletStyles from './styles/tablet/MessageModalStyle';
import MessageModalMobileStyles from './styles/mobile/MessageModalStyle';
import PopupModalTabletStyles from '../assets/stylesheets/tablet/PopupModalStyle';
import PopupModalMobileStyles from '../assets/stylesheets/mobile/PopupModalStyle';

const responsiveStyles = getDeviceStyle(MessageModalTabletStyles, MessageModalMobileStyles);
const modalStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class MessageModal extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}
          contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.container]}
        >
          <Text style={[CustomStyle.modalTitle, modalStyles.headerTitle]}>
            {this.props.title}
          </Text>
          <Text style={[{marginTop: 10}, modalStyles.label]}>
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