import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';
import UncountedFilterButton from './UncountedFilterButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import Participant from '../../models/Participant';

const ProposedIndicatorParticipantListSubtitle = (props) => {
  const { translations } = useContext(LocalizationContext);

  function renderAddNewParticipantButton() {
    return <OutlinedButton
            icon="plus"
            label={translations.addNew}
            onPress={() => props.showAddParticipantModal() }
          />
  }

  function renderRaisedParticipant() {
    if (props.isIndicatorBase && isCreateNewIndicatorScreen()) {
      return (
        <React.Fragment>
          ({ translations.raised }
          <Text style={{fontFamily: FontFamily.title, fontSize: getDeviceStyle(18, 16)}}> { props.raisedParticipant }/{props.totalParticipant} </Text>
          { translations.pax })
        </React.Fragment>
      )
    }
  }

  function listHasUncountParticipant() {
    return props.participants.filter(participant => !participant.counted).length > 0;
  }

  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
        <Text style={{ fontSize: bodyFontSize(), marginBottom: 20, textTransform: 'capitalize', flex: 1, paddingRight: 5, marginTop: -8 }}>
          {translations.selectParticipant + ' '} 
          { renderRaisedParticipant() }
        </Text>

        { renderAddNewParticipantButton() }
      </View>

      { (Participant.hasUncounted(props.scorecardUuid) && listHasUncountParticipant())  &&
        <UncountedFilterButton toggleFilter={(isFiltered) => props.toggleFilter(isFiltered)} />
      }
    </View>
  )
}

export default ProposedIndicatorParticipantListSubtitle;