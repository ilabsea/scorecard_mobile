import React, { Component } from 'react';

import ErrorMessageModal from '../ErrorMessageModal/ErrorMessageModal';
import ScorecardInfoModal from './ScorecardInfoModal';

class NewScorecardModals extends Component {
  render() {
    return (
      <React.Fragment>
        <ErrorMessageModal
          visible={this.props.visibleErrorModal}
          onDismiss={() => this.props.closeModal(true)}
          errorType={this.props.errorType}
          isNewScorecard={true}
          scorecardUuid={this.props.scorecardUuid}
        />

        <ScorecardInfoModal
          visible={this.props.visibleInfoModal}
          navigation={this.props.navigation}
          onDismiss={(hasAutoFocus) => this.props.closeModal(hasAutoFocus)}
          isSubmitted={this.props.isSubmitted}
          scorecardUuid={this.props.scorecardUuid}
          setCurrentScorecard={(scorecard) => this.props.setCurrentScorecard(scorecard)}
        />
      </React.Fragment>
    )
  }
}

export default NewScorecardModals;