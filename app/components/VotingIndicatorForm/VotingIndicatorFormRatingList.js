import React from 'react';
import { View } from 'react-native';

import IndicatorRatingItem from '../VotingIndicator/IndicatorRatingItem';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingIndicatorFormTabletStyles from '../../styles/tablet/VotingIndicatorFormScreenStyle';
import VotingIndicatorFormMobileStyles from '../../styles/mobile/VotingIndicatorFormScreenStyle';

const responsiveStyles = getDeviceStyle(VotingIndicatorFormTabletStyles, VotingIndicatorFormMobileStyles);

class VotingIndicatorFormRatingList extends React.Component {
  render() {
    return (
      this.props.indicators.map((indicator, index) => {
        return (
          <React.Fragment key={`${indicator.uuid}_${index}`}>
            <IndicatorRatingItem
              key={indicator.uuid}
              indicator={indicator}
              onPress={ (rating) => this.props.onClickRatingIcon(indicator, rating) }
              colIndex={index}
            />

            { index < this.props.indicators.length - 1 && <View style={responsiveStyles.itemSeparator} /> }
          </React.Fragment>
        )
      })
    )
  }
}

export default VotingIndicatorFormRatingList;