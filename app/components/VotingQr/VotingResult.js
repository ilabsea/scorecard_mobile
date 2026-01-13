import React from 'react';
import { View } from 'react-native';

import VotingIndicatorListItem from '../VotingIndicator/VotingIndicatorListItem';
import { containerPadding } from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';

const VotingResult = (props) => {
  const renderList = () => {
    const scorecard = Scorecard.find(props.scorecardUuid);

    return props.votingIndicators.map((item, index) => 
      <VotingIndicatorListItem
        key={index}
        indicator={item}
        scorecard={scorecard}
        votingInfoModalRef={props.votingInfoModalRef}
        infoModalRef={props.infoModalRef}
        disabledShowDetail={true}
      />
    );
  }

  return (
    <View style={{flex: 1, paddingHorizontal: containerPadding}}>
      { renderList() }
    </View>
  )
}

export default VotingResult;