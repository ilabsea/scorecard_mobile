import React, {Component} from 'react';
import { View } from 'react-native';

import ScorecardListInfoScorecardDetail from './ScorecardListInfoScorecardDetail';
import ScorecardListInfoLocation from './ScorecardListInfoLocation';
class ScorecardListInfo extends Component {
  render() {
    const scorecard = this.props.scorecard || {};

    return (
      <View style={{flex: 1, marginLeft: 15}}>
        <ScorecardListInfoScorecardDetail scorecard={scorecard} />

        <ScorecardListInfoLocation scorecard={scorecard} />
      </View>
    )
  }
}

export default ScorecardListInfo;