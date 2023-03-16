import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorAccordions from './ProposedIndicatorAccordions';

import { connect } from 'react-redux';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';

import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicatorTabletStyles from '../../styles/tablet/ProposedIndicatorComponentStyle';
import ProposedIndicatorMobileStyles from '../../styles/mobile/ProposedIndicatorComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedIndicatorTabletStyles, ProposedIndicatorMobileStyles);

class ListUser extends Component {
  static contextType = LocalizationContext;

  closeModal() {
    this.props.updateModalVisible(false)
    this.props.participantModalRef.current?.dismiss();
  }

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

  renderAnonymous() {
    const anonymous = Participant.getAnonymousByScorecard(this.props.scorecardUuid).length;
    if (anonymous > 0)
      return ` (${this.context.translations.anonymous} ${anonymous})`;
  }

  render() {
    const {translations} = this.context;
    const proposedParticipants = Participant.getProposedParticipants(this.props.scorecardUuid);

    const addNewButtonTop = this.props.scrollY.interpolate({
      inputRange: [0, 100, 150],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })

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

        <ProposedIndicatorAccordions
          scorecardUuid={this.props.scorecardUuid}
          proposedParticipants={proposedParticipants}
          numberOfProposedParticipant={this.props.numberOfProposedParticipant}
          showModal={() => this.props.updateModalVisible(true)}
          startProposeIndicator={() => this.startProposeIndicator()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  headingTitle: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    color: '#22354c',
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);
