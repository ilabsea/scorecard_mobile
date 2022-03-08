import React from 'react';
import { View } from 'react-native';

import CriteriaRatingItem from '../VotingCriteria/CriteriaRatingItem';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingCriteriaFormTabletStyles from '../../styles/tablet/VotingCriteriaFormScreenStyle';
import VotingCriteriaFormMobileStyles from '../../styles/mobile/VotingCriteriaFormScreenStyle';

const responsiveStyles = getDeviceStyle(VotingCriteriaFormTabletStyles, VotingCriteriaFormMobileStyles);

class VotingIndicatorFormRatingList extends React.Component {
  render() {
    return (
      this.props.criterias.map((criteria, index) => {
        return (
          <React.Fragment key={`${criteria.uuid}_${index}`}>
            <CriteriaRatingItem
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