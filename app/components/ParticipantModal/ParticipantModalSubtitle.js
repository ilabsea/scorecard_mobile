import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize, subTitleFontSize } from '../../utils/font_size_util';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import ProposedIndicator from '../../models/ProposedIndicator';

const ProposedIndicatorParticipantListSubtitle = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [anonymousParticipant, setAnonymousParticipant] = useState([]);

  useEffect(() => {
    if (!!props.selectedIndicator)
      setAnonymousParticipant(ProposedIndicator.getNumberAnonymousProposeByIndicator(props.scorecardUuid, props.selectedIndicator.indicatorable_id));
  }, [props.raisedParticipant])

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
          { boldLabel(` ${props.raisedParticipant}/${props.totalParticipant}`) }
          { translations.pax }{ anonymousParticipant > 0 && renderAnonymous() })
        </React.Fragment>
      )
    }
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 5}}>
      <Text style={{ fontSize: bodyFontSize(), textTransform: 'capitalize', flex: 1, paddingRight: 5 }}>
        {translations.selectParticipant + ' '} 
        { renderProposedParticipant() }
      </Text>
      { renderAddNewParticipantButton() }
    </View>
  )
}

export default ProposedIndicatorParticipantListSubtitle;