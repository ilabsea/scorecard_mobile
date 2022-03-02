import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Icon } from 'native-base';

import { LocalizationContext } from '../../components/Translations';
import VotingIndicatorListIcons from './VotingIndicatorListIcons';
import VotingIndicatorListMedian from './VotingIndicatorListMedian';

import customStyle from '../../themes/customStyle';
import cardListItemStyle from '../../themes/cardListItemStyle';

import indicatorHelper from '../../helpers/indicator_helper';
import { getVotingInfos, isVotingCriteriaRated } from '../../helpers/voting_criteria_helper';
import votingInfoModalHelper from '../../helpers/voting_info_modal_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingCriteriaListItemTabletStyles from '../../styles/tablet/VotingCriteriaListItemComponentStyle';
import VotingCriteriaListItemMobileStyles from '../../styles/mobile/VotingCriteriaListItemComponentStyle';

const styles = getDeviceStyle(VotingCriteriaListItemTabletStyles, VotingCriteriaListItemMobileStyles);

export default class VotingCriteriaListItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      votingInfos: [],
      selectedIndicator: null,
    };
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

          <VotingIndicatorListIcons criteria={this.props.criteria} />
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
      votingInfos: votingInfos,
      selectedIndicator: indicator,
    }, () => {
      const votingInfoSnapPoints = getDeviceStyle(['42%', '58%'], ['43%', '60.5%']);
      const modalSnapPoints = isVotingCriteriaRated(this.props.criteria.uuid) ? votingInfoSnapPoints : ['12%'];
      const scorecard = this.props.scorecard || {};
      const bodyContent = votingInfoModalHelper.getModalContent(scorecard, this.state.selectedIndicator, this.props.criteria, this.context.translations);

      this.props.infoModalRef.current?.setBodyContent(bodyContent.first_content, bodyContent.second_content);
      this.props.infoModalRef.current?.setSnapPoints(modalSnapPoints);

      setTimeout(() => {
        this.props.votingInfoModalRef.current?.present();
      }, 50);
    });
  }

  render() {
    let indicator = indicatorHelper.getDisplayIndicator(this.props.criteria);

    return (
      <TouchableOpacity onPress={() => this.showVotingDetail(indicator)}>
        <View style={[customStyle.card, styles.ratingItemContainer]}>
          { this._renderContent(indicator) }
          <VotingIndicatorListMedian criteria={this.props.criteria} />
        </View>
      </TouchableOpacity>
    )
  }
}