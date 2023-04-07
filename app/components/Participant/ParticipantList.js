import React from 'react';

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';

import Scorecard from '../../models/Scorecard';
import Participant from '../../models/Participant';
import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const responsiveStyles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantList extends React.Component {
  render() {
    const numberOfParticipant = Scorecard.find(this.props.scorecardUuid).number_of_participant;
    this.totalParticipant = numberOfParticipant;
    let doms = null;
    const participants = Participant.getAllByScorecard(this.props.scorecardUuid);

    if (participants.length > 0) {
      doms = participants.map((participant, index) =>
        <ParticipantListItemInfo
          key={index}
          participant={participant}
          onPress={() => this.props.showParticipantBottomSheet(participant)}
          containerStyle={[responsiveStyles.itemContainer, listItemStyles.card]}
          hasArrowIcon={true}
          arrowColor={Color.headerColor}
          formModalRef={this.props.formModalRef}
          participantModalRef={this.props.participantModalRef}
          isParticipantScreen={true}
        />
      )
    }

    return doms;
  }
}

export default ParticipantList;