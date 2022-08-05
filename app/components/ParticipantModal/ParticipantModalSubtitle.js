import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import Participant from '../../models/Participant';
import ProposedIndicator from '../../models/ProposedIndicator';

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
      const allParticipants = Participant.getAllCountable(props.scorecardUuid).length;
      const raisedParticipants = ProposedIndicator.getRaisedCountableParticipants(props.scorecardUuid, props.selectedIndicator.indicatorable_id);

      return (
        <React.Fragment>
          ({ translations.raised }
          <Text style={{fontFamily: FontFamily.title, fontSize: getDeviceStyle(18, 16)}}> { raisedParticipants }/{allParticipants} </Text>
          { translations.pax })
        </React.Fragment>
      )
    }
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 5}}>
      <Text style={{ fontSize: bodyFontSize(), textTransform: 'capitalize', flex: 1, paddingRight: 5 }}>
        {translations.selectParticipant + ' '} 
        { renderRaisedParticipant() }
      </Text>
      { renderAddNewParticipantButton() }
    </View>
  )
}

export default ProposedIndicatorParticipantListSubtitle;