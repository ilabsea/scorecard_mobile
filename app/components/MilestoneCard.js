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

const badgeSize = 40;

export default class MilestoneCard extends Component {
  static contextType = LocalizationContext;

  _renderCard() {
    const { translations } = this.context;
    const { index, onPress } = this.props;
    let isDone = this._isDone();
    let cardStyle = isDone ? {} : { backgroundColor: Color.disableCardColor };
    let titleStyle = isDone ? { color: '#626262', textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {};

    if (index == this.props.progressIndex) {
      titleStyle = { color: '#000', fontWeight: 'bold'};
    }

    return (
      <TouchableOpacity
        onPress={ () => isDone && onPress()}
        style={[CustomStyle.card, styles.card, cardStyle]}>

        <Text style={[styles.title, titleStyle]}>{this.props.title}</Text>

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

  _isDone() {
    return this.props.progressIndex >= this.props.index;
  }

  _renderBadge() {
    let isDone = this._isDone();
    let badgeIconStyle = isDone ? { backgroundColor: Color.headerColor } : {};
    let badgeIcon = isDone ? <Icon name='checkmark' style={{fontSize: 24, color: '#fff'}} /> : <Text style={{color: '#fff', fontWeight: 'bold'}}>{this.props.index + 1}</Text>

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
