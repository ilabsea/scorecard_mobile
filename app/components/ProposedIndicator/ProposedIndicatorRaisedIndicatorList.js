import React from 'react';
import {View} from 'react-native';
import AudioCardView from 'react-native-audio-card-view';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {connect} from 'react-redux';

import ProposedIndicatorRaisedParticipantBottomSheet from './ProposedIndicatorRaisedParticipantBottomSheet';
import ProposedIndicatorConfirmDeleteModal from './ProposedIndicatorConfirmDeleteModal';
import SwipeLeftButton from '../Share/SwipeLeftButton';
import {LocalizationContext} from '../Translations';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import { getDeviceStyle, isSmallMobileScreenDevice } from '../../utils/responsive_util';
import {proposedInfoModaSnapPoints} from '../../constants/modal_constant';
import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import {saveParticipant} from '../../actions/participantAction';
import {setSelectedIndicators} from '../../actions/selectedIndicatorAction';

import cardItemTabletStyles from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);

class ProposedIndicatorRaisedIndicatorList extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      visibleModal: false,
    }
    this.listRef = []
    this.prevOpenedRow = null;
    this.selectedIndicatorableId;
  }

  showRaisedParticipant = (indicator) => {
    this.props.formModalRef.current?.setSnapPoints(proposedInfoModaSnapPoints)
    this.props.formModalRef.current?.setBodyContent(<ProposedIndicatorRaisedParticipantBottomSheet indicator={indicator} scorecardUuid={this.props.scorecardUuid}/>)
    this.props.participantModalRef.current?.present();
  }

  renderDeleteButton(indicator, index)  {
    const btnStyles = getDeviceStyle({ height: 105, marginTop: 12, width: 90 }, { height: isSmallMobileScreenDevice() ? 90 : 95, marginTop: 14 })
    return <SwipeLeftButton label={this.context.translations.delete} customStyle={btnStyles} onPress={() =>  this.showConfirmModal(indicator, index)} />
  }

  showConfirmModal = (indicator, index) => {
    this.setState({visibleModal: true})
    this.selectedIndicatorableId = indicator.indicatorable_id;
    this.listRef[index].close()
  }

  handleCloseRow = (index) => {
    if (this.prevOpenedRow && this.prevOpenedRow !== this.listRef[index])
      this.prevOpenedRow.close();

    this.prevOpenedRow = this.listRef[index];
  }

  renderIndicatorList = () => {
    return proposedIndicatorService.getProposedIndicators(this.props.scorecardUuid).map((indicator, index) => {
      return (
        <Swipeable
          key={indicator.uuid}
          ref={ref => { this.listRef[index] = ref }}
          renderRightActions={() => (this.renderDeleteButton(indicator, index))}
          onSwipeableOpen={() => this.handleCloseRow(index) }
          enabled={this.props.isIndicatorBase}
        >
          <AudioCardView
            key={indicator.uuid}
            containerStyle={styles.indicatorCardContainer}
            title={indicator.name}
            subtitle={proposedIndicatorHelper.getCardSubtitle(this.context.translations, this.props.scorecardUuid, indicator.indicatorable_id)}
            hideAudioPlayer={true}
            titleStyle={[{marginTop: 0}, styles.label]}
            subtitleStyle={styles.subLabel}
            onPress={() => this.showRaisedParticipant(indicator)}
          />
        </Swipeable>
      );
    })
  }

  confirmDelete = () => {
    ProposedIndicator.deleteByIndicator(this.props.scorecardUuid, this.selectedIndicatorableId)
    this.setState({visibleModal: false})
    const participants = JSON.parse(JSON.stringify(Participant.getAllByScorecard(this.props.scorecardUuid)));
    this.props.saveParticipant(participants, this.props.scorecardUuid);         //call saveParticipant to make the switcher info update after deletion
    this.props.setSelectedIndicators(proposedIndicatorService.getProposedIndicators(this.props.scorecardUuid));
  }

  render() {
    return <View style={{marginTop: 6, zIndex: 0}}>
      {this.renderIndicatorList()}
      <ProposedIndicatorConfirmDeleteModal
        visible={this.state.visibleModal}
        onDismiss={() => this.setState({visibleModal: false})}
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
    setSelectedIndicators: (selectedIndicators) => dispatch(setSelectedIndicators(selectedIndicators)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposedIndicatorRaisedIndicatorList);