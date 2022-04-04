import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { isProposedIndicatorScreen } from '../../utils/screen_util';

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
    if (props.isIndicatorBase && isProposedIndicatorScreen()) {
      return (
        <React.Fragment>
          ({ translations.raised }
          <Text style={{fontFamily: FontFamily.title, fontSize: getDeviceStyle(18, 16)}}> { props.raisedParticipant }/{props.totalParticipant} </Text>
          { translations.pax })
        </React.Fragment>
      )
    }
  }

  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={{ fontSize: bodyFontSize(), marginBottom: 20, textTransform: 'capitalize', flex: 1, paddingRight: 5 }}>
          {translations.selectRaisedParticipant + ' '} 
          { renderRaisedParticipant() }
        </Text>

        { renderAddNewParticipantButton() }
      </View>
    </View>
  )
}

export default ProposedIndicatorParticipantListSubtitle;