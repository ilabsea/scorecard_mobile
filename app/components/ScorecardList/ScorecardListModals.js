import React, { Component } from 'react';

import MessageModal from '../MessageModal';
import ErrorMessageModal from '../ErrorMessageModal/ErrorMessageModal';
import { LocalizationContext } from '../Translations';
import { ERROR_AUTHENTICATION } from '../../constants/error_constant';

class ScorecardListModals extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const modalMessage = this.props.isConfirmModal ?
                          translations.formatString(translations.doYouWantToDeleteThisScorecard, this.props.scorecardUuid)
                          : translations.formatString(translations.cannotDeleteThisScorecard, this.props.scorecardUuid);

    return (
      <React.Fragment>
        <MessageModal
          visible={this.props.visibleConfirmModal}
          onDismiss={() => this.props.onConfirmModalDismiss()}
          description={modalMessage}
          hasConfirmButton={this.props.isConfirmModal}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this.props.confirmDelete()}
        />

        <ErrorMessageModal
          visible={this.props.visibleErrorModal}
          onDismiss={() => this.props.onErrorModalDismiss()}
          errorType={ERROR_AUTHENTICATION}
          isNewScorecard={false}
          scorecardUuid={this.props.scorecardUuid}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardListModals;