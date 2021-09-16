import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import { loadCaf } from '../../services/caf_service';
import internetConnectionService from '../../services/internet_connection_service';
import { LocalizationContext } from '../Translations'

class FacilitatorReloadButton extends Component {
  static contextType = LocalizationContext;

  fetchFaciliators() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.props.updateLoadingStatus(true);
        loadCaf(this.props.localNgoId, (res, phase) => {
          this.props.reloadFacilitators();
          this.props.updateLoadingStatus(false);
        }, (error) => {
          this.props.updateLoadingStatus(false);
        });
      }
      else
        internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.fetchFaciliators()}
        style={{marginBottom: 9, marginRight: 10}}
      >
        <MaterialIcon name='sync' size={27} color="white" />
      </TouchableOpacity>
    )
  }
}

export default FacilitatorReloadButton;