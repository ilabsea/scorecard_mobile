import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import { navigateBack } from '../../utils/navigation_util';

class EndpointUrlListHeader extends React.Component {
  static contextType = LocalizationContext;

  renderAddButton() {
    return (
      <TouchableOpacity>
        <Icon name='add' size={26} style={{color: 'white'}} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <React.Fragment>
        <NavigationHeader
          title='Server URL'
          rightComponent={() => this.renderAddButton()}
          onBackPress={() => navigateBack()}
          rightButtonStyle={{marginRight: 6}}
        />
      </React.Fragment>
    )
  }
}

export default EndpointUrlListHeader;