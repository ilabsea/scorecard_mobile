import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';
import MilestoneCard from './MilestoneCard';
import ScorecardStep from '../../models/ScorecardStep';

import { getDeviceStyle } from '../../utils/responsive_util';

const badgeSize = getDeviceStyle(40, wp('9%'));

export default class VerticalProgressStep extends Component {
  static contextType = LocalizationContext;

  onPress(step) {
    this.props.navigation.navigate(step.routeName, { scorecard_uuid: this.props.scorecard.uuid, local_ngo_id: this.props.scorecard.local_ngo_id })
  }

  _renderMilestoneCard(step) {
    const { translations } = this.context;

    return (
      <MilestoneCard
        key={uuidv4()}
        title={ translations[step.headerTitle] }
        subTitle={ this._getSubTitle(step) }
        index={ step.value }
        progressIndex={ this.props.progressIndex }
        onPress={() => this.onPress(step) }
        isScorecardFinished={this.props.scorecard.finished}
        isScorecardUploaded={this.props.scorecard.isUploaded}
      />
    )
  }

  _getSubTitle(step) {
    if (typeof this[step.getSubTitle] === "function") {
      return this[step.getSubTitle](step);
    }
  }

  getScorecardSetupSubTitle(step) {
    const { translations } = this.context;

    return `${translations.numberOfParticipant}: ${step.subTitle} ${translations.pax}`;
  }

  getProposedCriteriaSubTitle(step) {
    const { translations } = this.context;

    return `${translations.numberOfCriteria}: ${step.subTitle}`;
  }

  getIndicatorDevelopmentSubTitle(step) {
    const { translations } = this.context;

    return `${translations.numberOfCriteria}: ${step.subTitle}`;
  }

  _renderLine(index) {
    let lineStyle = index < this.props.progressIndex ? { backgroundColor: Color.headerColor } : {};

    return (
      <View style={[styles.line, lineStyle]} key={uuidv4()}></View>
    )
  }

  _renderList() {
    const { translations, appLanguage } = this.context;
    let doms = [];
    let steps = new ScorecardStep().getAllWithSubTitle(this.props.scorecard, appLanguage);

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
    height: getDeviceStyle(60, 50),
    backgroundColor: Color.verticalLineColor,
    marginLeft: badgeSize/2,
    marginTop: -10,
    marginBottom: -10
  }
});
