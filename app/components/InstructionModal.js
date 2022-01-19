import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { LocalizationContext } from './Translations';
import { getDeviceStyle } from '../utils/responsive_util';
import instructionModalTabletStyles from '../styles/tablet/InstructionModalComponentStyle';
import instructionModalMobileStyles from '../styles/mobile/InstructionModalComponentStyle';

const styles = getDeviceStyle(instructionModalTabletStyles, instructionModalMobileStyles);

class InstructionModal extends React.Component {
  static contextType = LocalizationContext;

  renderCloseButton () {
    return (
      <View style={styles.buttonContainer}>
        <View style={[styles.closeButtonContainer, this.props.customCloseButtonContainerStyle]}>
          <TouchableOpacity onPress={() => this.props.onDismiss()} style={styles.closeButton}>
            <Text style={styles.closeButtonLabel}>{ this.context.translations.infoCloseLabel }</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => this.props.onDismiss()}
          contentContainerStyle={this.props.contentContainerStyle}
        >
          <View style={this.props.containerStyle}>
            <Image source={this.props.imageSource} style={this.props.imageStyle} />

            { this.renderCloseButton() }
          </View>
        </Modal>
      </Portal>
    )
  }
}

export default InstructionModal;