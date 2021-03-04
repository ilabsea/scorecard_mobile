import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import Participant from '../../models/Participant'
import { getVotingParticipants } from '../../helpers/voting_criteria_helper';
import uuidv4 from '../../utils/uuidv4';

import { participantTypes } from '../../constants/participant_constant';

class VotingParticipantInfo extends Component {
  static contextType = LocalizationContext;

  _renderSummaryItem(votingScore, participantType, index) {
    let doms = [];

    if (votingScore > 0) {
      doms.push(
        <View key={uuidv4()}
          style={{flexDirection: 'row'}}
        >
          <Text style={{ fontSize: 13 }}>{ participantType }</Text>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}> ({ votingScore })</Text>

          { index < participantTypes.length -1 &&
            <Text key={uuidv4()} style={{marginTop: -3}}> | </Text>
          }
        </View>
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

      doms.push(this._renderSummaryItem(votingScore, participantType, i));
    }

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        { doms }
      </View>
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{marginBottom: 40}}>
        <Text style={{marginBottom: 5, fontFamily: FontFamily.title, fontSize: 18}}>
          { translations.votedParticipantInformation } ({Participant.getVoted(this.props.scorecard.uuid).length}): 
        </Text>
        <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
          {this._renderVotingInformation()}
        </View>
      </View>
    );
  }
}

export default VotingParticipantInfo;