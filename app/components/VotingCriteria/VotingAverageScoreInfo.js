import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { VotingInfoListItem, VotingInfoListItems } from './VotingInfoListItems';
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

    if (doms.length > 0)
      return <VotingInfoListItems doms={doms} />
  }

  listItem = (label, averageScore, index) => {
    const { translations, appLanguage } = this.context;

    return (
      <VotingInfoListItem
        key={uuidv4()}
        index={index}
        typeLabel={label}
        score={averageScore}
        endingLabel={getPluralOrSingularWord(averageScore, translations.point, appLanguage, 's')}
      />
    )
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