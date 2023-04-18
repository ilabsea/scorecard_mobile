import React, {Component} from 'react';
import { connect } from 'react-redux';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorInfoList from './ProposedIndicatorInfoList';
import PressableParticipantInfo from '../Share/PressableParticipantInfo';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';

import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';

class ListUser extends Component {
  static contextType = LocalizationContext;
  _goToCreateNewIndicator(participant_uuid) {
    const params = !!participant_uuid ? { scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant_uuid } : { scorecard_uuid: this.props.scorecardUuid };
    // navigate('CreateNewIndicator', params);
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

  renderList = (proposedParticipants) => {
    return <ProposedIndicatorInfoList
              scorecardUuid={this.props.scorecardUuid}
              raisedParticipants={proposedParticipants}
              numberOfProposedParticipant={this.props.numberOfProposedParticipant}
              showModal={() => this.props.updateModalVisible(true)}
              startProposeIndicator={() => this.startProposeIndicator()}
              isIndicatorBase={this.props.isIndicatorBase}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
           />
  }

  render() {
    const {translations} = this.context;
    const proposedParticipants = Participant.getRaisedParticipants(this.props.scorecardUuid);

    return (
      <View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingTitle, responsiveStyles.headingTitle]}>
            { translations.numberOfParticipant }: { Participant.getAllByScorecard(this.props.scorecardUuid).length } {translations.pax}
            { this.renderAnonymous() }
          </Text>

          <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
            <PressableParticipantInfo
              title={translations.proposeTheIndicator}
              participants={Participant.getNotRaised(this.props.scorecardUuid)}
              scorecardUuid={ this.props.scorecardUuid }
              buttonVisible={proposedParticipants.length > 0}
              mode={{type: 'button', label: translations.proposeNewIndicator, iconName: 'plus'}}
              selectParticipant={(participant) => navigate('ProposeNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant.uuid})}
              closeModal={() => this.closeModal()}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
            />
          </View>
        </View>
        {this.renderList(proposedParticipants)}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);