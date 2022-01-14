import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import Color from '../themes/color';
import { LocalizationContext } from './Translations'
import { pressableItemSize } from '../utils/component_util';
import internetConnectionService from '../services/internet_connection_service';
import {checkConnection} from '../services/api_service';

class SyncDataButton extends Component {
  static contextType = LocalizationContext;

  onPress() {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        this.props.syncData();

        // If the sync request is taking too long (20 seconds), it will show a something when wrong message
        checkConnection((type, message) => {
          this.props.showSomethingWentWrong();
        });
      }
      else
        internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection)
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress()}
        style={[{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: pressableItemSize(), width: this.props.label ? 'auto' : pressableItemSize() },
                this.props.customStyle]}
      >
        <Icon name='sync' size={27} color={Color.whiteColor} />

        { !!this.props.label && <Text style={{color: Color.whiteColor, marginLeft: 4, fontSize: 19}}>{ this.props.label }</Text>}
      </TouchableOpacity>
    )
  }
}

export default SyncDataButton;