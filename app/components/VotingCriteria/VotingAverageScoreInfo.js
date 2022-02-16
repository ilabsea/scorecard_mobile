import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import uuidv4 from '../../utils/uuidv4';
import { getPluralOrSingularWord } from '../../utils/translation_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingAverageScoreInfo extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      containerHeight: 0,
    };
  }

  _renderVotingInfo = () => {
    const { translations } = this.context;
    const votingInfos = this.props.votingInfos.sort((a , b) => { return b.average_score - a.average_score });
    let doms = [];

    votingInfos.map((votingInfo, index) => {
      if (votingInfo.voting_score > 0) {
        doms.push(
          this.listItem(translations[votingInfo.type], votingInfo.average_score, index)
        )
      }
    });

    if (doms.length > 0) {
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
  }

  listItem = (label, averageScore, index) => {
    const { translations, appLanguage } = this.context;

    return (
      <View key={uuidv4()} style={[{flex: 1,flexDirection: 'row', paddingVertical: 4}, index % 2 == 0 ? { marginRight: 20 } : {}]}>
        <Text style={responsiveStyles.normalText}>{ label }</Text>
        <Text style={[{marginLeft: 6, fontFamily: FontFamily.title}, responsiveStyles.normalText]}>
          ({ averageScore } { getPluralOrSingularWord(averageScore, translations.point, appLanguage, 's') })
        </Text>
      </View>
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{marginBottom: 24}}>
        <Text style={[{fontFamily: FontFamily.title}, responsiveStyles.header]}>{ translations.averageScoreByGroup }:</Text>
        { this._renderVotingInfo() }
      </View>
    );
  }
}

export default VotingAverageScoreInfo;