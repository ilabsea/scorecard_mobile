import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { LocalizationContext } from '../components/Translations';
import { Icon } from 'native-base';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import cardListItemStyle from '../themes/cardListItemStyle';

export default class Tip extends Component {
  static contextType = LocalizationContext;

  renderTipIcon(scorecard) {
    return (
      <View style={[cardListItemStyle.statusIconWrapper]}>
        <Icon name={'lightbulb'} type="FontAwesome5" style={{fontSize: 50, color: '#fff'}} />
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};
    const { translations } = this.context;

    return (
      <TouchableOpacity
        onPress={ () => !!this.props.onPress && this.props.onPress() }
        style={[cardListItemStyle.listItem, customStyle.card]}>

        { this.renderTipIcon(scorecard) }

        <View style={cardListItemStyle.contentWrapper}>
          <Text style={cardListItemStyle.h1}>Tips</Text>

          <Text style={cardListItemStyle.paragraph}>
            Before the top 5 Ratting isssues start, This tips will help CAF better facilitate
            the dicussion on how to complie or finalize the key top 5 issues/ indicator to
            move forward by giving CAF key questions/statements.
          </Text>

          <View style={cardListItemStyle.viewDetail}>
            <Text>{translations['viewTip']}</Text>
            <Icon name='chevron-forward-outline' style={{fontSize: 24}} />
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}
