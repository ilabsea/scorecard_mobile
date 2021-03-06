import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PlaySound from '../VotingCriteria/PlaySound';
import { LocalizationContext } from '../Translations';

import styles from '../../themes/scorecardListItemStyle';
import { getPluralOrSingularWord } from '../../utils/translation_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class CriteriaTitle extends Component {
  static contextType = LocalizationContext;

  render() {
    const {translations, appLanguage} = this.context;

    return (
      <View style={[this.props.customContainerStyle, {flexDirection: 'row', justifyContent: 'center'}]}>
        <View style={{flex: 1, paddingRight: 20, justifyContent: 'center'}}>
          <Text style={[styles.title, this.props.customTitleStyle]} numberOfLines={2}>{this.props.title}</Text>
          <Text style={[styles.subText, this.props.customSubTextStyle]}>
            {this.props.subText}: ({this.props.criteriaCount} { getPluralOrSingularWord(this.props.criteriaCount, translations.time, appLanguage, 's') })
          </Text>
        </View>

        <View style={[{paddingRight: 10}, this.props.customAudioContainerStyle]}>
          <PlaySound filePath={this.props.indicator.local_audio}/>
        </View>
      </View>
    );
  }
}

export default CriteriaTitle;