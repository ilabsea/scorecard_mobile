import React from 'react';
import { Text } from 'react-native';
import * as Progress from 'react-native-progress';

import Color from '../../themes/color';
import Scorecard from '../../models/Scorecard';

const ScorecardProgressCircle = (props) => {
  const scorecard = Scorecard.find(props.scorecardUuid);
  const progressIndex = scorecard.finished ? scorecard.status : scorecard.status - 1;
  const progress = (progressIndex / 10) * 2

  return (
    <Progress.Circle
      size={40}
      color={Color.successColor}
      unfilledColor={Color.paleGrayColor}
      borderWidth={0}
      progress={progress}
      style={{relative: 'relative'}}
    >
      <Text style={{position: 'absolute', bottom: 11, left: 9, fontWeight: '700', color: Color.whiteColor, fontSize: 14}}>
        { progressIndex }/5
      </Text>
    </Progress.Circle>
  )
}

export default ScorecardProgressCircle;