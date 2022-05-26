import React from 'react';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import MessageModal from '../MessageModal';

import { navigateBack } from '../../utils/navigation_util';
import endpointFormService from '../../services/endpoint_form_service';
import endpointFormHelper from '../../helpers/endpoint_form_helper';

class AddNewEndpointUrlHeader extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      title: 'newServerURL',
      visibleConfirmModal: false,
    }

    this.selectedEndpoint = null;
  }

  async componentDidMount() {
    this.selectedEndpoint = await endpointFormService.getEndpointForEdit();
    this.setState({ title: !!this.selectedEndpoint ? 'editServerUrl' : 'newServerURL' });
  }

  onBackPress() {
    const { endpointLabel, endpointValue } = this.props.bodyRef.current?.inputFormRef.current?.state;

    if (endpointFormHelper.hasDiscardAlert(endpointLabel, endpointValue, this.selectedEndpoint))
      this.setState({ visibleConfirmModal: true })
    else
      this.goBack();
  }

  goBack() {
    this.setState({ visibleConfirmModal: false }, () => {
      endpointFormService.clearEndpointForEdit();
      navigateBack();
    });
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={ translations[this.state.title] }
          onBackPress={() => this.onBackPress()}
          rightButtonStyle={{marginRight: 6}}
        />

        <MessageModal
          visible={this.state.visibleConfirmModal}
          onDismiss={() => this.setState({ visibleConfirmModal: false })}
          description={translations.doYouWantToDiscardTheseChanges}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this.goBack()}
        />
      </React.Fragment>
    )
  }
}

export default AddNewEndpointUrlHeader;