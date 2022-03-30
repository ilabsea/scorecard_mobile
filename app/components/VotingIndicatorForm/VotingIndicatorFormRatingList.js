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
      this.props.criterias.map((criteria, index) => {
        return (
          <React.Fragment key={`${criteria.uuid}_${index}`}>
            <IndicatorRatingItem
              key={criteria.uuid}
              criteria={criteria}
              onPress={ (rating) => this.props.onClickRatingIcon(criteria, rating) }
              colIndex={index}
            />

            { index < this.props.criterias.length - 1 && <View style={responsiveStyles.itemSeparator} /> }
          </React.Fragment>
        )
      })
    )
  }
}

export default VotingIndicatorFormRatingList;