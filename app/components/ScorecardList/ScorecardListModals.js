import React, { Component } from 'react';

import CustomAlertMessage from '../Share/CustomAlertMessage';
import ErrorAlertMessage from '../Share/ErrorAlertMessage';
import BoldLabel from '../Share/BoldLabel';
import ScorecardListInstructionModal from './ScorecardListInstructionModal';
import { LocalizationContext } from '../Translations';
import { ERROR_AUTHENTICATION } from '../../constants/error_constant';

class ScorecardListModals extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const scorecardUuid = <BoldLabel label={this.props.scorecardUuid} />
    const title = this.props.isConfirmModal ? translations.deleteTheScorecard : translations.unableToDeleteTheScorecard;
    const description = this.props.isConfirmModal ?
                          translations.formatString(translations.doYouWantToDeleteThisScorecard, scorecardUuid)
                          : translations.formatString(translations.cannotDeleteThisScorecard, scorecardUuid);

    return (
      <React.Fragment>
        <CustomAlertMessage
          visible={this.props.visibleConfirmModal}
          title={title}
          description={description}
          closeButtonLabel={this.props.isConfirmModal ? translations.close : translations.infoCloseLabel}
          hasConfirmButton={this.props.isConfirmModal}
          confirmButtonLabel={translations.ok}
          isConfirmButtonDisabled={this.props.isDeleting}
          onDismiss={() => this.props.onConfirmModalDismiss()}
          onConfirm={() => this.props.confirmDelete()}
        />

        <ErrorAlertMessage
          visible={this.props.visibleErrorModal}
          errorType={ERROR_AUTHENTICATION}
          scorecardUuid={this.props.scorecardUuid}
          onDismiss={() => this.props.onErrorModalDismiss()}
        />

        <ScorecardListInstructionModal headerHeight={this.props.headerHeight} scorecards={this.props.scorecards} />
      </React.Fragment>
    )
  }
}

export default ScorecardListModals;