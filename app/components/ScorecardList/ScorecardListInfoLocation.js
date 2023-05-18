import React, {Component} from 'react';
import { View, Text } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info'

import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import { getLocationMaxWidth } from '../../utils/scorecard_util';
import scorecardHelper from '../../helpers/scorecard_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardItemTabletStyles from '../../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../../styles/mobile/ScorecardItemComponentStyle';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

class ScorecardListInfoLocation extends Component {
  static contextType = LocalizationContext;

  renderPrimarySchool() {
    return (
      <Text style={responsiveStyles.locationLabel}>
        { JSON.parse(this.props.scorecard.primary_school)[`name_${this.context.appLanguage}`] }
      </Text>
    )
  }

  renderCommune() {
    return !!this.props.scorecard.commune ? `${this.props.scorecard.commune}, ` : '';
  }

  renderScorecardLocation() {
    const { scorecard } = this.props;
    const {appLanguage} = this.context;

    return (
      <View style={{flex: 1, flexDirection: 'row', paddingRight: 10, alignItems: 'center', marginTop: getDeviceStyle(-4, 0)}}>
        <AppIcon name='map-marker' size={14} color={Color.lightGrayColor} style={{marginRight: 5, marginTop: getDeviceStyle(-3, -4)}} />
        <View style={{flex: 3, flexDirection: 'row'}}>
          { scorecard.primary_school && this.renderPrimarySchool(scorecard) }

          <Text numberOfLines={1} style={[responsiveStyles.locationLabel, { maxWidth: getLocationMaxWidth(scorecard, appLanguage)}]}>
            { this.props.scorecard.primary_school && `, `}{ scorecardHelper.getFactoryLabel(scorecard, appLanguage) }{ this.renderCommune() }{ scorecard.district }
          </Text>
          <Text style={responsiveStyles.locationLabel}>, {scorecard.province}</Text>
        </View>
      </View>
    )
  }

  renderRemoveDate() {
    if (this.props.scorecard.isUploaded) {
      return (
        <View style={{flexDirection: 'row'}}>
          { !DeviceInfo.isTablet() &&
            <AppIcon name='calendar-times-o' size={getDeviceStyle(13, 12)} color={Color.redColor} style={responsiveStyles.removeDateIcon} />
          }
          <Text style={responsiveStyles.removeDateLabel}>
            { DeviceInfo.isTablet() ? `${this.context.translations.toBeRemovedOn}: ` : '' }
            { scorecardHelper.getTranslatedRemoveDate(this.props.scorecard.uploaded_date, this.context.appLanguage) }
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        { this.renderScorecardLocation() }
        { this.renderRemoveDate() }
      </View>
    )
  }
}

export default ScorecardListInfoLocation;