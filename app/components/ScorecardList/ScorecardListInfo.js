import React, {Component} from 'react';
import { View } from 'react-native';

import ScorecardListInfoDetail from './ScorecardListInfoDetail';
import ScorecardListInfoLocation from './ScorecardListInfoLocation';
class ScorecardListInfo extends Component {
  render() {
    const scorecard = this.props.scorecard || {};

    return (
      <View style={{flex: 1, marginLeft: 15}}>
        <ScorecardListInfoDetail scorecard={scorecard} />

        <ScorecardListInfoLocation scorecard={scorecard} />
      </View>
    )
  }
}

export default ScorecardListInfo;