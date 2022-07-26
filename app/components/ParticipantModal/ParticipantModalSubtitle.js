import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';
import UncountedFilterButton from './UncountedFilterButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import participantHelper from '../../helpers/participant_helper';

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

  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
        <Text style={{ fontSize: bodyFontSize(), marginBottom: 20, textTransform: 'capitalize', flex: 1, paddingRight: 5, marginTop: -8 }}>
          {translations.selectParticipant + ' '} 
          { renderRaisedParticipant() }
        </Text>
        { renderAddNewParticipantButton() }
      </View>

      { participantHelper.isFilterUncountedVisible(props.scorecardUuid, props.participants) &&
        <UncountedFilterButton toggleFilter={(isFiltered) => props.toggleFilter(isFiltered)} />
      }
    </View>
  )
}

export default ProposedIndicatorParticipantListSubtitle;