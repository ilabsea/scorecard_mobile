import React from 'react';
import { Modal, Portal} from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import ModalHeader from '../Share/InfoModal/ModalHeader';
import ReLoginMessageModalBody from './ReLoginMessageModalBody';
import ReLoginMessageModalFooter from './ReLoginMessageModalFooter';

import CustomStyle from '../../themes/customStyle';
import { getDeviceStyle } from '../../utils/responsive_util';
import MessageModalTabletStyles from '../../styles/tablet/MessageModalComponentStyle';
import MessageModalMobileStyles from '../../styles/mobile/MessageModalComponentStyle';

const responsiveStyles = getDeviceStyle(MessageModalTabletStyles, MessageModalMobileStyles);

class ReLoginMessageModal extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.container]}>
          <ModalHeader title={this.context.translations.reLoginRequired} />
          <ReLoginMessageModalBody />
          <ReLoginMessageModalFooter onDismiss={() => this.props.onDismiss()} />
        </Modal>
      </Portal>
    )
  }
}

export default ReLoginMessageModal;