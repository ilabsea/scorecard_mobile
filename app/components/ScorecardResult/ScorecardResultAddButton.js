import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';

import ScorecardResultButton from './ScorecardResultButton';
import Color from '../../themes/color';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { pressableItemSize } from '../../utils/component_util';
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
        // btnStyle={styles.btn}
        // textStyle={styles.btnText}
        isScorecardFinished={this.props.isScorecardFinished}
        indicator={indicator}
        showDefaultLabel={true}
      >
        { fieldName == 'suggested_action' &&
          <Text style={[{fontSize: 18}, scorecardResultHelper.btnTextColor(isScorecardFinished, indicator, color)]}> *</Text>
        }
      </ScorecardResultButton>
    );
  }
}

export default ScorecardResultAddButton;