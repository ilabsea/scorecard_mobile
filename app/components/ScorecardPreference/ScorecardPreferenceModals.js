import React, { Component } from 'react';
import {LocalizationContext} from '../../components/Translations';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import ErrorAlertMessage from '../Share/ErrorAlertMessage';
import BoldLabel from '../Share/BoldLabel';

import scorecardPreferenceService from '../../services/scorecard_preference_service';

class ScorecardPreferenceModals extends Component {
  static contextType = LocalizationContext;

  boldLabel(label) {
    return <BoldLabel label={label} />
  }

  render() {
    const { translations } = this.context;
    const textLocaleLabel = scorecardPreferenceService.getLocaleLabel(this.props.languages, this.props.selectedLanguage.text_locale);
    const audioLocaleLabel = scorecardPreferenceService.getLocaleLabel(this.props.languages, this.props.selectedLanguage.audio_locale);
    const descriptionQuestion = translations.formatString(translations.downloadScorecardSecondDescription, this.boldLabel(this.props.scorecardUuid), this.boldLabel(textLocaleLabel), this.boldLabel(audioLocaleLabel));

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
          description={translations.downloadScorecardFirstDescription}
          descriptionQuestion={descriptionQuestion}
          closeButtonLabel={translations.close}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          isConfirmButtonDisabled={false}
          onDismiss={() => this.props.onDismissModal('message_modal')}
          onConfirm={() => this.props.downloadScorecard()}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardPreferenceModals;