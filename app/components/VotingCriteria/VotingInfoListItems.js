import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

export const VotingInfoListItem = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={[{flex: 1,flexDirection: 'row', paddingVertical: 4}, props.index % 2 == 0 ? { marginRight: 20 } : {}]}>
      <Text style={responsiveStyles.normalText}>{ props.typeLabel }</Text>
      <Text style={[{marginLeft: 6, fontFamily: FontFamily.title}, responsiveStyles.normalText]}>
        ({ props.score } {props.endingLabel})
      </Text>
    </View>
  )
}

export const VotingInfoListItems = (props) => {
  return (
    <View style={{paddingLeft: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        { props.doms[0] }
        { props.doms[1] }
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        { props.doms[2] }
        { props.doms[3] }
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        { props.doms[4] }
      </View>
    </View>
  )
}