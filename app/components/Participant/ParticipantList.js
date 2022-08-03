import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import AnonymousParticipantDetail from '../ParticipantModal/AnonymousParticipantDetail';

import Scorecard from '../../models/Scorecard';
import Participant from '../../models/Participant';
import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';
import { anonymousParticipantDetailSnapPoints } from '../../constants/modal_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const responsiveStyles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantList extends React.Component {
  showAnonymousDetail() {
    this.props.formModalRef.current?.setSnapPoints(anonymousParticipantDetailSnapPoints);
    this.props.formModalRef.current?.setBodyContent(<AnonymousParticipantDetail/>);
    this.props.participantModalRef.current?.present();
  }

  renderRightIcon(participant) {
    if (!participant.countable)
      return <TouchableOpacity onPress={() => this.showAnonymousDetail()} style={responsiveStyles.uncountableButton}>
                <Icon name='eye-off' color={Color.grayColor} size={24} />
             </TouchableOpacity>
  }

  render() {
    const numberOfParticipant = Scorecard.find(this.props.scorecardUuid).number_of_participant;
    this.totalParticipant = numberOfParticipant;
    let doms = null;

    if (Participant.getAll(this.props.scorecardUuid).length > 0) {
      doms = this.props.participants.map((participant, index) =>
        <ParticipantListItemInfo
          key={index}
          participant={participant}
          onPress={() => this.props.showParticipantBottomSheet(participant)}
          containerStyle={[responsiveStyles.itemContainer, listItemStyles.card]}
          hasArrowIcon={true}
          rightIcon={this.renderRightIcon(participant)}
          arrowColor={Color.headerColor}
        />
      )
    }

    return doms;
  }
}

export default ParticipantList;