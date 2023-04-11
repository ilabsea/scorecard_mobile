import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize, subTitleFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const styles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

const ProposedIndicatorParticipantListSubtitle = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [anonymousParticipant, setAnonymousParticipant] = useState([]);

  useEffect(() => {
    if (!!props.selectedIndicator)
      setAnonymousParticipant(ProposedIndicator.getNumberAnonymousProposeByIndicator(props.scorecardUuid, props.selectedIndicator.indicatorable_id));
  }, [props.raisedParticipantUuids])

  function renderAddNewParticipantButton() {
    return <OutlinedButton
            icon="plus"
            label={translations.addNew}
            onPress={() => props.showAddParticipantModal() }
          />
  }

  function boldLabel(label) {
    return <Text style={{fontFamily: FontFamily.title, fontSize: subTitleFontSize()}}>{label}</Text>
  }

  function renderAnonymous() {
    return <Text style={{fontSize: bodyFontSize()}}> [{translations.anonymous} { boldLabel(anonymousParticipant) }]</Text>
  }

  function renderProposedParticipant() {
    if (props.isIndicatorBase && isCreateNewIndicatorScreen()) {
      return (
        <React.Fragment>
          ({ translations.proposed }
          { boldLabel(` ${props.raisedParticipantUuids.length}/${props.totalParticipant}`) }
          { translations.pax }{ anonymousParticipant > 0 && renderAnonymous() }):
        </React.Fragment>
      )
    }
  }

  function renderRaisedParticipants() {
    return props.raisedParticipantUuids.map(participantUuid => {
      const participant = Participant.find(participantUuid)
      return <View key={participantUuid} style={{justifyContent: 'center', position: 'relative'}}>
                <View style={[styles.numberContainer, {width: 28, height: 28, marginRight: 5}]}>
                  <Text style={[styles.numberLabel, {fontSize: smallTextFontSize()}]}>{participant.order + 1}</Text>
                </View>
            </View>
    })
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 5}}>
      <View style={{flex: 1, paddingRight: 5}}>
        <Text style={{ fontSize: bodyFontSize(), textTransform: 'capitalize' }}>
          {translations.selectParticipant + ' '} 
          { renderProposedParticipant() }
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          {renderRaisedParticipants()}
        </View>
      </View>
      { renderAddNewParticipantButton() }
    </View>
  )
}

export default ProposedIndicatorParticipantListSubtitle;