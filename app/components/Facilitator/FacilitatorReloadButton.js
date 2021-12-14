import React, { Component } from 'react';

import SyncDataButton from '../SyncDataButton';
import { loadCaf } from '../../services/caf_service';

class FacilitatorReloadButton extends Component {
  fetchFaciliators() {
    this.props.updateLoadingStatus(true);
    loadCaf(this.props.localNgoId, (res, phase) => {
      this.props.reloadFacilitators();
      this.props.updateLoadingStatus(false);
    }, (error) => {
      this.props.updateLoadingStatus(false);
    });
  }

  render() {
    return <SyncDataButton syncData={() => this.fetchFaciliators()} />
  }
}

export default FacilitatorReloadButton;