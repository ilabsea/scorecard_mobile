import React from 'react';
import { Text } from 'react-native';

import ScorecardResultButton from './ScorecardResultButton';
import Color from '../../themes/color';
import scorecardResultHelper from '../../helpers/scorecard_result_helper';

class ScorecardResultAddButton extends React.Component {
  render() {
    const { fieldName, isScorecardFinished, indicator } = this.props;
    let color = Color.blackColor;

    if (fieldName == 'suggested_action' && !indicator['suggested_action'])
      color = Color.redColor;

    return (
      <ScorecardResultButton
        onPress={() => this.props.onPress()}
        isScorecardFinished={this.props.isScorecardFinished}
        indicator={indicator}
        showDefaultLabel={true}
      >
        { (fieldName == 'suggested_action' && this.props.requireSignVisible) &&
          <Text style={[{fontSize: 18}, scorecardResultHelper.btnTextColor(isScorecardFinished, indicator, color)]}> *</Text>
        }
      </ScorecardResultButton>
    );
  }
}

export default ScorecardResultAddButton;