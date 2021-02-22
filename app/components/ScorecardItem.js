import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import { LocalizationContext } from '../components/Translations';
import { Icon } from 'native-base';
import Color from '../themes/color';
import uuidV4 from '../utils/uuidv4';
import scorecardProgress from '../db/jsons/scorecardProgress';
import realm from '../db/schema';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import styles from '../themes/scorecardListItemStyle';

import scorecardService from '../services/scorecardService';

export default class ScorecardItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.itemRef = null;
  }

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

  deleteScorecard = () => {
    this.props.showDeleteModal();
    this.itemRef.close();
  }

  renderDeleteAction = () => {
    const { translations } = this.context;

    return (
      <RectButton
        onPress={() => this.deleteScorecard()}
        style={{ backgroundColor: 'red', maxHeight: 160, width: 80, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{color: 'white'}}>{ translations.delete }</Text>
      </RectButton>
    )
  }

  render() {
    const { translations } = this.context;
    let scorecard = this.props.scorecard || {};
    let status = !!scorecard.status ? translations[scorecardProgress.filter(x => x.value == scorecard.status)[0].label] : '';
    let criteriasSize = realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecard.uuid}' DISTINCT(tag)`).length;

    return (
      <Swipeable
        ref={ref => { this.itemRef = ref }}
        key={uuidV4()}
        enabled={!scorecard.isUploaded}
        renderRightActions={this.renderDeleteAction}
        containerStyle={{ backgroundColor: '#fff', maxHeight: 160, marginBottom: 20}}
      >
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
      </Swipeable>
    )
  }
}
