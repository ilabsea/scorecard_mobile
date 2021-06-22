import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal} from 'react-native-paper';

import { LocalizationContext } from './Translations';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';
import OutlineInfoIcon from './OutlineInfoIcon';

import CustomStyle from '../themes/customStyle';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import MessageModalTabletStyles from '../styles/tablet/MessageModalComponentStyle';
import MessageModalMobileStyles from '../styles/mobile/MessageModalComponentStyle';
import PopupModalTabletStyles from '../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../styles/mobile/PopupModalComponentStyle';

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
          <View style={{flexDirection: 'row'}}>
            <OutlineInfoIcon color={Color.warningColor} />

            <View style={{flex: 1, justifyContent: 'center'}}>
              { this.props.title &&
                <View style={{height: 48, justifyContent: 'center'}}>
                  <Text style={[CustomStyle.modalTitle, modalStyles.headerTitle]}>
                    {this.props.title}
                  </Text>
                </View>
              }

              <View style={{marginTop: 0, flexDirection: 'row', flexWrap: 'wrap'}}>
                { !this.props.child &&
                  <Text style={[modalStyles.label]}>
                    { this.props.description }
                  </Text>
                }
              </View>

              { (this.props.child && this.props.renderInline) &&
                <View style={{marginTop: 0, flexDirection: 'row', flexWrap: 'wrap'}}>
                  { this.props.child() }
                </View>
              }
            </View>
          </View>

          { (this.props.child && !this.props.renderInline) &&
            this.props.child()
          }

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