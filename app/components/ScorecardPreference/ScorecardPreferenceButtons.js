import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import BottomButton from '../BottomButton';
import DownloadButton from '../ScorecardDetail/DownloadButton';

import scorecardPreferenceService from '../../services/scorecard_preference_service';
import authenticationFormService from '../../services/authentication_form_service';
import internetConnectionService from '../../services/internet_connection_service';
import Color from '../../themes/color';
import { containerPadding } from '../../utils/responsive_util';

class ScorecardPreferenceButtons extends Component {
  static contextType = LocalizationContext;

  isFullyDownloaded = () => {
    return scorecardPreferenceService.isFullyDownloaded(this.props.scorecardUuid, this.props.isFinishDownloaded);
  }

  renderNextButton = () => {
    if (this.isFullyDownloaded()) {
      return (
        <BottomButton label={this.context.translations.next} onPress={() => this.props.saveSelectedData()} />
      );
    }
  }

  isDownloadDisabled = () => {
    if (this.props.languages.length == 0)
      return true;

    return this.props.errorType ? false : this.props.isDownloading;
  }

  showConfirmModal = async (hasScorecardDownload) => {
    const { translations } = this.context;
    const isAuthenticated = await authenticationFormService.isAuthenticated();

    if (!this.props.hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection);
      return;
    }
    else if (!isAuthenticated) {
      this.props.errorCallback('422');
      return;
    }

    this.props.showConfirmModal(hasScorecardDownload);
  }

  renderDownloadButton = () => {
    if (this.isFullyDownloaded())
      return;

    const { translations } = this.context;
    const hasScorecardDownload = scorecardPreferenceService.hasScorecardDownload(this.props.scorecardUuid);
    const label = hasScorecardDownload ? translations.resumeDownload : translations.downloadAndSave;

    return (
      <View>
        { this.props.isErrorDownload &&
          <Text style={{textAlign: 'center', marginBottom: 5, color: Color.redColor}}>{translations.failedToDownloadScorecard}</Text>
        }

        <DownloadButton
          showDownloadProgress={this.props.isDownloading}
          downloadProgress={this.props.downloadProgress}
          disabled={this.isDownloadDisabled()}
          onPress={() => this.showConfirmModal(hasScorecardDownload)}
          label={label}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{padding: containerPadding}}>
        { this.renderDownloadButton() }

        { this.renderNextButton() }
      </View>
    )
  }
}

export default ScorecardPreferenceButtons;