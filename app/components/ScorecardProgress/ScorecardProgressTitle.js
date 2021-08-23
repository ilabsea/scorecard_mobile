import React, {Component} from 'react';
import { View, Text } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';

import scorecardHelper from '../../helpers/scorecard_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardProgressTabletStyles from '../../styles/tablet/ScorecardProgressScreenStyle';
import ScorecardProgressMobileStyles from '../../styles/mobile/ScorecardProgressScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

class ScorecardProgressTitle extends Component {
  static contextType = LocalizationContext;

  renderScorecardLocation() {
    return `${this.props.scorecard.commune},  ${this.props.scorecard.district}, ${this.props.scorecard.province}`;
  }

  renderConductedDate() {
    if (this.props.scorecard.conducted_date)
      return (
        <Text style={[responsiveStyles.subTitle, { flex: 1, textAlign: 'right', marginLeft: 10, marginBottom: 2 }]}>
          { !!this.props.scorecard.conducted_date ? scorecardHelper.getTranslatedDate(this.props.scorecard.conducted_date, this.context.appLanguage, 'DD MMM YYYY') : '' }
        </Text>
      )
  }

  render() {
    return (
      <View style={{marginBottom: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={responsiveStyles.title}>
            { this.props.scorecard.uuid }
          </Text>

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