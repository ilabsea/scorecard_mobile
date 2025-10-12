import React from 'react';
import AnimatedProgressWheel from 'react-native-progress-wheel';

import Color from '../../themes/color';
import Scorecard from '../../models/Scorecard';

const ScorecardProgressCircle = (props) => {
  const scorecard = Scorecard.find(props.scorecardUuid);
  const progressIndex = scorecard.finished ? scorecard.status : scorecard.status - 1;

  return (
    <AnimatedProgressWheel
      size={40}
      width={5}
      progress={progressIndex}
      max={5}
      showProgressLabel={true}
      labelStyle={{display: 'none'}}
      subtitle={`${progressIndex}/5`}
      subtitleStyle={{fontWeight: '700', color: Color.whiteColor, fontSize: 14}}
      color={Color.successColor}
      backgroundColor={Color.paleGrayColor}
    />
  )
}

export default ScorecardProgressCircle;