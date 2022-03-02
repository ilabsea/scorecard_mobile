import React from 'react';
import { View, Text, Image } from 'react-native';

import ratings from '../../db/jsons/ratings';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingCriteriaListItemTabletStyles from '../../styles/tablet/VotingCriteriaListItemComponentStyle';
import VotingCriteriaListItemMobileStyles from '../../styles/mobile/VotingCriteriaListItemComponentStyle';

const styles = getDeviceStyle(VotingCriteriaListItemTabletStyles, VotingCriteriaListItemMobileStyles);

export const VoteIcon = (icon, size) => {
  let sizeRatio = size * 0.75;

  return (
    <Image source={Images[icon.image]} style={{width: sizeRatio, height: sizeRatio, maxWidth: size, maxHeight: size}} />
  )
}

const VotingIndicatorListIcons = (props) => {
  const renderRatingIcon = (icon) => {
    const iconSize = getDeviceStyle(28, 20);

    return (
      <View key={uuidv4()} style={[styles.ratingItem]}>
        { VoteIcon(icon, iconSize) }

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