import React, {Component} from 'react';
import { View, Text } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import styles from '../../themes/scorecardListItemStyle';

import { LocalizationContext } from '../Translations';
import votingCriteriaService from '../../services/votingCriteriaService';
import scorecardHelper from '../../helpers/scorecard_helper';
import { getDistrictWidth } from '../../utils/scorecard_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardItemTabletStyles from '../../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../../styles/mobile/ScorecardItemComponentStyle';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { smLabelSize, xsLabelSize } from '../../constants/mobile_font_size_constant';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

class ScorecardListInfo extends Component {
  static contextType = LocalizationContext;

  renderRemoveDate(scorecard) {
    if (scorecard.isUploaded) {
      return (
        <View style={{flexDirection: 'row'}}>
          <AppIcon name='calendar-times-o' size={14} color={Color.redColor} style={responsiveStyles.removeDateIcon} />
          <Text style={responsiveStyles.removeDateLabel}>
            { scorecardHelper.getTranslatedRemoveDate(scorecard.uploaded_date, this.context.appLanguage) }
          </Text>
        </View>
      )
    }
  }

  renderConductedDate(scorecard) {
    if (scorecard.conducted_date)
      return (
        <Text style={{ flex: 1, textAlign: 'right', color: Color.grayColor, fontSize: getDeviceStyle(14, wp(smLabelSize)), marginTop: getDeviceStyle(2, 3)}}>
          { !!scorecard.conducted_date ? scorecardHelper.getTranslatedDate(scorecard.conducted_date, this.context.appLanguage, 'DD MMM') : '' }
        </Text>
      )
  }

  renderScorecardLocation(scorecard) {
    return (
      <View style={{flex: 1, flexDirection: 'row', paddingRight: 10, alignItems: 'center', marginTop: getDeviceStyle(-4, 0)}}>
        <AppIcon name='map-marker' size={14} color={Color.grayColor} style={{marginRight: 5, marginTop: -4}} />
        <View style={{flex: 3, borderWidth: 0, flexDirection: 'row'}}>
          <Text style={responsiveStyles.locationLabel}>{scorecard.commune}, </Text>
          <Text numberOfLines={1} style={[responsiveStyles.locationLabel, {maxWidth: getDistrictWidth(scorecard)}]}>
            {scorecard.district}
          </Text>
          <Text style={responsiveStyles.locationLabel}>, {scorecard.province}</Text>
        </View>
      </View>
    )
  }

  render() {
    const scorecard = this.props.scorecard || {};
    const criteriasSize = votingCriteriaService.getAll(scorecard.uuid).length;
    const subTextStyles = { paddingTop: getDeviceStyle(2, 1), height: getDeviceStyle(27, 23) };

    return (
      <View style={{flex: 1, marginLeft: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[{fontSize: getDeviceStyle(15, 14), marginTop: 2}]}>{ scorecard.uuid }</Text>
          <Text style={[styles.subText, subTextStyles, {marginTop: getDeviceStyle(0, 2), color: Color.grayColor}]}>
            ({this.context.translations.scorecardCriteria}: {criteriasSize})
          </Text>

          { this.renderConductedDate(scorecard) }
        </View>

        <View style={{flexDirection: 'row'}}>
          { this.renderScorecardLocation(scorecard) }
          { this.renderRemoveDate(scorecard) }
        </View>
      </View>
    )
  }
}

export default ScorecardListInfo;