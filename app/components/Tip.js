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

export default class Tip extends Component {
  static contextType = LocalizationContext;

  renderTipIcon(scorecard) {
    return (
      <View style={[styles.statusIconWrapper]}>
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
        style={[styles.listItem, customStyle.card]}>

        { this.renderTipIcon(scorecard) }

        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Tips</Text>

          <Text style={styles.subText}>
            Before the top 5 Ratting isssues start, This tips will help CAF better facilitate
            the dicussion on how to complie or finalize the key top 5 issues/ indicator to
            move forward by giving CAF key questions/statements.
          </Text>

          <View style={styles.viewDetail}>
            <Text>{translations['viewTip']}</Text>
            <Icon name='chevron-forward-outline' style={{fontSize: 24}} />
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#3a3a3a',
    marginBottom: 6,
    fontWeight: 'bold'
  },
  subText: {
    fontSize: 16,
    flex: 1
  },
  contentWrapper: {
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1
  },
  statusIconWrapper: {
    width: 160,
    backgroundColor: Color.tipBgColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    height: 180,
    marginBottom: 20,
    flexDirection: 'row',
  },
  viewDetail: {
    height: 48,
    borderTopWidth: 1,
    borderTopColor: Color.borderColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10
  }
});
