import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info'

import { LocalizationContext } from '../Translations'
import SyncDataButton from '../SyncDataButton';
import ScorecardService from '../../services/scorecardService';
import {getErrorType} from '../../services/api_service';
import Scorecard from '../../models/Scorecard';
import { ERROR_SOMETHING_WENT_WRONG } from '../../constants/error_constant';

class ScorecardDetailSyncButton extends Component {
  static contextType = LocalizationContext;

  componentWillUnmount() {
    this.isAbleToShowConnectionMessage = false;
  }

  syncScorecardDetail() {
    const scorecardService = new ScorecardService();
    this.props.updateLoadingStatus(true);
    this.isAbleToShowConnectionMessage = true;
    this.isTimeout = false;

    scorecardService.find(this.props.scorecardUuid, (responseData) => {
      if (responseData === null && !this.isTimeout) {
        // Show popup message when scorecard is not exist
        this.isAbleToShowConnectionMessage = false;
        this.handleRequestError(ERROR_SOMETHING_WENT_WRONG);
      }
      else {
        this.isAbleToShowConnectionMessage = false;
        Scorecard.upsert(responseData);
        this.props.finishSyncData();
      }
    }, (error) => {
      if (!this.isTimeout) {
        this.isAbleToShowConnectionMessage = false;
        this.handleRequestError(getErrorType(error.status));
      }
    });
  }

  showSomethingWentWrong() {
    if (this.isAbleToShowConnectionMessage) {
      this.isTimeout = true;
      this.handleRequestError(ERROR_SOMETHING_WENT_WRONG);
    }
  }

  handleRequestError(errorType) {
    this.props.updateLoadingStatus(false);
    this.props.showErrorMessage(errorType);
  }

  render() {
    return (
      <SyncDataButton syncData={() => this.syncScorecardDetail()}
        label={ DeviceInfo.isTablet() ? this.context.translations.syncInfo : '' }
        customStyle={{ marginRight: 9 }}
        showSomethingWentWrong={() => this.showSomethingWentWrong()}
      />
    )
  }
}

export default ScorecardDetailSyncButton;