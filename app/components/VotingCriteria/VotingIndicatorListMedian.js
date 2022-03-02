import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { VoteIcon } from './VotingIndicatorListIcons';

import ratings from '../../db/jsons/ratings';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingCriteriaListItemTabletStyles from '../../styles/tablet/VotingCriteriaListItemComponentStyle';
import VotingCriteriaListItemMobileStyles from '../../styles/mobile/VotingCriteriaListItemComponentStyle';

const styles = getDeviceStyle(VotingCriteriaListItemTabletStyles, VotingCriteriaListItemMobileStyles);

const VotingIndicatorListMedian = (props) => {
  const { criteria } = props;
  const { translations } = useContext(LocalizationContext);

  if (!criteria.median) { return (null) }

  const currentIcon = ratings.filter(x => x.value == criteria.median)[0];
  const iconSize = getDeviceStyle(56, 38);

  return (
    <View style={styles.resultWrapper}>
      <Text style={styles.medianScoreText}>{translations.score}: {criteria.median}</Text>

      <View style={{alignItems: 'center'}}>
        { VoteIcon(currentIcon, iconSize) }
        <Text style={styles.medianText}>{translations[currentIcon.label]}</Text>
      </View>
    </View>
  )
}

export default VotingIndicatorListMedian;