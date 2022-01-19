import React, { Component } from 'react';
import { Text } from 'react-native';

import MessageModal from '../MessageModal';
import ErrorMessageModal from '../ErrorMessageModal/ErrorMessageModal';
import ScorecardListInstructionModal from './ScorecardListInstructionModal';
import { LocalizationContext } from '../Translations';
import { ERROR_AUTHENTICATION } from '../../constants/error_constant';

class ScorecardListModals extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const scorecardUuid = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>
    const modalMessage = this.props.isConfirmModal ?
                          translations.formatString(translations.doYouWantToDeleteThisScorecard, scorecardUuid)
                          : translations.formatString(translations.cannotDeleteThisScorecard, scorecardUuid);

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

        <ScorecardListInstructionModal headerHeight={this.props.headerHeight} scorecards={this.props.scorecards} />
      </React.Fragment>
    )
  }
}

export default ScorecardListModals;