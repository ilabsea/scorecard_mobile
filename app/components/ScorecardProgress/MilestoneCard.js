import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

const badgeSize = 40;

export default class MilestoneCard extends Component {
  static contextType = LocalizationContext;

  _renderCard() {
    const { translations } = this.context;
    const { index, onPress } = this.props;
    let isDone = this._isDone();
    let cardStyle = isDone ? {} : { backgroundColor: Color.disableCardColor };
    let titleStyle = isDone ? { color: '#626262', textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {};

    if (index == this.props.progressIndex && !this.props.isScorecardFinished) {
      titleStyle = { color: '#000', fontFamily: FontFamily.title};
    }

    return (
      <TouchableOpacity
        onPress={ () => isDone && onPress()}
        style={[CustomStyle.card, styles.card, cardStyle]}>

        <Text style={[styles.title, titleStyle]}>{this.props.title}</Text>

        { (index < this.props.progressIndex || this.props.isScorecardFinished) &&
          <View style={styles.viewDetail}>
            <Text style={{color: Color.headerColor}}>{translations['viewDetail']}</Text>
            <Icon name='chevron-forward-outline' style={{fontSize: 24, color: Color.headerColor}} />
          </View>
        }

        { (index == this.props.progressIndex && !this.props.isScorecardFinished) &&
          <View style={styles.btnResume}>
            <Text style={{color: '#fff', fontSize: 16}}>{translations['resume']}</Text>
          </View>
        }
      </TouchableOpacity>
    );
  }

  _isDone() {
    return this.props.progressIndex >= this.props.index;
  }

  _isPhaseFinished() {
    if (this.props.isScorecardFinished)
      return true;

    return this.props.progressIndex > this.props.index;
  }

  _renderBadge() {
    let isPhaseFinished = this._isPhaseFinished();
    let badgeIconStyle = isPhaseFinished ? { backgroundColor: Color.headerColor } : {};
    let badgeIcon = isPhaseFinished ? <Icon name='checkmark' style={{fontSize: 24, color: '#fff'}} /> : <Text style={{color: '#fff', fontWeight: 'bold'}}>{this.props.index}</Text>

    return (
      <View style={[styles.badgeIcon, badgeIconStyle]}>
        { badgeIcon }
      </View>
    )
  }

  render() {
    return (
      <View style={styles.itemWrapper}>
        { this._renderBadge() }
        { this._renderCard() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    color: '#808080',
    fontSize: 20,
    lineHeight: 34
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
