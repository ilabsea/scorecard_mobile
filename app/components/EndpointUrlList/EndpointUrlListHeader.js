import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import EndpointUrlForm from './EndpointUrlForm';

import { navigateBack } from '../../utils/navigation_util';

class EndpointUrlListHeader extends React.Component {
  static contextType = LocalizationContext;

  showEndpointForm() {
    this.props.formRef.current?.setBodyContent(this.renderEndpointUrlForm());
    this.props.formModalRef.current?.present();
  }

  renderEndpointUrlForm() {
    return <EndpointUrlForm saveNewEndpoint={(endpointValue) => this.saveNewEndpoint(endpointValue)}
              // editEndpoint={editEndpoint}
              // selectedEndpoint={this.state.selectedEndpoint}
              reloadEndpoint={() => this.reloadEndpoint()}
              savedEndpoint={this.props.selectedEndpoint}
           />
  }

  reloadEndpoint() {
    setTimeout(() => {
      this.props.loadEndpointUrls();
      this.props.formModalRef.current?.dismiss();
    }, 100);
  }

  renderAddButton() {
    return (
      <TouchableOpacity onPress={() => this.showEndpointForm()}>
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