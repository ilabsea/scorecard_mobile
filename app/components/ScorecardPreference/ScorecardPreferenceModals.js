import React, { Component } from 'react';
import {LocalizationContext} from '../../components/Translations';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import ErrorAlertMessage from '../Share/ErrorAlertMessage';
import ScorecardPreferenceConfirmDownloadContent from './ScorecardPreferenceConfirmDownloadContent';

class ScorecardPreferenceModals extends Component {
  static contextType = LocalizationContext;

  confirmDownloadContent() {
    return (
      <ScorecardPreferenceConfirmDownloadContent
        scorecardUuid={this.props.scorecardUuid}
        languages={this.props.languages}
        selectedLanguage={this.props.selectedLanguage}
      />
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <ErrorAlertMessage
          visible={this.props.visibleModal}
          errorType={this.props.errorType}
          scorecardUuid={this.props.scorecardUuid}
          onDismiss={() => this.props.onDismissModal('error_modal')}
        />

        <CustomAlertMessage
          visible={this.props.visibleConfirmModal}
          title={translations.theScorecardContainsAudios}
          closeButtonLabel={translations.close}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          isConfirmButtonDisabled={false}
          onDismiss={() => this.props.onDismissModal('message_modal')}
          onConfirm={() => this.props.downloadScorecard()}
        >
          { this.confirmDownloadContent() }
        </CustomAlertMessage>
      </React.Fragment>
    )
  }
}

export default ScorecardPreferenceModals;