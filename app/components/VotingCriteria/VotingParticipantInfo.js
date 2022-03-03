import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { VotingInfoListItem, VotingInfoListItems } from './VotingInfoListItems';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import Participant from '../../models/Participant'
import { getVotingParticipants } from '../../helpers/voting_criteria_helper';
import uuidv4 from '../../utils/uuidv4';
import { participantTypes } from '../../constants/participant_constant';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingParticipantInfo extends Component {
  static contextType = LocalizationContext;

  _renderSummaryItem(votingScore, participantType, index) {
    let doms = [];

    if (votingScore > 0) {
      doms.push(
        <VotingInfoListItem
          key={uuidv4()}
          index={index}
          typeLabel={participantType}
          score={votingScore}
          endingLabel={this.context.translations.pax}
        />
      )
    }

    return doms;
  }

  _renderVotingInformation() {
    let doms = [];
    const { translations } = this.context;
    const participantInfos = getVotingParticipants(this.props.scorecard.uuid);

    for(let i=0; i<participantInfos.length; i++) {
      const votingScore = participantInfos[i];
      const participantType = translations[participantTypes[i]];
      if (participantInfos[i] != 0)
        doms.push(this._renderSummaryItem(votingScore, participantType, i));
    }

    return <VotingInfoListItems doms={doms} />
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={[{marginBottom: 5, fontFamily: FontFamily.title}, responsiveStyles.header]}>
          { translations.numberOfVotedParticipant }: {Participant.getVoted(this.props.scorecard.uuid).length} {translations.pax} 
        </Text>
        {this._renderVotingInformation()}
      </View>
    );
  }
}

export default VotingParticipantInfo;