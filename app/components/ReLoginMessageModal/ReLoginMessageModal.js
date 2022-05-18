import React from 'react';
import { Modal, Portal} from 'react-native-paper';

import ReLoginMessageModalHeader from './ReLoginMessageModalHeader';
import ReLoginMessageModalBody from './ReLoginMessageModalBody';
import ReLoginMessageModalFooter from './ReLoginMessageModalFooter';

import CustomStyle from '../../themes/customStyle';
import { getDeviceStyle } from '../../utils/responsive_util';
import MessageModalTabletStyles from '../../styles/tablet/MessageModalComponentStyle';
import MessageModalMobileStyles from '../../styles/mobile/MessageModalComponentStyle';

const responsiveStyles = getDeviceStyle(MessageModalTabletStyles, MessageModalMobileStyles);

class ReLoginMessageModal extends React.Component {
  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.container]}>
          <ReLoginMessageModalHeader />
          <ReLoginMessageModalBody />
          <ReLoginMessageModalFooter onDismiss={() => this.props.onDismiss()} />
        </Modal>
      </Portal>
    )
  }
}

export default ReLoginMessageModal;