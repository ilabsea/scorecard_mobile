import React from 'react';
import { View, Text } from 'react-native';

import ratings from '../../db/jsons/ratings';
import { getVotingIcon } from '../../helpers/voting_criteria_helper';
import uuidv4 from '../../utils/uuidv4';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingCriteriaListItemTabletStyles from '../../styles/tablet/VotingCriteriaListItemComponentStyle';
import VotingCriteriaListItemMobileStyles from '../../styles/mobile/VotingCriteriaListItemComponentStyle';

const styles = getDeviceStyle(VotingCriteriaListItemTabletStyles, VotingCriteriaListItemMobileStyles);

const VotingIndicatorListIcons = (props) => {
  const renderRatingIcon = (icon) => {
    const iconSize = getDeviceStyle(28, 20);

    return (
      <View key={uuidv4()} style={[styles.ratingItem]}>
        { getVotingIcon(icon, iconSize, 0.75) }

        <Text style={styles.ratingCount}>{props.criteria[icon.countMethodName]}</Text>
      </View>
    )
  }

  return (
    <View style={styles.ratingIconContainer}>
      { ratings.map(icon => renderRatingIcon(icon)) }
    </View>
  )
}

export default VotingIndicatorListIcons;