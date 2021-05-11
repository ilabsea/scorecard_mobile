import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

  listItem = (label, averageScore, type) => {
    const { translations, appLanguage } = this.context;

    return (
      <View key={uuidv4()} style={{flex: 1, maxHeight: 35}}>
        <View style={{flexDirection: 'row'}}>
        <Text style={responsiveStyles.normalText}>{ label }</Text>
        <Text style={[{marginLeft: 10, fontFamily: FontFamily.title}, responsiveStyles.normalText]}>
          ({ averageScore } { getPluralOrSingularWord(averageScore, translations.point, appLanguage, 's') })
        </Text>
        </View>
      </View>
    );
  }

  _renderInfo = (type) => {
    const { translations } = this.context;
    const labels = type == 'first-col' ? ['female', 'disability', 'minority'] : ['poor', 'youth'];

    let doms = [];

    for(let i=0; i<labels.length; i++) {
      const votingInfo = this.props.votingInfos.filter(info => info.type == labels[i])[0];

      if (votingInfo.average_score > 0 ) {
        doms.push(
          this.listItem(translations[labels[i]], votingInfo.average_score, type)
        );
      }
    }

    if (doms.length > 0) {
      return (
        <View style={[styles.sectionContainer]}>
          {doms}
        </View>
      );
    }
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{marginBottom: 40}}>
        <Text style={[{fontFamily: FontFamily.title}, responsiveStyles.header]}>{ translations.averageScoreByGroup }:</Text>
        <View style={{ flexDirection: 'row', height: 120 }}>
          { this._renderInfo('first-col') }
          { this._renderInfo('second-col') }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
  }
});

export default VotingAverageScoreInfo;