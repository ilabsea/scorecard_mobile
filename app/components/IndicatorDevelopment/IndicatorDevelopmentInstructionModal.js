import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';
import indicatorDevelopmentHelper from '../../helpers/indicator_development_helper';
import indicatorDevelopmentInstructionModalTabletStyles from '../../styles/tablet/IndicatorDevelopmentInstructionModalComponentStyle';
import indicatorDevelopmentInstructionModalMobileStyles from '../../styles/mobile/IndicatorDevelopmentInstructionModalComponentStyle';
const styles = getDeviceStyle(indicatorDevelopmentInstructionModalTabletStyles, indicatorDevelopmentInstructionModalMobileStyles);

class IndicatordevelopmentInstructionModal extends Component {
  static contextType = LocalizationContext;

  renderCloseButton () {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => this.props.onDimiss()} style={styles.closeButton}>
            <Text style={styles.closeButtonLabel}>{ this.context.translations.infoCloseLabel }</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const imageSource = indicatorDevelopmentHelper.getInstructionImage();

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.props.onDimiss}
          contentContainerStyle={{ marginTop: indicatorDevelopmentHelper.getInstructionModalMarginTop(this.props.headerHeight) }}
        >
          <View style={styles.contentContainer}>
            <Image source={imageSource} style={styles.instructionImage} />

            { this.renderCloseButton() }
          </View>
        </Modal>
      </Portal>
    )
  }
}

export default IndicatordevelopmentInstructionModal;