import React from 'react';
import { View } from 'react-native';
import { Modal, Portal} from 'react-native-paper';

import CustomStyle from '../../themes/customStyle';
import CustomAlertMessageHeader from './CustomAlertMessage/CustomAlertMessageHeader';
import CustomAlertMessageMain from './CustomAlertMessage/CustomAlertMessageMain';
import CustomAlertMessageButtons from './CustomAlertMessage/CustomAlertMessageButtons';

import { getDeviceStyle } from '../../utils/responsive_util';
import MessageModalTabletStyles from '../../styles/tablet/MessageModalComponentStyle';
import MessageModalMobileStyles from '../../styles/mobile/MessageModalComponentStyle';

const responsiveStyles = getDeviceStyle(MessageModalTabletStyles, MessageModalMobileStyles);

class CustomAlertMessage extends React.Component {
  renderButtons() {
    return <CustomAlertMessageButtons
              onClose={this.props.onClose}
              closeButtonLabel={this.props.closeButtonLabel}
              hasConfirmButton={this.props.hasConfirmButton}
              confirmButtonLabel={this.props.confirmButtonLabel}
              isConfirmButtonDisabled={this.props.isConfirmButtonDisabled}
              onConfirm={() => this.props.onConfirm()}
            />
  }

  render() {
    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}
          contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.container]}
        >
          <View>
            <CustomAlertMessageHeader title={this.props.title} iconName={this.props.iconName} />
            <CustomAlertMessageMain description={this.props.description} />
            { this.renderButtons() }
          </View>
        </Modal>
      </Portal>
    )
  }
}

export default CustomAlertMessage;