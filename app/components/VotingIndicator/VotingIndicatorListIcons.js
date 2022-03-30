import React from 'react';
import { View, Text } from 'react-native';

import ratings from '../../db/jsons/ratings';
import { getVotingIcon } from '../../helpers/voting_indicator_helper';
import uuidv4 from '../../utils/uuidv4';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingIndicatorListItemTabletStyles from '../../styles/tablet/VotingIndicatorListItemComponentStyle';
import VotingIndicatorListItemMobileStyles from '../../styles/mobile/VotingIndicatorListItemComponentStyle';

const styles = getDeviceStyle(VotingIndicatorListItemTabletStyles, VotingIndicatorListItemMobileStyles);

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