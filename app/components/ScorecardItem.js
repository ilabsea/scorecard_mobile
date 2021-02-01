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
import scorecardProgress from '../db/jsons/scorecardProgress';
import realm from '../db/schema';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import styles from '../themes/scorecardListItemStyle';

export default class ScorecardItem extends Component {
  static contextType = LocalizationContext;

  renderStatusIcon(scorecard) {
    let wrapperStyle = scorecard.isInLastPhase ? {} : { backgroundColor: Color.headerColor };
    let iconName     = scorecard.isInLastPhase ? 'check' : 'file-alt';

    return (
      <View style={[styles.statusIconWrapper, wrapperStyle]}>
        <Icon name={iconName} type="FontAwesome5" style={{fontSize: 50, color: '#fff'}} />
        { scorecard.isUploaded && <Icon name={'lock-closed'}  style={{position: 'absolute', bottom: 6, right: 6, color: '#fff'}}/> }
      </View>
    )
  }

  render() {
    const { translations } = this.context;
    let scorecard = this.props.scorecard || {};
    let status = !!scorecard.status ? translations[scorecardProgress.filter(x => x.value == scorecard.status)[0].label] : '';
    let criteriasSize = realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecard.uuid}' DISTINCT(tag)`).length;

    return (
      <TouchableOpacity
        key={uuidV4()}
        onPress={ () => this.props.onPress() }
        style={[styles.listItem, styles.card]}>

        { this.renderStatusIcon(scorecard) }

        <View style={styles.contentWrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 20}}>
            <Text style={styles.title}>ID: {scorecard.uuid} </Text>
            <Text style={[{fontFamily: FontFamily.title, marginBottom: 8, flex: 1}]} numberOfLines={1}>({scorecard.subTitle})</Text>
          </View>

          <View style={styles.subTextWrapper}>
            <Icon name='people' style={styles.subTextIcon} />
            <Text style={styles.subText}>{translations.numberOfCriteria}: {criteriasSize}</Text>
          </View>

          <View style={styles.subTextWrapper}>
            <Icon name='document-text' style={styles.subTextIcon} />
            <Text style={styles.subText}>{translations.status}: {status}</Text>
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
