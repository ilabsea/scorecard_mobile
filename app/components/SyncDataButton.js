import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import Color from '../themes/color';
import { LocalizationContext } from './Translations'
import { pressableItemSize } from '../utils/component_util';
import internetConnectionService from '../services/internet_connection_service';

class SyncDataButton extends Component {
  static contextType = LocalizationContext;

  onPress() {
    NetInfo.fetch().then(state => {
      state.isConnected ? this.props.syncData() : internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection)
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress()}
        style={{borderWidth: 0, width: pressableItemSize(), height: pressableItemSize(), alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon name='sync' size={27} color={Color.whiteColor} />
      </TouchableOpacity>
    )
  }
}

export default SyncDataButton;