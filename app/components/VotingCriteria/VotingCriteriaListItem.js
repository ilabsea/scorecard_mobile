import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import VotingInfoModal from './VotingInfoModal';
import { Icon } from 'native-base';
import customStyle from '../../themes/customStyle';
import cardListItemStyle from '../../themes/cardListItemStyle';
import uuidv4 from '../../utils/uuidv4';
import Images from '../../utils/images';
import ratings from '../../db/jsons/ratings';

import { Median } from '../../utils/math';
import indicatorHelper from '../../helpers/indicator_helper';
import { getVotingInfos } from '../../helpers/voting_criteria_helper';

import CriteriaImage from '../IndicatorDevelopment/CriteriaImage';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingCriteriaListItemTabletStyles from './styles/tablet/VotingCriteriaListItemStyle';
import VotingCriteriaListItemMobileStyles from './styles/mobile/VotingCriteriaListItemStyle';

const styles = getDeviceStyle(VotingCriteriaListItemTabletStyles, VotingCriteriaListItemMobileStyles);

export default class VotingCriteriaListItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      votingInfos: [],
      selectedIndicator: null,
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
    const iconSize = getDeviceStyle(28, 20);

    return (
      <View key={uuidv4()} style={[styles.ratingItem]}>
        { this._renderIcon(icon, iconSize) }

        <Text style={styles.ratingCount}>{this.props.criteria[icon.countMethodName]}</Text>
      </View>
    )
  }

  _renderRatingIcons() {
    let icons = ratings;

    return (
      <View style={styles.ratingIconContainer}>
        { icons.map(icon => this._renderRatingIcon(icon)) }
      </View>
    )
  }

  _renderMedian() {
    const { criteria } = this.props;
    const { translations } = this.context;

    if (!criteria.median) { return (null) }

    let currentIcon = ratings.filter(x => x.value == criteria.median)[0];
    const iconSize = getDeviceStyle(56, 38);

    return (
      <View style={styles.resultWrapper}>
        <Text style={styles.medianScoreText}>{translations.score}: {criteria.median}</Text>

        <View style={{alignItems: 'center'}}>
          { this._renderIcon(currentIcon, iconSize) }
          <Text style={styles.medianText}>{translations[currentIcon.label]}</Text>
        </View>
      </View>
    )
  }

  _renderContent(indicator) {
    const { translations } = this.context;

    return (
      <View style={[cardListItemStyle.contentWrapper, { padding: 10, paddingRight: 0, position: 'relative'}]}>
        <Text style={[cardListItemStyle.h2, styles.capitalize, styles.indicatorNameLabel]} numberOfLines={1}>
          {indicator.content || indicator.name}
        </Text>

        { this._renderRatingIcons() }

        <View style={styles.viewMoreContainer}>
          <Text style={styles.viewMoreLabel}>{ translations.viewDetail }</Text>
          <Icon name="chevron-forward-outline" style={styles.viewMoreIcon}/>
        </View>
      </View>
    );
  }

  showVotingDetail = (indicator) => {
    const indicatorId = indicator.indicator_id || indicator.uuid;
    const votingInfos = getVotingInfos(this.props.scorecard.uuid, indicatorId);

    this.setState({
      modalVisible: true,
      votingInfos: votingInfos,
      selectedIndicator: indicator,
    })
  }

  render() {
    let scorecard = this.props.scorecard || {};
    let indicator = indicatorHelper.getDisplayIndicator(this.props.criteria);

    return (
      <TouchableOpacity onPress={() => this.showVotingDetail(indicator)}>
        <View style={[customStyle.card, styles.ratingItemContainer]}>
          { this._renderAvatar(scorecard, indicator) }
          { this._renderContent(indicator) }
          { this._renderMedian() }

          <VotingInfoModal
            visible={this.state.modalVisible}
            votingInfos={this.state.votingInfos}
            scorecard={this.props.scorecard}
            onDismiss={() => this.setState({ modalVisible: false })}
            indicator={this.state.selectedIndicator}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
