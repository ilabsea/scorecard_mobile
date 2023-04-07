import React, {Component} from 'react';

import ProposedIndicatorAccordions from './ProposedIndicatorAccordions';
import { connect } from 'react-redux';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';

import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';

class ListUser extends Component {
  _goToCreateNewIndicator(participant_uuid) {
    const params = !!participant_uuid ? { scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant_uuid } : { scorecard_uuid: this.props.scorecardUuid };
    navigate('CreateNewIndicator', params);
  }

  async startProposeIndicator() {
    if (await isProposeByIndicatorBase())
      this._goToCreateNewIndicator(null);
    else {
      const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: null };
      proposedIndicatorHelper.showFormModal(this.props.formModalRef, this.props.participantModalRef, proposedIndicatorParams);
    }
  }

  render() {
    const proposedParticipants = Participant.getProposedParticipants(this.props.scorecardUuid);
    return <ProposedIndicatorAccordions
              scorecardUuid={this.props.scorecardUuid}
              proposedParticipants={proposedParticipants}
              numberOfProposedParticipant={this.props.numberOfProposedParticipant}
              showModal={() => this.props.updateModalVisible(true)}
              startProposeIndicator={() => this.startProposeIndicator()}
           />
  }
}

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);