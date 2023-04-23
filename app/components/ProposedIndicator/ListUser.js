import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorInfoList from './ProposedIndicatorInfoList';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { containerPadding } from '../../utils/responsive_util';

class ListUser extends Component {
  static contextType = LocalizationContext;
  _goToCreateNewIndicator(participant_uuid) {
    const params = !!participant_uuid ? { scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant_uuid } : { scorecard_uuid: this.props.scorecardUuid };
    navigate('ProposeNewIndicator', params);
  }

  async startProposeIndicator() {
    if (await isProposeByIndicatorBase())
      this._goToCreateNewIndicator(null);
    else {
      const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: null };
      proposedIndicatorHelper.showFormModal(this.props.formModalRef, this.props.participantModalRef, proposedIndicatorParams);
    }
  }

  renderAnonymous() {
    const anonymous = Participant.getAnonymousByScorecard(this.props.scorecardUuid).length;
    if (anonymous > 0)
      return ` (${this.context.translations.anonymous} ${anonymous})`;
  }

  render() {
    const proposedParticipants = Participant.getRaisedParticipants(this.props.scorecardUuid);
    return (
      <View style={{paddingHorizontal: containerPadding}}>
        <ProposedIndicatorInfoList
          scorecardUuid={this.props.scorecardUuid}
          raisedParticipants={proposedParticipants}
          numberOfProposedParticipant={this.props.numberOfProposedParticipant}
          showModal={() => this.props.updateModalVisible(true)}
          startProposeIndicator={() => this.startProposeIndicator()}
          isIndicatorBase={this.props.isIndicatorBase}
          participantModalRef={this.props.participantModalRef}
          formModalRef={this.props.formModalRef}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);