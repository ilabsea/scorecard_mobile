import React from 'react';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';

import { navigateBack } from '../../utils/navigation_util';
import endpointFormService from '../../services/endpoint_form_service';

class AddNewEndpointUrlHeader extends React.Component {
  static contextType = LocalizationContext;

  state = {
    title: 'newServerURL'
  }

  async componentDidMount() {
    const selectedEndpoint = await endpointFormService.getEndpointForEdit();
    this.setState({ title: !!selectedEndpoint ? 'editServerUrl' : 'newServerURL' });
  }

  onBackPress() {
    endpointFormService.clearEndpointForEdit();
    navigateBack();
  }

  render() {
    return (
      <React.Fragment>
        <NavigationHeader
          title={ this.context.translations[this.state.title] }
          onBackPress={() => this.onBackPress()}
          rightButtonStyle={{marginRight: 6}}
        />
      </React.Fragment>
    )
  }
}

export default AddNewEndpointUrlHeader;