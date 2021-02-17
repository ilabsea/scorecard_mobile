import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './styles/votingCriteriaListItemStyle';
import { LocalizationContext } from '../../components/Translations';
import VotingInfoModal from './VotingInfoModal';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import customStyle from '../../themes/customStyle';
import cardListItemStyle from '../../themes/cardListItemStyle';
import uuidv4 from '../../utils/uuidv4';
import Images from '../../utils/images';
import ratings from '../../db/jsons/ratings';

import { Median } from '../../utils/math';
import indicatorHelper from '../../helpers/indicator_helper';
import { getVotingInfos } from '../../helpers/voting_criteria_helper';

import { getDisplayIndicator } from '../../services/indicator_service';
import CriteriaImage from '../IndicatorDevelopment/CriteriaImage';

export default class VotingCriteriaListItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      votingInfos: [],
    };
  }

  _renderAvatar(scorecard, indicator) {
    let bgStyle = !!indicator.local_image ? { backgroundColor: 'transparent' } : {};

    return (
      <CriteriaImage
        indicator={indicator}
        width='100%'
        height='100%'
      />
    )
  }

  _renderIcon(icon, size) {
    let sizeRatio = size * 0.75;

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
          { this._renderIcon(currentIcon, 56) }
          <Text style={styles.medianText}>{translations[currentIcon.label]}</Text>
        </View>
      </View>
    )
  }

  _renderContent(indicator) {
    const { translations } = this.context;

    return (
      <View style={[cardListItemStyle.contentWrapper, { padding: 10 }]}>
        <Text style={[cardListItemStyle.h2, styles.capitalize]} numberOfLines={1}>{indicator.content || indicator.name}</Text>

        { this._renderRatingIcons() }

        <View style={{borderWidth: 0, marginTop: 18, justifyContent: 'flex-end', flexDirection: 'row'}}>
          <Text style={{fontSize: 15, color: Color.headerColor}}>{ translations.viewDetail }</Text>
          <Icon name="chevron-forward-outline" style={{ fontSize: 24, color: Color.headerColor }}/>
        </View>
      </View>
    );
  }

  showVotingDetail = (indicator) => {
    const votingInfos = getVotingInfos(indicator.scorecard_uuid, indicator.indicator_id);

    this.setState({
      modalVisible: true,
      votingInfos: votingInfos,
    })
  }

  render() {
    let scorecard = this.props.scorecard || {};
    let indicator = indicatorHelper.getDisplayIndicator(this.props.criteria);

    return (
      <TouchableOpacity onPress={() => this.showVotingDetail(indicator)}>
        <View style={[customStyle.card, {height: 140, marginBottom: 20, flexDirection: 'row',}]}>
          { this._renderAvatar(scorecard, indicator) }
          { this._renderContent(indicator) }
          { this._renderMedian() }

          <VotingInfoModal
            visible={this.state.modalVisible}
            votingInfos={this.state.votingInfos}
            scorecard={this.props.scorecard}
            onDismiss={() => this.setState({ modalVisible: false })}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
