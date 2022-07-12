import React from 'react';
import { Modal, Portal} from 'react-native-paper';

import CustomStyle from '../../themes/customStyle';
import CustomAlertMessageHeader from './CustomAlertMessage/CustomAlertMessageHeader';
import CustomAlertMessageMain from './CustomAlertMessage/CustomAlertMessageMain';
import CustomAlertMessageButtons from './CustomAlertMessage/CustomAlertMessageButtons';

import { getDeviceStyle } from '../../utils/responsive_util';
import CustomAlertMessageTabletStyles from '../../styles/tablet/CustomAlertMessageComponentStyle';
import CustomAlertMessageMobileStyles from '../../styles/mobile/CustomAlertMessageComponentStyle';

const responsiveStyles = getDeviceStyle(CustomAlertMessageTabletStyles, CustomAlertMessageMobileStyles);

class CustomAlertMessage extends React.Component {
  renderButtons() {
    return <CustomAlertMessageButtons
              onClose={this.props.onDismiss}
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
          <CustomAlertMessageHeader title={this.props.title} iconName={this.props.iconName} />
          { !!this.props.description &&
            <CustomAlertMessageMain description={this.props.description} descriptionBottomSection={this.props.descriptionBottomSection} />
          }
          { this.props.children }
          { !!this.props.customButton ? this.props.customButton : this.renderButtons() }
        </Modal>
      </Portal>
    )
  }
}

export default CustomAlertMessage;

// How to use this component
{/* <CustomAlertMessage
  visible={boolean}
  title={string}
  description={string}
  iconName={string}  // [default = 'exclamation']
  closeButtonLabel={string}
  hasConfirmButton={boolean}  // [default = false]
  confirmButtonLabel={string}  // [optional]
  isConfirmButtonDisabled={boolean}  // [optional]
  onDismiss={function()}
  onConfirm={function()}  // [optional]
/> */}