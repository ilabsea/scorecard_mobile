import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
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
    return (
      <View style={[cardListItemStyle.statusIconWrapper, { backgroundColor: Color.cardListItemAvataBg }]}>
        { !!indicator.local_image &&
          <Image source={{uri: `file://${indicator.local_image}`}} style={{width: 130, height: 130}} resizeMode={'contain'} />
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
        <Text style={{marginRight: 8, fontSize: 14}}>{translations.result}:</Text>

        <View style={styles.medianWrapper}>
          { this._renderIcon(currentIcon, 60) }
          <Text style={styles.medianText}>{translations[currentIcon.label]}</Text>
        </View>
      </View>
    )
  }

  _renderContent(indicator) {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, backgroundColor: ''}}>
          <Text style={[cardListItemStyle.h2, styles.capitalize]} numberOfLines={1}>{indicator.content || indicator.name}</Text>

          { this._renderRatingIcons() }
        </View>

        <View style={{ borderLeftWidth: 1, borderColor: Color.borderColor, justifyContent: 'center'}}>
          { this._renderMedian() }
        </View>
      </View>
    );
  }

  render() {
    let scorecard = this.props.scorecard || {};
    let indicator = getDisplayIndicator(this.props.criteria);

    return (
      <TouchableOpacity
        onPress={ () => !!this.props.onPress && this.props.onPress() }
        style={[cardListItemStyle.listItem, customStyle.card, {minHeight: 138}]}>

        { this._renderAvatar(scorecard, indicator) }

        <View style={cardListItemStyle.contentWrapper}>
          { this._renderContent(indicator) }
        </View>
      </TouchableOpacity>
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
  medianWrapper: {
    alignItems: 'center',
    marginRight: 8,
  },
  resultWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
    width: 100
  },
  medianText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
    color: Color.headerColor,
  },
  capitalize: {
    textTransform: 'capitalize'
  }
})
