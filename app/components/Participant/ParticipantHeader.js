import React from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import OutlinedButton from '../OutlinedButton';

import Participant from '../../models/Participant';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListTabletStyles from '../../styles/tablet/ParticipantListScreenStyle';
import ParticipantListMobileStyles from '../../styles/mobile/ParticipantListScreenStyle';

const styles = getDeviceStyle(ParticipantListTabletStyles, ParticipantListMobileStyles);

class ParticipantHeader extends React.Component {
  static contextType = LocalizationContext;

  render () {
    const {translations} = this.context;

    return (
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <Text style={styles.titleLabel}>
            {translations.participantList}
          </Text>

          <Text style={styles.participantNumberLabel}>
            ({ Participant.getAllCountable(this.props.scorecardUuid).length } { translations.pax })
          </Text>
        </View>

        { this.props.participants.length > 0 &&
          <OutlinedButton
            icon="plus"
            label={translations.addNewParticipant}
            onPress={() => this.props.addNewParticipant() }
          />
        }
      </View>
    )
  }
}

export default ParticipantHeader;