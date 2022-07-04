import React from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import MessageModal from '../MessageModal';

class SettingURlEndpointDeleteModal extends React.Component {
  static contextType = LocalizationContext;

  boldText(label) {
    return <Text style={{fontWeight: 'bold'}}>{ label }</Text>
  }

  render() {
    const { translations } = this.context;
    const endpointLabel = this.boldText(this.props.endpointToDelete.label)
    const endpointValue = this.boldText(this.props.endpointToDelete.value)

    return <MessageModal
            visible={this.props.visible}
            onDismiss={() => this.props.onDismiss()}
            description={translations.formatString(translations.doYouWantToDeleteThisServerUrl, endpointLabel, endpointValue)}
            hasConfirmButton={true}
            confirmButtonLabel={translations.ok}
            onPressConfirmButton={() => this.props.deleteEndpoint()}
          />
  }
}

export default SettingURlEndpointDeleteModal;