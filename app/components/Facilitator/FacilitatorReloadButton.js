import React, { Component } from 'react';
import SyncDataButton from '../SyncDataButton';
import { loadCaf } from '../../services/caf_service';
import { ERROR_SOMETHING_WENT_WRONG } from '../../constants/error_constant';

class FacilitatorReloadButton extends Component {
  componentWillUnmount() {
    this.isAbleToShowConnectionMessage = false;
  }

  fetchFaciliators() {
    this.props.updateLoadingStatus(true);
    this.isAbleToShowConnectionMessage = true;
    this.isTimeout = false;

    loadCaf(this.props.localNgoId, (res, phase) => {
      this.isAbleToShowConnectionMessage = false;
      this.props.reloadFacilitators();
      this.props.updateLoadingStatus(false);
    }, (error) => {
      if (!this.isTimeout) {
        this.isAbleToShowConnectionMessage = false;
        this.handleRequestError();
      }
    });
  }

  showSomethingWentWrong() {
    if (this.isAbleToShowConnectionMessage) {
      this.isTimeout = true;
      this.handleRequestError();
    }
  }

  handleRequestError() {
    this.props.updateLoadingStatus(false);
    this.props.showErrorMessage(ERROR_SOMETHING_WENT_WRONG);
  }

  render() {
    return (
      <SyncDataButton syncData={() => this.fetchFaciliators()}
        showSomethingWentWrong={() => this.showSomethingWentWrong()}
      />
    )
  }
}

export default FacilitatorReloadButton;