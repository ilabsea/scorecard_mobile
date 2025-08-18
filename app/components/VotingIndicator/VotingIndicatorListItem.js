import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';

import { LocalizationContext } from '../../components/Translations';
import VotingIndicatorListIcons from './VotingIndicatorListIcons';
import VotingIndicatorListMedian from './VotingIndicatorListMedian';

import customStyle from '../../themes/customStyle';
import cardListItemStyle from '../../themes/cardListItemStyle';

import indicatorHelper from '../../helpers/indicator_helper';
import votingInfoModalHelper from '../../helpers/voting_info_modal_helper';
import { isVotingIndicatorRated } from '../../helpers/voting_indicator_helper';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingIndicatorListItemTabletStyles from '../../styles/tablet/VotingIndicatorListItemComponentStyle';
import VotingIndicatorListItemMobileStyles from '../../styles/mobile/VotingIndicatorListItemComponentStyle';

const styles = getDeviceStyle(VotingIndicatorListItemTabletStyles, VotingIndicatorListItemMobileStyles);

export default class VotingIndicatorListItem extends Component {
  static contextType = LocalizationContext;

  _renderContent(indicator) {
    const { translations } = this.context;
    let containerDirectionStyle = !this.props.indicator.median && DeviceInfo.isTablet() ? { flexDirection: 'row' } : {};
    let viewMoreContainerStyle = !this.props.indicator.median ? styles.viewMoreContainer : styles.borderedViewMoreContainer;
    if (!DeviceInfo.isTablet())
      viewMoreContainerStyle = styles.viewMoreContainer;

    return (
      <View style={[cardListItemStyle.contentWrapper, { padding: 10, paddingTop: 10, paddingBottom: 16, paddingRight: 0}, containerDirectionStyle]}>
        <View style={{flex: 1}}>
          <Text style={[cardListItemStyle.h2, styles.capitalize, styles.indicatorNameLabel]} numberOfLines={1}>
            {this.props.indicator.order}. {indicator.content || indicator.name}
          </Text>

          <VotingIndicatorListIcons indicator={this.props.indicator} />
        </View>

        { this.props.indicator.median &&
          <View style={viewMoreContainerStyle}>
            <Text style={styles.viewMoreLabel}>{ translations.viewDetail }</Text>
            <Icon name="chevron-forward-outline" style={styles.viewMoreIcon}/>
          </View>
        }
      </View>
    );
  }

  showVotingDetail = (indicator) => {
    const bodyContent = votingInfoModalHelper.getModalContent(this.props.scorecard, indicator, this.props.indicator, this.context.translations);
    const votingInfoSnapPoints = votingInfoModalHelper.getModalSnapPoints(this.props.scorecard.uuid, this.props.indicator.indicatorable_id);
    const modalSnapPoints = isVotingIndicatorRated(this.props.indicator.uuid) ? votingInfoSnapPoints : ['18%'];

    this.props.infoModalRef.current?.setBodyContent(bodyContent.first_content, bodyContent.second_content);
    this.props.infoModalRef.current?.setSnapPoints(modalSnapPoints);

    setTimeout(() => {
      this.props.votingInfoModalRef.current?.present();
    }, 50);
  }

  render() {
    let indicator = indicatorHelper.getDisplayIndicator(this.props.indicator);

    return (
      <TouchableOpacity onPress={() => this.showVotingDetail(indicator)}>
        <View style={[customStyle.card, styles.ratingItemContainer]}>
          { this._renderContent(indicator) }
          <VotingIndicatorListMedian indicator={this.props.indicator} />
        </View>
      </TouchableOpacity>
    )
  }
}