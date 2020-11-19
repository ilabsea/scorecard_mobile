import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { Icon } from 'native-base';
import uuidv4 from '../utils/uuidv4';
import Color from '../themes/color';

const badgeSize = 24;

export default class ProgressStep extends Component {
  _renderNumber(title, index) {
    let isDone = this.props.progressIndex >= index;
    let iconStyle = isDone ? {backgroundColor: '#fff'} : {};
    let titleStyle = isDone ? { color: '#fff' } : {};
    let badgeIcon = isDone ? <Icon name='checkmark' style={{fontSize: 24, color: '#e4761e'}} /> : <Text style={{color: '#fff'}}>{index + 1}</Text>

    if (index == this.props.progressIndex) {
      titleStyle['fontWeight'] = "bold";
    }

    return (
      <View style={[styles.itemWrapper]} key={uuidv4()}>
        <View style={[styles.badgeIcon, iconStyle]}>
          { badgeIcon }
        </View>

        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    )
  }

  _renderLine(index) {
    let lineStyle = index < this.props.progressIndex ? { backgroundColor: '#fff' } : {};
    return (
      <View style={[styles.line, lineStyle]} key={uuidv4()}></View>
    )
  }

  _getData() {
    return (this.props.steps || [
      "Scorecard preference",
      "Facilitator list",
      "Paticipate information",
      "Proposed Criteria"
    ]);
  }

  _renderList() {
    let doms = [];
    let steps = this._getData();

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
    width: 124,
    marginLeft: -62,
    marginRight: -62,
    marginTop: badgeSize/2,
    alignSelf: 'flex-start'
  },
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  badgeIcon: {
    backgroundColor: 'gray',
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 16,
    width: 168,
    textAlign: 'center',
    color: Color.horizontalLineColor,
  },
});
