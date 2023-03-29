import React from 'react';
import DraggableFlatList from "react-native-draggable-flatlist";

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import ParticipantConfirmationBottomSheet from './ParticipantConfirmationBottomSheet';
import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';
import participantListingService from '../../services/participant_listing_service';
import Scorecard from '../../models/Scorecard';
import {SETUP} from '../../constants/scorecard_constant';
import {participantConfirmModalSnapPoints} from '../../constants/modal_constant';
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
      this.setState({isDraggable: Scorecard.find(this.props.scorecardUuid).status == SETUP ? true : false})
    });
  }
  
  componentWillUnmount() {
    this.focusListener && this.focusListener();
  }

  renderItem = (params) => {
    const {item, drag} = params;
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

    !!this.props.updateParticipants && this.props.updateParticipants(data)
    this.props.updateIsEditFormBottomSheet(false)
    this.props.formModalRef.current?.setBodyContent(<ParticipantConfirmationBottomSheet save={() => this.save(data)}/>)
    this.props.formModalRef.current?.setSnapPoints(participantConfirmModalSnapPoints)
    this.props.participantModalRef.current?.present();
  }

  save = (data) => {
    !!this.props.updateParticipants && this.props.updateParticipants(participantListingService.updateParticipantOrder(data))
    this.props.participantModalRef.current?.dismiss()
  }

  render() {
    return (
      <DraggableFlatList
        data={this.props.participants}
        onDragEnd={({ data, from, to }) => this.updateParticipantOrder(data, from, to)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(params) => this.renderItem(params)}
        containerStyle={{marginHorizontal: -1}}
        disabled={true}
      />
    )
  }
}

export default ParticipantList;