import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import ProposedIndicator from '../../models/ProposedIndicator';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicatorListModalTabletStyles from '../../styles/tablet/ProposedIndicatorListModalComponentStyle';
import ProposedIndicatorListModalMobileStyles from '../../styles/mobile/ProposedIndicatorListModalComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedIndicatorListModalTabletStyles, ProposedIndicatorListModalMobileStyles);

const ProposedIndicatorModalSubTitle = (props) => {
  const { translations } = useContext(LocalizationContext);

  if (props.proposedIndicators.length === 0)
    return <View style={{height: '99%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={responsiveStyles.label}>{ translations.noIndicator }</Text>
          </View>

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
      <Text style={[{flex: 1, fontFamily: FontFamily.title}, responsiveStyles.label]}>{translations.pleaseSelectIndicator}</Text>
      <Text style={[{fontFamily: FontFamily.title}, responsiveStyles.label]}>
        { props.selectedAmount } / {ProposedIndicator.getAllDistinct(props.scorecardUuid).length}
      </Text>
    </View>
  )
}

export default ProposedIndicatorModalSubTitle;