import React from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import MessageModal from '../MessageModal';

class SettingURlEndpointDeleteModal extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const endpointLabel = <Text style={{fontWeight: 'bold'}}>{ this.props.endpointToDelete.label }</Text>
    const endpointValue = <Text style={{fontWeight: 'bold'}}>{ this.props.endpointToDelete.value }</Text>

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