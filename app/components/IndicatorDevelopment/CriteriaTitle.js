import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import PlaySound from '../VotingCriteria/PlaySound';
import { LocalizationContext } from '../Translations';

import styles from '../../themes/scorecardListItemStyle';
import { getPluralOrSingularWord } from '../../utils/translation_util';

class CriteriaTitle extends Component {
  static contextType = LocalizationContext;

  renderCriteriaTitle() {
    const {translations, appLanguage} = this.context;
    const content = (
      <React.Fragment>
        <Text style={[styles.title, this.props.customTitleStyle]} numberOfLines={2}>{this.props.title}</Text>
        <Text style={[styles.subText, this.props.customSubTextStyle]}>
          {this.props.subText}: ({this.props.criteriaCount} { getPluralOrSingularWord(this.props.criteriaCount, translations.time, appLanguage, 's') })
        </Text>
      </React.Fragment>
    );
    const containerStyles = {flex: 1, paddingRight: 20, justifyContent: 'center'};

    if (this.props.isDraggable) {
      return (
        <TouchableOpacity onLongPress={() => this.props.onLongPress()} style={containerStyles}>
          { content }
        </TouchableOpacity>
      );
    }

    return ( <View style={containerStyles}>{ content }</View> );
  }

  render() {
    return (
      <View style={[this.props.customContainerStyle, {flexDirection: 'row', justifyContent: 'center'}]}>
        { this.renderCriteriaTitle() }

        <View style={[{paddingRight: 10}, this.props.customAudioContainerStyle]}>
          <PlaySound filePath={this.props.indicator.local_audio}/>
        </View>
      </View>
    );
  }
}

export default CriteriaTitle;