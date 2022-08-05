import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize, subTitleFontSize } from '../../utils/font_size_util';
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

  function renderAnonymous() {
    return <Text style={{fontSize: bodyFontSize()}}> + {translations.anonymous} 1</Text>
  }

  function renderRaisedParticipant() {
    if (props.isIndicatorBase && isCreateNewIndicatorScreen()) {
      const allParticipants = Participant.getAllCountable(props.scorecardUuid).length;
      const raisedParticipants = ProposedIndicator.getRaisedCountableParticipants(props.scorecardUuid, props.selectedIndicator.indicatorable_id);
      const hasRaisedAnonymousParticipant = ProposedIndicator.hasRaisedAnonymousParticipant(props.scorecardUuid, props.selectedIndicator.indicatorable_id);

      return (
        <React.Fragment>
          ({ translations.raised }
          <Text style={{fontFamily: FontFamily.title, fontSize: subTitleFontSize()}}> { raisedParticipants }/{allParticipants} </Text>
          { translations.pax }{ hasRaisedAnonymousParticipant && renderAnonymous() })
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