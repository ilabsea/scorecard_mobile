import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import Accordion from '../Accordion';

import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../../constants/main_constant';
import { navigationRef } from '../../navigators/app_navigator';

const ProposedIndicatorMethodDetails = (props) => {
  const { translations } = useContext(LocalizationContext);
  const proposedIndicatorMethods = [
    { label: translations.indicatorBase, value: INDICATOR_BASE, description: translations.indicatorBaseDescription, video_id: 'f7OPcDX_LyI' },
    { label: translations.participantBase, value: PARTICIPANT_BASE, description: translations.participantBaseDescription, video_id: 'Il0S8BoucSA' }
  ];
  const accordionStatuses = [true, false];

  function renderAccordionTitle(item) {
    return <Text>{ item.label }</Text>
  }

  function renderAccordionContent(item) {
    return (
      <View style={{ backgroundColor: '#fbf9ed', borderColor: '#e6e7e9', borderWidth: 1 }}>
        { renderContent(item) }
      </View>
    )
  }

  function renderContent(item) {
    return (
      <View style={{padding: containerPadding}}>
        <Text style={{fontSize: bodyFontSize()}}>
          { item.description }
        </Text>

        <TouchableOpacity onPress={() => showVideoPlayer(item)} style={{ flexDirection: 'row', marginTop: 30 }}>
          <Icon name='play-circle-filled' size={20} color={Color.clickableColor} style={{padding: 0, marginRight: 5, marginTop: 3, height: 20}} />

          <Text style={{color: Color.clickableColor, fontSize: bodyFontSize()}}>{ translations.clickHereToWatchHowToProposeIndicator }</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function showVideoPlayer(item) {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'VideoPlayer', params: { video_id: item.video_id, title: item.label } }
    ]});
  }

  return (
    <View>
      <BottomSheetModalTitle title={ translations.detailOfProposedIndicatorMethods } />

      <View style={{padding: containerPadding}}>
        <Accordion
          items={proposedIndicatorMethods}
          accordionTitle={renderAccordionTitle}
          accordionContent={renderAccordionContent}
          customItemStyle={{ backgroundColor: '#f9f9fa', borderWidth: 1, borderColor: Color.paleGrayColor }}
          accordionStatuses={accordionStatuses}
          hasAutoToggle={true}
        />
      </View>
    </View>
  )
}

export default ProposedIndicatorMethodDetails;