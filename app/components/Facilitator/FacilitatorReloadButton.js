import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { loadCaf } from '../../services/caf_service';

class FacilitatorReloadButton extends Component {
  fetchFaciliators() {
    console.log('local ngo id == ', this.props.localNgoId);
    this.props.updateLoadingStatus(true);

    loadCaf(this.props.localNgoId, (res, phase) => {
      console.log('== finish reload caf ===')
      this.props.reloadFacilitators();
      this.props.updateLoadingStatus(false);
    }, (error) => {
      this.props.updateLoadingStatus(false);
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