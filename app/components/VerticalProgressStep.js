import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { LocalizationContext } from '../components/Translations';
import Color from '../themes/color';
import uuidv4 from '../utils/uuidv4';
import MilestoneCard from './MilestoneCard';
import scorecardProgress from '../db/jsons/scorecardProgress';

const badgeSize = 40;

export default class VerticalProgressStep extends Component {
  static contextType = LocalizationContext;

  _renderMilestoneCard(step) {
    const { translations } = this.context;

    return (
      <MilestoneCard
        key={uuidv4()}
        title={ translations[step.label] }
        index={ step.value }
        progressIndex={ this.props.progressIndex }
        onPress={() => this.props.navigation.navigate(step.routeName, { scorecard_uuid: this.props.scorecardUuid }) }
      />
    )
  }

  _renderLine(index) {
    let lineStyle = index < this.props.progressIndex ? { backgroundColor: Color.headerColor } : {};

    return (
      <View style={[styles.line, lineStyle]} key={uuidv4()}></View>
    )
  }

  _renderList() {
    let doms = [];
    let steps = scorecardProgress;

    for(let i=0; i<steps.length; i++) {
      doms.push(this._renderMilestoneCard(steps[i]));

      if (i < steps.length-1) {
        doms.push(this._renderLine(i))
      }
    }

    return doms
  }

  render() {
    return (
      <View style={styles.container}>
        { this._renderList() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
  },
  line: {
    width: 2,
    height: 60,
    backgroundColor: Color.verticalLineColor,
    marginLeft: badgeSize/2,
    marginTop: -10,
    marginBottom: -10
  }
});
