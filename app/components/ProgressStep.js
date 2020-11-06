import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Icon } from 'native-base';

import uuidv4 from '../utils/uuidv4';

const badgeSize = 24;
const inActiveColor = '#8affffff';

export default class ProgressStep extends Component {
  _renderNumber(title, index) {
    let isDone = this.props.progressIndex >= index;
    let iconStyle = isDone ? [styles.numberIcon, styles.doneIcon] : styles.numberIcon;
    let titleStyle = isDone ? { color: '#fff' } : {};

    if (index == this.props.progressIndex) {
      titleStyle['fontWeight'] = "bold";
    }

    return (
      <View style={styles.numberWrapper} key={uuidv4()}>
        <View style={iconStyle}>
          { isDone &&
            <Icon name='checkmark' style={{fontSize: 24, color: '#e4761e'}} />
          }

          { !isDone &&
            <Text style={{color: '#fff'}}>{index + 1}</Text>
          }
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
    flex: 1,
    height: 2,
    backgroundColor: inActiveColor,
    margin: 5
  },
  numberWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',
  },
  numberIcon: {
    backgroundColor: 'gray',
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    position: 'absolute',
    width: 100,
    top: (badgeSize + 4),
    left: -44,
    textAlign: 'center',
    color: inActiveColor,
  },
  doneIcon: {
    backgroundColor: '#fff',
  }
});
