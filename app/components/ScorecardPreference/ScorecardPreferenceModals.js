import React, { Component } from 'react';
import {LocalizationContext} from '../../components/Translations';
import ErrorMessageModal from '../ErrorMessageModal/ErrorMessageModal';
import MessageModal from '../MessageModal';
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
        {/* <ErrorMessageModal
          visible={this.props.visibleModal}
          onDismiss={() => this.props.onDismissModal('error_modal')}
          errorType={this.props.errorType}
          isNewScorecard={true}
          scorecardUuid={this.props.scorecardUuid}
        /> */}

         <ErrorAlertMessage
          visible={this.props.visibleModal}
          errorType={this.props.errorType}
          scorecardUuid={this.props.scorecardUuid}
          onDismiss={() => this.props.onDismissModal('error_modal')}
        />

        <MessageModal
          visible={this.props.visibleConfirmModal}
          onDismiss={() => this.props.onDismissModal('message_modal')}
          title={translations.theScorecardContainsAudios}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this.props.downloadScorecard()}
          child={() => this.confirmDownloadContent()}
          renderInline={false}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardPreferenceModals;