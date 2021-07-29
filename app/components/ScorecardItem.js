import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../components/Translations';
import Color from '../themes/color';
import uuidV4 from '../utils/uuidv4';
import styles from '../themes/scorecardListItemStyle';
import votingCriteriaService from '../services/votingCriteriaService';
import scorecardHelper from '../helpers/scorecard_helper';

import { getDistrictWidth } from '../utils/scorecard_util';
import { getDeviceStyle } from '../utils/responsive_util';
import ScorecardItemTabletStyles from '../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../styles/mobile/ScorecardItemComponentStyle';
import { FontFamily } from '../assets/stylesheets/theme/font';
import { smLabelSize, xsLabelSize } from '../constants/mobile_font_size_constant';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

export default class ScorecardItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.itemRef = null;
  }

  renderStatusIcon(scorecard) {
    const icon = scorecardHelper.getScorecardIcon(scorecard);

    return (
      <View style={[responsiveStyles.iconBorder, {borderColor: scorecardHelper.scorecardTypeColor(scorecard)}]}>
        <AppIcon name={icon.name} size={20} color={icon.color} />
      </View>
    )
  }

  deleteScorecard = () => {
    this.props.showDeleteModal();
    this.itemRef.close();
  }

  renderDeleteAction = () => {
    return (
      <RectButton onPress={() => this.deleteScorecard()} style={responsiveStyles.deleteContainer}>
        <Text style={[{color: Color.whiteColor}, responsiveStyles.deleteLabel]}>{ this.context.translations.delete }</Text>
      </RectButton>
    )
  }

  renderConductedDateAndRemoveDate(scorecard) {
    const {translations, appLanguage} = this.context

    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{ textAlign: 'left', color: Color.grayColor, fontSize: getDeviceStyle(14, wp(smLabelSize)), marginLeft: 0 }}>
          { !!scorecard.conducted_date ? scorecardHelper.getTranslatedDate(scorecard.conducted_date, appLanguage, 'DD MMM') : '' }
        </Text>

        { scorecard.isUploaded &&
          <Text style={{ flex: 1, fontSize: getDeviceStyle(14, wp(xsLabelSize)), color: Color.redColor, fontFamily: FontFamily.body, textAlign: 'right', marginTop: 2}}>
            {translations.toBeRemovedOn}: { scorecardHelper.getTranslatedRemoveDate(scorecard.uploaded_date, appLanguage) }
          </Text>
        }
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};
    let criteriasSize = votingCriteriaService.getAll(scorecard.uuid).length;
    const subTextStyles = { paddingTop: getDeviceStyle(2, 1), height: getDeviceStyle(27, 23) };

    return (
      <Swipeable key={uuidV4()}
        ref={ref => { this.itemRef = ref }}
        enabled={!scorecard.isUploaded}
        renderRightActions={this.renderDeleteAction}
      >
        <TouchableOpacity onPress={this.props.onPress} style={responsiveStyles.itemContainer} >
          {this.renderStatusIcon(scorecard)}

          <View style={{flex: 1, marginLeft: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{fontSize: getDeviceStyle(15, 14), flex: 1}]}>{ scorecard.uuid }</Text>
              <Text style={[styles.subText, subTextStyles, {marginTop: 2}]}>{this.context.translations.numberOfCriteria}: {criteriasSize}</Text>
            </View>

            <View style={{flexDirection: 'row', paddingRight: 10, alignItems: 'center', marginTop: getDeviceStyle(-4, 0)}}>
              <AppIcon name='map-marker' size={14} color={Color.grayColor} style={{marginRight: 5, marginTop: -4}} />
              <View style={{flex: 3, borderWidth: 0, flexDirection: 'row'}}>
                <Text style={responsiveStyles.locationLabel}>{scorecard.commune}, </Text>
                <Text numberOfLines={1} style={[responsiveStyles.locationLabel, {maxWidth: getDistrictWidth(scorecard)}]}>
                  {scorecard.district}
                </Text>
                <Text style={responsiveStyles.locationLabel}>, {scorecard.province}</Text>
              </View>
            </View>

            { scorecard.conducted_date && this.renderConductedDateAndRemoveDate(scorecard) }
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}