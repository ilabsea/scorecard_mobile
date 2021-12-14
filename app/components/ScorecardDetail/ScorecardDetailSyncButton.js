import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info'

import { LocalizationContext } from '../Translations'
import SyncDataButton from '../SyncDataButton';
import ScorecardService from '../../services/scorecardService';
import {getErrorType} from '../../services/api_service';
import Scorecard from '../../models/Scorecard';
import { ERROR_SCORECARD } from '../../constants/error_constant';

class ScorecardDetailSyncButton extends Component {
  static contextType = LocalizationContext;

  syncScorecardDetail() {
    const scorecardService = new ScorecardService();
    this.props.updateLoadingStatus(true);

    scorecardService.find(this.props.scorecardUuid, (responseData) => {
      if (responseData === null) {
        // Show popup message when scorecard is not exist
        this.props.updateLoadingStatus(false);
        this.props.showErrorMessage(ERROR_SCORECARD);
      }
      else {
        Scorecard.upsert(responseData);
        this.props.finishSyncData();
      }
    }, (error) => {
      this.props.updateLoadingStatus(false);
      this.props.showErrorMessage(getErrorType(error.status));
    });
  }

  render() {
    return <SyncDataButton syncData={() => this.syncScorecardDetail()} label={ DeviceInfo.isTablet() ? this.context.translations.syncInfo : '' } />
  }
}

export default ScorecardDetailSyncButton;