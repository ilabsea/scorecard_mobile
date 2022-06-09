import React from 'react';

import { LocalizationContext } from '../Translations';
import HeaderWithDiscardAlert from '../Share/HeaderWithDiscardAlert';

import endpointFormHelper from '../../helpers/endpoint_form_helper';

class AddNewEndpointUrlHeader extends React.Component {
  static contextType = LocalizationContext;

  hasDiscardAlert() {
    const { endpointLabel, endpointValue } = this.props.bodyRef.current?.inputFormRef.current?.state;
    return !!endpointLabel || !!endpointValue
  }

  render() {
    return <HeaderWithDiscardAlert
              title={this.context.translations.newServerURL}
              onGoBack={() => endpointFormHelper.clearHasNewEndpointAdded()}
              hasDiscardAlert={() => this.hasDiscardAlert()}
            />
  }
}

export default AddNewEndpointUrlHeader;