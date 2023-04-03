import React, {Component} from 'react';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorInfoList from './ProposedIndicatorInfoList';

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

    return (
      <View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingTitle, responsiveStyles.headingTitle]}>
            { translations.numberOfParticipant }: { Participant.getAllByScorecard(this.props.scorecardUuid).length } {translations.pax}
            { this.renderAnonymous() }
          </Text>

          <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
            <ParticipantInfo
              title={translations.proposeTheIndicator}
              participants={Participant.getNotRaised(this.props.scorecardUuid)}
              scorecardUuid={ this.props.scorecardUuid }
              buttonVisible={proposedParticipants.length > 0}
              mode={{type: 'button', label: translations.proposeNewIndicator, iconName: 'plus'}}
              selectParticipant={(participant) => navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant.uuid})}
              closeModal={() => this.closeModal()}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
            />
          </View>
        </View>

        <ProposedIndicatorInfoList
          scorecardUuid={this.props.scorecardUuid}
          proposedParticipants={proposedParticipants}
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