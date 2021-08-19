import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardProgressTabletStyles from '../../styles/tablet/ScorecardProgressScreenStyle';
import ScorecardProgressMobileStyles from '../../styles/mobile/ScorecardProgressScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

class ScorecardProgressTitle extends Component {
  renderScorecardLocation() {
    return `${this.props.scorecard.commune}  ${this.props.scorecard.district} ${this.props.scorecard.province}`;
  }

  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
        <Text style={responsiveStyles.title}>
          { this.props.scorecard.uuid }
        </Text>

        <View style={{flex: 1, flexWrap: 'nowrap'}}>
          <Text style={responsiveStyles.subTitle}>
            { this.renderScorecardLocation() }
          </Text>
        </View>
      </View>
    )
  }
}

export default ScorecardProgressTitle;