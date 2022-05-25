import React from 'react';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';

import { navigateBack } from '../../utils/navigation_util';

class AddNewEndpointUrlHeader extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <React.Fragment>
        <NavigationHeader
          title={ this.context.translations.addNewServerURL }
          onBackPress={() => navigateBack()}
          rightButtonStyle={{marginRight: 6}}
        />
      </React.Fragment>
    )
  }
}

export default AddNewEndpointUrlHeader;