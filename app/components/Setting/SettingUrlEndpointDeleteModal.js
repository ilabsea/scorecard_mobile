import React from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import CustomAlertMessage from '../Share/CustomAlertMessage';

class SettingURlEndpointDeleteModal extends React.Component {
  static contextType = LocalizationContext;

  boldText(label) {
    return <Text style={{fontWeight: 'bold'}}>{ label }</Text>
  }

  render() {
    const { translations } = this.context;
    const endpointLabel = this.boldText(this.props.endpointToDelete.label)
    const endpointValue = this.boldText(this.props.endpointToDelete.value)

    return <CustomAlertMessage
              visible={this.props.visible}
              title={translations.deleteServerUrl}
              description={translations.formatString(translations.doYouWantToDeleteThisServerUrl, endpointLabel, endpointValue)}
              closeButtonLabel={translations.buttonLabelNo}
              hasConfirmButton={true}
              confirmButtonLabel={translations.ok}
              isConfirmButtonDisabled={false}
              onDismiss={() => this.props.onDismiss()}
              onConfirm={() => this.props.deleteEndpoint()}
           />
  }
}

export default SettingURlEndpointDeleteModal;