import React, {Component} from 'react';
import { View } from 'react-native';

import ScorecardListInfoDetail from './ScorecardListInfoDetail';
import ScorecardListInfoLocation from './ScorecardListInfoLocation';
import { getDeviceStyle } from '../../utils/responsive_util';
class ScorecardListInfo extends Component {
  render() {
    const scorecard = this.props.scorecard || {};

    return (
      <View style={{flex: 1, marginLeft: getDeviceStyle(15, 10)}}>
        <ScorecardListInfoDetail scorecard={scorecard} />

        <ScorecardListInfoLocation scorecard={scorecard} />
      </View>
    )
  }
}

export default ScorecardListInfo;