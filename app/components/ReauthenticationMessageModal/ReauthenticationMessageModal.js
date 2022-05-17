import React from 'react';
import { Modal, Portal} from 'react-native-paper';

import ReauthenticationMessageModalHeader from './ReauthenticationMessageModalHeader';
import ReauthenticationMessageModalBody from './ReauthenticationMessageModalBody';
import ReauthenticationMessageModalFooter from './ReauthenticationMessageModalFooter';

import CustomStyle from '../../themes/customStyle';
import { getDeviceStyle } from '../../utils/responsive_util';
import MessageModalTabletStyles from '../../styles/tablet/MessageModalComponentStyle';
import MessageModalMobileStyles from '../../styles/mobile/MessageModalComponentStyle';

const responsiveStyles = getDeviceStyle(MessageModalTabletStyles, MessageModalMobileStyles);

class ReauthenticationMessageModal extends React.Component {
  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.container]}>
          <ReauthenticationMessageModalHeader />
          <ReauthenticationMessageModalBody />
          <ReauthenticationMessageModalFooter onDismiss={() => this.props.onDismiss()} />
        </Modal>
      </Portal>
    )
  }
}

export default ReauthenticationMessageModal;