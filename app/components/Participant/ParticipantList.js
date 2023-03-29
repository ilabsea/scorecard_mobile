import React from 'react';
import DraggableFlatList from "react-native-draggable-flatlist";

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import ParticipantOrderChangedMessage from './ParticipantOrderChangedMessage';
import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';
import participantListingService from '../../services/participant_listing_service';
import Scorecard from '../../models/Scorecard';
import {SETUP} from '../../constants/scorecard_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const responsiveStyles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantList extends React.Component {
  state = {
    isDraggable: Scorecard.find(this.props.scorecardUuid).status == SETUP ? true : false
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", async () => {
      console.log('== on participant list focus ===')
      this.setState({isDraggable: Scorecard.find(this.props.scorecardUuid).status == SETUP ? true : false})
    });
  }
  
  componentWillUnmount() {
    this.focusListener && this.focusListener();
  }

  renderItem = (params) => {
    const {item, index, drag, isActive} = params;
    return <ParticipantListItemInfo
              participant={item}
              onPress={() => this.props.showParticipantBottomSheet(item)}
              containerStyle={[responsiveStyles.itemContainer, listItemStyles.card]}
              hasArrowIcon={true}
              arrowColor={Color.headerColor}
              isDraggable={true}
              onLongPress={this.state.isDraggable ? drag : null}
           />
  }

  updateParticipantOrder = (data, from, to) => {
    if (from == to) return

    !!this.props.updateParticipants && this.props.updateParticipants(participantListingService.updateParticipantOrder(data))
    this.props.formModalRef.current?.setBodyContent(<ParticipantOrderChangedMessage closeModal={() => this.props.participantModalRef.current?.dismiss()}/>)
    this.props.formModalRef.current?.setSnapPoints(['34%'])
    this.props.participantModalRef.current?.present();
  }

  render() {
    return (
      <DraggableFlatList
        data={this.props.participants}
        onDragEnd={({ data, from, to }) => this.updateParticipantOrder(data, from, to)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(params) => this.renderItem(params)}
        containerStyle={{marginHorizontal: -4}}
        disabled={true}
      />
    )
  }
}

export default ParticipantList;