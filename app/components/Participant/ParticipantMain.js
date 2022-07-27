import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {LocalizationContext} from '../Translations';
import ParticipantHeader from './ParticipantHeader';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import EmptyListAction from '../Share/EmptyListAction';
import AddNewParticipantMain from '../ParticipantModal/AddNewParticipantMain';

import { participantContentHeight } from '../../constants/modal_constant';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';
import Participant from '../../models/Participant';

import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const responsiveStyles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantMain extends React.Component {
  static contextType = LocalizationContext;

  showParticipantBottomSheet(selectedParticipant) {
    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantMain(selectedParticipant));
    this.props.participantModalRef.current?.present();
  }

  getAddNewParticipantMain(selectedParticipant) {
    return <AddNewParticipantMain
            scorecardUuid={ this.props.scorecardUuid }
            title={!!selectedParticipant ? this.context.translations.editParticipant : this.context.translations.addNewParticipant}
            subTitle={this.context.translations.participantInformation}
            selectedParticipant={selectedParticipant}
            onSaveParticipant={ (participant) => this.props.participantModalRef.current?.dismiss() }
            contentHeight={participantContentHeight}
          />
  }

  renderTitle() {
    return <ParticipantHeader
            participants={this.props.participants}
            addNewParticipant={() => this.showParticipantBottomSheet(null)} />
  }

  renderRightIcon(participant) {
    if (!participant.counted)
      return <TouchableOpacity style={responsiveStyles.uncountedButton}>
                <Icon name='eye-off' color={Color.grayColor} size={24} />
             </TouchableOpacity>
  }

  renderParticipantList = () => {
    const numberOfParticipant = Scorecard.find(this.props.scorecardUuid).number_of_participant;
    this.totalParticipant = numberOfParticipant;
    let doms = null;

    if (Participant.getAll(this.props.scorecardUuid).length > 0) {
      doms = this.props.participants.map((participant, index) =>
        <ParticipantListItemInfo
          key={index}
          participant={participant}
          onPress={() => this.showParticipantBottomSheet(participant)}
          containerStyle={[responsiveStyles.itemContainer, listItemStyles.card]}
          hasArrowIcon={true}
          rightIcon={this.renderRightIcon(participant)}
          arrowColor={Color.headerColor}
        />
      )
    }

    return doms;
  }

  renderNoData() {
    return <EmptyListAction
            title={this.context.translations.pleaseAddParticipant}
            buttonLabel={this.context.translations.addNewParticipant}
            onPress={() => this.showParticipantBottomSheet(null)}
           />
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        { this.renderTitle() }
        { this.renderParticipantList() }
        { this.props.participants.length == 0 && this.renderNoData() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
    paddingHorizontal: 14,
    flexGrow: 1,
    paddingTop: containerPaddingTop,
  },
  itemColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParticipantMain;