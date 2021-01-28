import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { Icon } from 'native-base';
import uuidv4 from '../utils/uuidv4';
import Color from '../themes/color';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import { LocalizationContext } from './Translations';

const badgeSize = 24;
export default class ProgressStep extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      itemWidth: 0
    }
    this.titleWidth = this.props.steps ? 120 : 145;
    this.lineWidth = this.titleWidth - 40;
  }

  _renderNumber(title, index) {
    let isDone = this.props.progressIndex >= index;
    let iconStyle = isDone ? {backgroundColor: '#fff'} : {};
    let titleStyle = isDone ? { color: '#fff' } : {};
    let badgeIcon = isDone ? <Icon name='checkmark' style={{fontSize: 24, color: '#e4761e'}} /> : <Text style={{color: '#fff'}}>{index + 1}</Text>

    if (index == this.props.progressIndex) {
      titleStyle['fontFamily'] = FontFamily.title;
    }

    let wrapperStyle = this.props.steps.length > 4 ? { width: '20%' } : {};

    return (
      <View style={[styles.itemWrapper, wrapperStyle]} key={uuidv4()}>
        <View style={[styles.badgeIcon, iconStyle]}>
          { badgeIcon }
        </View>

        <Text style={[styles.title, titleStyle, {width: this.titleWidth}]}>{title}</Text>
      </View>
    )
  }

  _renderLine(index) {
    let lineBackgroundColor = index < this.props.progressIndex ? { backgroundColor: '#fff' } : {};
    let lineStyle = {width: this.lineWidth, marginHorizontal: -(this.lineWidth/2)};
    return (
      <View style={[styles.line, lineStyle, lineBackgroundColor]} key={uuidv4()}></View>
    )
  }

  _buildDefaultStep() {
    const { translations } = this.context;

    let steps = [
      "scorecardPreference",
      "facilitatorList",
      "participantInformation",
      "proposedCriteria"
    ]

    return steps.map(step => translations[step]);
  }

  _renderList() {
    let doms = [];
    let steps = this.props.steps || this._buildDefaultStep();

    for(let i=0; i<steps.length; i++) {
      doms.push(this._renderNumber(steps[i], i));

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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  line: {
    height: 2,
    backgroundColor: Color.horizontalLineColor,
    marginTop: badgeSize/2,
    alignSelf: 'flex-start'
  },
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  badgeIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.27)',
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    paddingTop: 2,
    paddingHorizontal: 2,
    fontSize: 15,
    textAlign: 'center',
    color: Color.horizontalLineColor,
  },
});
