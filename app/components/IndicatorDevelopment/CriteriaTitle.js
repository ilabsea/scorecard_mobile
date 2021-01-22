import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PlaySound from '../VotingCriteria/PlaySound';

import styles from '../../themes/scorecardListItemStyle';

class CriteriaTitle extends Component {
  render() {
    return (
      <View style={[this.props.customContainerStyle, {flexDirection: 'row'}]}>
        <View style={{flex: 1, paddingRight: 20}}>
          <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
          <Text style={styles.subText}>{this.props.subText}: ({this.props.criteriaCount})</Text>
        </View>

        <View style={{paddingRight: 16, paddingBottom: 16, justifyContent: 'flex-start'}}>
          <PlaySound filePath={this.props.indicator.local_audio}/>
        </View>
      </View>
    );
  }
}

export default CriteriaTitle;