import React from 'react';

import { LocalizationContext } from '../Translations';
import ErrorAlertMessage from '../Share/ErrorAlertMessage';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import scorecardProgress from '../../db/jsons/scorecardProgress';
import Scorecard from '../../models/Scorecard';
import { navigate } from '../../navigators/app_navigator';
import { MISMATCHED_ENDPOINT, SCORECARD_SUBMITTED, SCORECARD_IN_PROGRESS } from '../../constants/error_constant';

class NewScorecardModals extends React.Component {
  static contextType = LocalizationContext;
  getErrorType () {
    if (!!this.props.errorType)
      return this.props.errorType;

    if (!this.props.hasMatchedEndpoint)
      return MISMATCHED_ENDPOINT;

    return this.props.isSubmitted ? SCORECARD_SUBMITTED : SCORECARD_IN_PROGRESS;
  }

  hasConfirmButton() {
    const errorType = this.getErrorType();
    return errorType == SCORECARD_SUBMITTED || errorType == SCORECARD_IN_PROGRESS
  }

  confirmButtonAction() {
    const scorecard = Scorecard.find(this.props.scorecardUuid);
    this.props.closeModal(false);      // user clicked on view detail so the auto focus on text input is false

    if (this.getErrorType() == SCORECARD_SUBMITTED) {
      this.props.setCurrentScorecard(scorecard);
      navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.displayName});
      return;
    }

    const step = scorecardProgress[scorecard.status - 1];
    navigate(step.routeName, { scorecard_uuid: this.props.scorecardUuid, local_ngo_id: scorecard.local_ngo_id });
  }

  render() {
    const { translations } = this.context;

    return <ErrorAlertMessage
              visible={this.props.visibleModal}
              errorType={ this.getErrorType() }
              scorecardUuid={this.props.scorecardUuid}
              unlockAt={this.props.unlockAt}
              hasConfirmButton={this.hasConfirmButton()}
              confirmButtonLabel={ this.hasConfirmButton() ? translations.viewDetail : ''}
              isConfirmButtonDisabled={false}
              onDismiss={() => this.props.closeModal(true)}
              onConfirm={() => !!this.hasConfirmButton() && this.confirmButtonAction()}
           />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(NewScorecardModals);