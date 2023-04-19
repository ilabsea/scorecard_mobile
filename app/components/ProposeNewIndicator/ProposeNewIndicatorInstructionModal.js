import React from 'react';

import InstructionModal from '../InstructionModal';
import {getProposeNewIndicatorInstructionImage} from '../../utils/scorecard_instruction_util';
import {getDeviceStyle} from '../../utils/responsive_util';
import tabletStyle from '../../styles/tablet/ProposeNewIndicatorInstructionModalComponentStyle';
import mobileStyle from '../../styles/mobile/ProposeNewIndicatorInstructionModalComponentStyle';

const styles = getDeviceStyle(tabletStyle, mobileStyle)

class ProposeNewIndicatorInstructionModal extends React.Component {
  render() {
    return <InstructionModal
              visible={this.props.visible}
              onDismiss={() => this.props.onDismiss()}
              imageStyle={styles.image}
              imageSource={getProposeNewIndicatorInstructionImage(this.props.isIndicatorBase)}
              customCloseButtonContainerStyle={styles.closeButtonContainer}
              closeButtonLabelStyle={{textAlign: 'center'}}
            />
  }
}

export default ProposeNewIndicatorInstructionModal