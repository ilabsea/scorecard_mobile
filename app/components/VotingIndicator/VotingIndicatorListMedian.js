import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import ratings from '../../db/jsons/ratings';
import { getVotingIcon } from '../../helpers/voting_indicator_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingIndicatorListItemTabletStyles from '../../styles/tablet/VotingIndicatorListItemComponentStyle';
import VotingIndicatorListItemMobileStyles from '../../styles/mobile/VotingIndicatorListItemComponentStyle';

const styles = getDeviceStyle(VotingIndicatorListItemTabletStyles, VotingIndicatorListItemMobileStyles);

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
        { getVotingIcon(currentIcon, iconSize, 0.75) }
        <Text style={styles.medianText}>{translations[currentIcon.label]}</Text>
      </View>
    </View>
  )
}

export default VotingIndicatorListMedian;