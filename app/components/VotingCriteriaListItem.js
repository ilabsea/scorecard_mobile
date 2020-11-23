import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { LocalizationContext } from '../components/Translations';
import { Icon } from 'native-base';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import cardListItemStyle from '../themes/cardListItemStyle';
import uuidv4 from '../utils/uuidv4';
import Images from '../utils/images';

export default class VotingCriteriaListItem extends Component {
  static contextType = LocalizationContext;

  _renderAvata(scorecard) {
    return (
      <View style={[cardListItemStyle.statusIconWrapper, { backgroundColor: Color.cardListItemAvataBg }]}>
        <Text style={{fontSize: 60}}>A</Text>
      </View>
    )
  }

  _renderIcon(icon, size) {
    return (
      <Image source={Images[icon.image]} style={{width: size, height: size}} />
    )
  }

  _renderRatingIcon(icon) {
    return (
      <View key={uuidv4()} style={styles.ratingItem}>
        { this._renderIcon(icon, 28) }

        <Text style={styles.ratingCount}>{icon.count}</Text>
      </View>
    )
  }

  _iconData() {
    return ([
      { image: 'very_bad', count: '1', median: 'Very Bad' },
      { image: 'bad', count: '2', median: 'Bad' },
      { image: 'acceptable', count: '3', median: 'Acceptable' },
      { image: 'good', count: '4', median: 'Good' },
      { image: 'very_good', count: '5', median: 'Very Good' },
    ]);
  }

  _renderRatingIcons() {
    let icons = this._iconData();

    return (
      <View style={{flexDirection: 'row'}}>
        { icons.map(icon => this._renderRatingIcon(icon)) }
      </View>
    )
  }

  _renderMedian() {
    let currentIcon = this._iconData()[4];

    return (
      <View style={styles.medianWrapper}>
        { this._renderIcon(currentIcon, 60) }
        <Text style={styles.medianText}>{currentIcon.median}</Text>
      </View>
    )
  }

  _renderContent() {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={cardListItemStyle.h2}>Criteria A</Text>

          { this._renderRatingIcons() }
        </View>

        { this._renderMedian() }
      </View>
    );
  }

  _renderViewDetail() {
    const { translations } = this.context;

    return (
      <View style={cardListItemStyle.viewDetail}>
        <Text>{translations['viewDetail']}</Text>
        <Icon name='chevron-forward-outline' style={{fontSize: 24}} />
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};

    return (
      <TouchableOpacity
        onPress={ () => !!this.props.onPress && this.props.onPress() }
        style={[cardListItemStyle.listItem, customStyle.card, {height: 160}]}>

        { this._renderAvata(scorecard) }

        <View style={cardListItemStyle.contentWrapper}>
          { this._renderContent() }
          { this._renderViewDetail() }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  ratingItem: {
    width: 57,
    height: 34,
    flexDirection: 'row',
    marginRight: 8,
    backgroundColor: '#d8d8d8',
    borderRadius: 15,
    alignItems: 'center',
    paddingLeft: 6,
    marginTop: 12
  },
  ratingCount: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  medianWrapper: {
    alignItems: 'center',
    marginRight: 16
  },
  medianText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4
  }
})