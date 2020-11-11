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
import uuidV4 from '../utils/uuidv4';

export default class ScorecardItem extends Component {
  static contextType = LocalizationContext;

  renderStatusIcon(scorecard) {
    let isCompleted  = scorecard.status == 'complete';
    let wrapperStyle = isCompleted ? {} : { backgroundColor: Color.headerColor };
    let iconName     = isCompleted ? 'check' : 'file-alt';

    return (
      <View style={[styles.statusIconWrapper, wrapperStyle]}>
        <Icon name={iconName} type="FontAwesome5" style={{fontSize: 50, color: '#fff'}} />
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};
    const { translations } = this.context;

    return (
      <TouchableOpacity
        key={uuidV4()}
        onPress={ () => this.props.onPress() }
        style={[styles.listItem, styles.card]}>

        { this.renderStatusIcon(scorecard) }

        <View style={styles.contentWrapper}>
          <Text style={styles.title}>ID: {scorecard.name}</Text>

          <View style={styles.subTextWrapper}>
            <Icon name='people' style={styles.subTextIcon} />
            <Text style={styles.subText}>Number of indicator: 20</Text>
          </View>

          <View style={styles.subTextWrapper}>
            <Icon name='document-text' style={styles.subTextIcon} />
            <Text style={styles.subText}>Status: {scorecard.status}</Text>
          </View>

          <View style={{flex: 1}}></View>

          <View style={styles.viewDetail}>
            <Text style={{color: Color.headerColor}}>{translations['viewDetail']}</Text>
            <Icon name='chevron-forward-outline' style={{fontSize: 24, color: Color.headerColor}} />
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
    fontSize: 20,
    color: '#3a3a3a',
    marginBottom: 6,
  },
  subTextWrapper: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center'
  },
  subText: {
    marginLeft: 8,
    fontSize: 14
  },
  subTextIcon: {
    fontSize: 24,
    color: Color.subText
  },
  contentWrapper: {
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1
  },
  statusIconWrapper: {
    width: 160,
    backgroundColor: '#787878',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    height: 160,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 4,
    flexDirection: 'row',
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  viewDetail: {
    height: 48,
    borderTopWidth: 1,
    borderTopColor: Color.borderColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
