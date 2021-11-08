import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

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

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingCriteriaListItemTabletStyles from '../../styles/tablet/VotingCriteriaListItemComponentStyle';
import VotingCriteriaListItemMobileStyles from '../../styles/mobile/VotingCriteriaListItemComponentStyle';

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
    let containerDirectionStyle = !this.props.criteria.median && DeviceInfo.isTablet() ? { flexDirection: 'row' } : {};
    let viewMoreContainerStyle = !this.props.criteria.median ? styles.viewMoreContainer : styles.borderedViewMoreContainer;
    if (!DeviceInfo.isTablet())
      viewMoreContainerStyle = styles.viewMoreContainer;

    return (
      <View style={[cardListItemStyle.contentWrapper, { padding: 10, paddingTop: 10, paddingBottom: 16, paddingRight: 0}, containerDirectionStyle]}>
        <View style={{flex: 1}}>
          <Text style={[cardListItemStyle.h2, styles.capitalize, styles.indicatorNameLabel]} numberOfLines={1}>
            {this.props.criteria.order}. {indicator.content || indicator.name}
          </Text>

          { this._renderRatingIcons() }
        </View>

        { this.props.criteria.median &&
          <View style={viewMoreContainerStyle}>
            <Text style={styles.viewMoreLabel}>{ translations.viewDetail }</Text>
            <Icon name="chevron-forward-outline" style={styles.viewMoreIcon}/>
          </View>
        }
      </View>
    );
  }

  showVotingDetail = (indicator) => {
    const indicatorId = indicatorHelper.getIndicatorId(indicator);
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
          { this._renderContent(indicator) }
          { this._renderMedian() }

          <VotingInfoModal
            visible={this.state.modalVisible}
            votingInfos={this.state.votingInfos}
            scorecard={this.props.scorecard}
            onDismiss={() => this.setState({ modalVisible: false })}
            indicator={this.state.selectedIndicator}
            criteria={this.props.criteria}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
