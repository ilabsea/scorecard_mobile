import React from 'react';

import { LocalizationContext } from '../Translations';
import HeaderWithConfirmModal from '../Share/HeaderWithConfirmModal';

import { navigateBack } from '../../utils/navigation_util';
import endpointFormService from '../../services/endpoint_form_service';
import endpointFormHelper from '../../helpers/endpoint_form_helper';

class AddNewEndpointUrlHeader extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      visibleConfirmModal: false,
    }
  }

  onBackPress() {
    const { endpointLabel, endpointValue } = this.props.bodyRef.current?.inputFormRef.current?.state;

    if (!!endpointLabel || !!endpointValue)
      this.setState({ visibleConfirmModal: true })
    else
      this.goBack();
  }

  goBack() {
    this.setState({ visibleConfirmModal: false }, () => {
      endpointFormHelper.clearHasNewEndpointAdded();
      navigateBack();
    });
  }

  render() {
    const { translations } = this.context;

    return <HeaderWithConfirmModal
              title={translations.newServerURL}
              modalDescription={translations.doYouWantToDiscardTheseChanges}
              visibleConfirmModal={this.state.visibleConfirmModal}
              onBackPress={() => this.onBackPress()}
              goBack={() => this.goBack()}
              onDismiss={() => this.setState({ visibleConfirmModal: false })}
           />
  }
}

export default AddNewEndpointUrlHeader;