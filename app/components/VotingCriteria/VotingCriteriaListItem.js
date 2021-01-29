import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import customStyle from '../../themes/customStyle';
import cardListItemStyle from '../../themes/cardListItemStyle';
import uuidv4 from '../../utils/uuidv4';
import Images from '../../utils/images';
import ratings from '../../db/jsons/ratings';
import { Median } from '../../utils/math';
import { getDisplayIndicator } from '../../services/indicator_service';
import CustomStyle from '../../themes/customStyle';

export default class VotingCriteriaListItem extends Component {
  static contextType = LocalizationContext;

  _renderAvatar(scorecard, indicator) {
    let bgStyle = !!indicator.local_image ? { backgroundColor: 'transparent' } : {};

    return (
      <View style={[cardListItemStyle.statusIconWrapper, styles.avatarContainer, bgStyle]}>
        { !!indicator.local_image &&
          <ImageBackground source={{uri: `file://${indicator.local_image}`}} style={{width: '99%', height: '99%'}} resizeMode='contain' />
        }
      </View>
    )
  }

  _renderIcon(icon, size) {
    let sizeRatio = size * 0.8;

    return (
      <Image source={Images[icon.image]} style={{width: sizeRatio, height: sizeRatio, maxWidth: size, maxHeight: size}} />
    )
  }

  _renderRatingIcon(icon) {
    return (
      <View key={uuidv4()} style={styles.ratingItem}>
        { this._renderIcon(icon, 28) }

        <Text style={styles.ratingCount}>{this.props.criteria[icon.countMethodName]}</Text>
      </View>
    )
  }

  _renderRatingIcons() {
    let icons = ratings;

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        { icons.map(icon => this._renderRatingIcon(icon)) }
      </View>
    )
  }

  _renderMedian() {
    const { criteria } = this.props;
    const { translations } = this.context;

    if (!criteria.median) { return (null) }

    let currentIcon = ratings.filter(x => x.value == criteria.median)[0];

    return (
      <View style={styles.resultWrapper}>
        <Text style={{fontSize: 14}}>{translations.score}: {criteria.median}</Text>

        <View style={{alignItems: 'center'}}>
          { this._renderIcon(currentIcon, 60) }
          <Text style={styles.medianText}>{translations[currentIcon.label]}</Text>
        </View>
      </View>
    )
  }

  _renderContent(indicator) {
    return (
      <View style={[cardListItemStyle.contentWrapper, { padding: 10 }]}>
        <Text style={[cardListItemStyle.h2, styles.capitalize]} numberOfLines={1}>{indicator.content || indicator.name}</Text>

        { this._renderRatingIcons() }
      </View>
    );
  }

  render() {
    let scorecard = this.props.scorecard || {};
    let indicator = getDisplayIndicator(this.props.criteria);

    return (
      <View style={[customStyle.card, {height: 140, marginBottom: 20, flexDirection: 'row',}]}>
        { this._renderAvatar(scorecard, indicator) }
        { this._renderContent(indicator) }
        { this._renderMedian() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ratingItem: {
    width: '25%',
    maxWidth: 57,
    paddingVertical: 2,
    flexDirection: 'row',
    marginRight: 6,
    backgroundColor: '#d8d8d8',
    borderRadius: 15,
    alignItems: 'center',
    paddingLeft: 6,
    marginTop: 6
  },
  ratingCount: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  resultWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    borderLeftWidth: 1,
    borderColor: Color.borderColor,
  },
  medianText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 4,
    color: Color.headerColor,
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  avatarContainer: {
    backgroundColor: Color.cardListItemAvataBg,
    width: '17%',
  }
})
