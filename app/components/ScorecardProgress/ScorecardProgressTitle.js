import React, {Component} from 'react';
import { View, Text } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import EndpointBadge from '../Share/EndpointBadge';

import scorecardHelper from '../../helpers/scorecard_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardProgressTabletStyles from '../../styles/tablet/ScorecardProgressScreenStyle';
import ScorecardProgressMobileStyles from '../../styles/mobile/ScorecardProgressScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

class ScorecardProgressTitle extends Component {
  static contextType = LocalizationContext;

  renderScorecardLocation() {
    const primarySchool = this.props.scorecard.primary_school ? `${JSON.parse(this.props.scorecard.primary_school).name_en}, ` : '';

    return `${primarySchool}${this.props.scorecard.commune},  ${this.props.scorecard.district}, ${this.props.scorecard.province}`;
  }

  renderConductedDate() {
    if (this.props.scorecard.conducted_date)
      return (
        <Text style={[responsiveStyles.subTitle, { flex: 1, textAlign: 'right', marginLeft: 10 }]}>
          { !!this.props.scorecard.conducted_date ? scorecardHelper.getTranslatedDate(this.props.scorecard.conducted_date, this.context.appLanguage, 'DD MMM YYYY') : '' }
        </Text>
      )
  }

  renderEndpointBadge() {
    const endpointUrl = scorecardHelper.getEndpointUrl(this.props.scorecard);
    return <EndpointBadge endpoint={endpointUrl} badgeStyle={{marginBottom: 12}} />
  }

  render() {
    return (
      <View style={{marginBottom: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4}}>
          <Text style={responsiveStyles.facilityCode}>{ this.props.scorecard.facility_code }: </Text>
          <Text style={responsiveStyles.title}>
            { this.props.scorecard.uuid }
          </Text>

          { this.renderEndpointBadge() }

          { this.renderConductedDate() }
        </View>

        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'nowrap'}}>
          <AppIcon name='map-marker' size={getDeviceStyle(18, 14)} color={Color.grayColor} style={{marginRight: 5, marginTop: 2}} />

          <Text style={responsiveStyles.subTitle}>
            { this.renderScorecardLocation() }
          </Text>
        </View>
      </View>
    )
  }
}

export default ScorecardProgressTitle;