import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import Color from '../themes/color';
import CustomStyle from '../themes/customStyle';

import { LocalizationContext } from '../components/Translations';
import uuidv4 from '../utils/uuidv4';

const badgeSize = 40;

export default class VerticalProgressStep extends Component {
  static contextType = LocalizationContext;

  _renderCard(title, index) {
    const { translations } = this.context
    let isDone = this.props.progressIndex >= index;
    let cardStyle = isDone ? {} : { backgroundColor: Color.disableCardColor };
    let titleStyle = isDone ? { color: '#626262', textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {};

    if (index == this.props.progressIndex) {
      titleStyle = { color: '#000', fontWeight: 'bold'};
    }

    return (
      <TouchableOpacity
        key={uuidv4()}
        onPress={ () => !!this.props.onPress && this.props.onPress()}
        style={[CustomStyle.card, styles.card, cardStyle]}>

        <Text style={[styles.title, titleStyle]}>{title}</Text>

        { index < this.props.progressIndex &&
          <View style={styles.viewDetail}>
            <Text>{translations['viewDetail']}</Text>
            <Icon name='chevron-forward-outline' style={{fontSize: 24}} />
          </View>
        }

        { index == this.props.progressIndex &&
          <View style={styles.btnResume}>
            <Text style={{color: '#fff', fontSize: 16}}>{translations['resume']}</Text>
          </View>
        }

      </TouchableOpacity>
    );
  }

  _renderItem(title, index) {
    let isDone = this.props.progressIndex >= index;
    let badgeIconStyle = isDone ? { backgroundColor: Color.headerColor } : {};
    let badgeIcon = isDone ? <Icon name='checkmark' style={{fontSize: 24, color: '#fff'}} /> : <Text style={{color: '#fff', fontWeight: 'bold'}}>{index + 1}</Text>

    return (
      <View style={styles.itemWrapper} key={uuidv4()}>
        <View style={[styles.badgeIcon, badgeIconStyle]}>
          { badgeIcon }
        </View>

        { this._renderCard(title, index) }
      </View>
    )
  }

  _renderLine(index) {
    let lineStyle = index < this.props.progressIndex ? { backgroundColor: Color.headerColor } : {};

    return (
      <View style={[styles.line, lineStyle]} key={uuidv4()}></View>
    )
  }

  _getData() {
    return (this.props.steps || [
      "Scorecard Setup",
      "Proposed Criteria",
      "Indicator Development Sections",
      "Top Selected Scorecard",
      "Action plan"
    ]);
  }

  _renderList() {
    let doms = [];
    let steps = this._getData();

    for(let i=0; i<steps.length; i++) {
      doms.push(this._renderItem(steps[i], i));

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
  },
  title: {
    flex: 1,
    color: '#808080',
    fontSize: 20,
    lineHeight: 24
  },
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  badgeIcon: {
    backgroundColor: '#003b5c',
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewDetail: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btnResume: {
    backgroundColor: Color.headerColor,
    height: 48,
    width: 167,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    marginLeft: 10,
    height: 80,
    alignItems: 'center',
    flex: 1,
    padding: 20,
    flexDirection: 'row'
  }
});
