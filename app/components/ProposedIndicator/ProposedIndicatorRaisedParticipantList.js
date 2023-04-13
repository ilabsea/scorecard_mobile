import React from 'react';
import {View} from 'react-native';
import AudioCardView from 'react-native-audio-card-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {connect} from 'react-redux';

import { LocalizationContext } from '../Translations';
import ProposedIndicatorRaisedIndicatorBottomSheet from './ProposedIndicatorRaisedIndicatorBottomSheet';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import SwipeLeftButton from '../Share/SwipeLeftButton';
import BoldLabel from '../Share/BoldLabel';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import Color from '../../themes/color';
import Participant from '../../models/Participant';
import ProposedIndicator from '../../models/ProposedIndicator';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import {navigationRef} from '../../navigators/app_navigator';
import {saveParticipant} from '../../actions/participantAction';
import cardItemTabletStyles from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);

class ProposedIndicatorRaisedParticipantList extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      visibleModal: false,
      selectedParticipant: null
    }
    this.listRef = []
    this.prevOpenedRow = null;
  }

  showRaisedParticipant = (participant) => {
    this.props.formModalRef.current?.setBodyContent(<ProposedIndicatorRaisedIndicatorBottomSheet participant={participant} scorecardUuid={this.props.scorecardUuid}/>)
    this.props.participantModalRef.current?.present();
  }

  goToEdit = (participant, index) => {
    this.listRef[index].close()
    navigationRef.current?.navigate('ProposeNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant.uuid})
  }

  showConfirmModal = (participant, index) => {
    this.setState({visibleModal: true, selectedParticipant: participant})
    this.listRef[index].close()
  }

  renderRightButtons = (participant, index) => {
    const {translations} = this.context;
    const btnStyles = getDeviceStyle({ height: 70, marginTop: 8, width: 90 }, { height: 60, marginTop: 8 })
    return <View style={{flexDirection: 'row'}}>
              <SwipeLeftButton label={translations.edit} backgroundColor={Color.lightBlue} customStyle={btnStyles} onPress={() => this.goToEdit(participant, index)} />
              <SwipeLeftButton label={translations.delete} customStyle={btnStyles} onPress={() => this.showConfirmModal(participant, index)} />
           </View>
  }

  handleCloseRow = (index) => {
    if (this.prevOpenedRow && this.prevOpenedRow !== this.listRef[index])
      this.prevOpenedRow.close();

    this.prevOpenedRow = this.listRef[index];
  }

  renderParticipantList = () => {
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 14);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);

    return Participant.getRaisedParticipants(this.props.scorecardUuid).map((participant, index) => {
      return (
        <Swipeable key={participant.uuid}
          ref={ref => { this.listRef[index] = ref }}
          renderRightActions={() => (this.renderRightButtons(participant, index))}
          containerStyle={{paddingBottom: 6, paddingHorizontal: 2}}
          onSwipeableOpen={() => this.handleCloseRow(index) }
          enabled={!this.props.isIndicatorBase}
        >
          <AudioCardView containerStyle={styles.participantCardContainer} hideAudioPlayer={true} titleStyle={[{marginTop: 0}, styles.label]}>
            <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={{flex: 1}} onPress={() => this.showRaisedParticipant(participant)} />
          </AudioCardView>
        </Swipeable>
      )
    })
  }

  confirmDelete = () => {
    ProposedIndicator.deleteByParticipant(this.props.scorecardUuid, this.state.selectedParticipant.uuid)
    this.setState({selectedParticipant: null, visibleModal: false})
    const participants = JSON.parse(JSON.stringify(Participant.getAllByScorecard(this.props.scorecardUuid)));
    this.props.saveParticipant(participants, this.props.scorecardUuid);         //call saveParticipant to make the switcher info update after deletion
  }

  render() {
    const {translations} = this.context;
    const participantNumber = <BoldLabel label={!!this.state.selectedParticipant ? this.state.selectedParticipant.order + 1 : ''} />

    return <View style={{marginTop: 12}}>
              {this.renderParticipantList()}
              <CustomAlertMessage
                visible={this.state.visibleModal}
                title={translations.deleteTheProposedIndicators}
                description={translations.formatString(translations.doYouWantToDeleteTheProposedIndicatorsOfThisParticipant, participantNumber)}
                closeButtonLabel={translations.close}
                hasConfirmButton={true}
                confirmButtonLabel={translations.ok}
                isConfirmButtonDisabled={false}
                onDismiss={() => this.setState({visibleModal: false, selectedParticipant: null})}
                onConfirm={() => this.confirmDelete()}
              />
           </View>
  }
}

function mapStateToProps(state) {
  return {
    participants: state.participantReducer.participants,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposedIndicatorRaisedParticipantList);