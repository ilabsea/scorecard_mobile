import React, { Component } from 'react';

import { LocalizationContext } from '../Translations';
import InstructionModal from '../InstructionModal';

import { getDeviceStyle } from '../../utils/responsive_util';
import {
  getIndicatorDevelopmentInstructionImage,
  getIndicatorDevelopmentInstructionModalMarginTop,
} from '../../utils/scorecard_instruction_util';

import indicatorDevelopmentInstructionModalTabletStyles from '../../styles/tablet/IndicatorDevelopmentInstructionModalComponentStyle';
import indicatorDevelopmentInstructionModalMobileStyles from '../../styles/mobile/IndicatorDevelopmentInstructionModalComponentStyle';
const styles = getDeviceStyle(indicatorDevelopmentInstructionModalTabletStyles, indicatorDevelopmentInstructionModalMobileStyles);

class IndicatordevelopmentInstructionModal extends Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <InstructionModal
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        contentContainerStyle={{ marginTop: getIndicatorDevelopmentInstructionModalMarginTop(this.props.headerHeight) }}
        containerStyle={styles.contentContainer}
        imageStyle={styles.instructionImage}
        imageSource={getIndicatorDevelopmentInstructionImage()}
      />
    )
  }
}

export default IndicatordevelopmentInstructionModal;