import React from 'react';

import { LocalizationContext } from '../Translations';
import HeaderWithDiscardAlert from '../Share/HeaderWithDiscardAlert';

import endpointFormHelper from '../../helpers/endpoint_form_helper';

class AddNewEndpointUrlHeader extends React.Component {
  static contextType = LocalizationContext;

  hasDiscardAlert() {
    return !!this.props.endpoint && (!!this.props.endpoint.label || !!this.props.endpoint.value);
  }

  render() {
    return <HeaderWithDiscardAlert
              title={this.context.translations.newServerURL}
              onGoBack={() => endpointFormHelper.setNewEndpointAdded(false)}
              hasDiscardAlert={() => this.hasDiscardAlert()}
            />
  }
}

export default AddNewEndpointUrlHeader;