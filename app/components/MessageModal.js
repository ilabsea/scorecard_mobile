import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Portal} from 'react-native-paper';

import { LocalizationContext } from './Translations';
import CloseButton from './CloseButton';
import ActionButton from './ActionButton';

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
          contentContainerStyle={styles.container}
        >
          <Text style={CustomStyle.modalTitle}>{translations.locked}</Text>
          <Text stle={{marginTop: 10}}>
            { translations.alreadyUploaded }
          </Text>

          <View style={CustomStyle.modalBtnWrapper}>
            <CloseButton onPress={this.props.onDismiss} label={translations.close} />
            { this.props.hasActionButton &&
              <ActionButton
                label={this.props.actionButtonLabel}
                onPress={() => this.props.onPressActionButton()}
              />
            }
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
});

export default MessageModal;