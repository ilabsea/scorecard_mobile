import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import Participant from '../../models/Participant'
import { getVotingParticipants } from '../../helpers/voting_criteria_helper';
import uuidv4 from '../../utils/uuidv4';

import { participantTypes } from '../../constants/participant_constant';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingParticipantInfo extends Component {
  static contextType = LocalizationContext;

  _renderSummaryItem(votingScore, participantType, index) {
    const { translations } = this.context;
    let doms = [];

    if (votingScore > 0) {
      // doms.push(
      //   <View key={uuidv4()}
      //     style={{flexDirection: 'row'}}
      //   >
      //     <Text style={responsiveStyles.normalText}>{ participantType }</Text>
      //     <Text style={[responsiveStyles.normalText, { fontFamily: FontFamily.title }]}> ({ votingScore } {translations.pax})</Text>

      //     { index < participantTypes.length -1 &&
      //       <Text key={uuidv4()} style={{marginTop: -3}}> | </Text>
      //     }
      //   </View>
      // )

      doms.push(
        <View key={uuidv4()} style={[{flex: 1,flexDirection: 'row', paddingVertical: 4}, index % 2 == 0 ? { marginRight: 20 } : {}]}>
          <Text style={responsiveStyles.normalText}>{ participantType }</Text>
          <Text style={[{marginLeft: 6, fontFamily: FontFamily.title}, responsiveStyles.normalText]}>
            ({ votingScore } {translations.pax})
          </Text>
        </View>
      )
    }

    return doms;
  }

  _renderVotingInformation() {
    let doms = [];
    const { translations } = this.context;
    const participantInfos = getVotingParticipants(this.props.scorecard.uuid);

    // for(let i=0; i<participantInfos.length; i++) {
    //   const votingScore = participantInfos[i];
    //   const participantType = translations[participantTypes[i]];

    //   doms.push(this._renderSummaryItem(votingScore, participantType, i));
    // }

    // return (
    //   <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    //     { doms }
    //   </View>
    // );

    for(let i=0; i<participantInfos.length; i++) {
      const votingScore = participantInfos[i];
      const participantType = translations[participantTypes[i]];
      if (participantInfos[i] != 0)
        doms.push(this._renderSummaryItem(votingScore, participantType, i));
    }

    return (
      <View style={{paddingLeft: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {doms[0]}
          {doms[1]}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {doms[2]}
          {doms[3]}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {doms[4]}
        </View>
      </View>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={[{marginBottom: 5, fontFamily: FontFamily.title}, responsiveStyles.header]}>
          { translations.numberOfVotedParticipant }: {Participant.getVoted(this.props.scorecard.uuid).length} {translations.pax} 
        </Text>
        {/* <View style={{flexDirection: 'row', paddingHorizontal: 10}}> */}
          {this._renderVotingInformation()}
        {/* </View> */}
      </View>
    );
  }
}

export default VotingParticipantInfo;