import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import SearchableHeader from '../../components/CreateNewIndicator/SearchableHeader';
import CreateNewIndicatorBody from '../../components/CreateNewIndicator/CreateNewIndicatorBody';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import Participant from '../../models/Participant';
import ProposedIndicator from '../../models/ProposedIndicator';
import IndicatorService from '../../services/indicator_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { participantModalSnapPoints } from '../../constants/modal_constant';

class CreateNewIndicator extends Component {
  constructor(props) {
    super(props);
    this.indicatorSelectionRef = React.createRef();
    this.state = {
      indicators: [],
      searchedName: '',
      isSearching: false,
      isEdit: false,
      participantUuid: props.route.params.participant_uuid,
    };

    // Get the previous proposed indicators of the participant
    const previousProposedIndicators = ProposedIndicator.find(scorecard_uuid, participant_uuid);
    AsyncStorage.setItem('previous-proposed-indicators', JSON.stringify(previousProposedIndicators));
    this.lastOrderNumber = ProposedIndicator.getLastOrderNumberOfParticipant(props.route.params.scorecard_uuid, props.route.params.participant_uuid);
    this.participantModalRef = React.createRef();
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.updateIndicatorList();
  }

  updateIndicatorList() {
    const { scorecard_uuid } = this.props.route.params;
    this.setState({ indicators: new IndicatorService().getIndicatorList(scorecard_uuid, this.state.searchedName, this.state.isEdit) });
  }

  updateParticipantInfo() {
    const participants = JSON.parse(JSON.stringify(Participant.findByScorecard(this.props.route.params.scorecard_uuid)));
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  saveCustomIndicator = () => {
    this.updateIndicatorList();
    this.setState({
      isModalVisible: false,
      isValid: true,
    });
  }

  save = () => {
    Participant.create({ uuid: this.state.participantUuid, raised: true });
    this.updateParticipantInfo();
    this.props.navigation.goBack();
  }

  updateEditAndSearchStatus(status, isEdit) {
    this.setState({
      isEdit: isEdit ? status : this.state.isEdit,
      isSearching: !isEdit ? status : this.state.isSearching,
      searchedName: '',
    }, () => {
      this.updateIndicatorList();
    });
  }

  updateSearchedName(name) {
    this.setState({ searchedName: name }, () => { this.updateIndicatorList() });
  }

  renderSearchableHeader() {
    return (
      <SearchableHeader
        updateSearchedName={(name) => this.updateSearchedName(name)}
        updateSearchStatus={(isSearching) => this.updateEditAndSearchStatus(isSearching, false)}
        updateEditStatus={(isEdit) => this.updateEditAndSearchStatus(isEdit, true)}
        handleUnconfirmedIndicator={() => proposedIndicatorService.handleUnconfirmedIndicator(this.props.route.params.scorecard_uuid, this.state.participantUuid, this.lastOrderNumber)}
        isEdit={this.state.isEdit}
        isSearching={this.state.isSearching}
        searchedName={this.state.searchedName}
      />
    )
  }

  updateSelectedParticipant(participantUuid) {
    this.setState({ participantUuid }, () => { this.updateIndicatorList(); });
  }

  renderBody() {
    return <CreateNewIndicatorBody
            indicators={this.state.indicators}
            scorecardUuid={this.props.route.params.scorecard_uuid}
            participantUuid={this.state.participantUuid}
            isEdit={this.state.isEdit}
            isSearching={this.state.isSearching}
            updateEditStatus={(isEdit) => this.updateEditAndSearchStatus(isEdit, true)}
            updateSearchStatus={(isSearching) => this.updateEditAndSearchStatus(isSearching, false)}
            updateIndicatorList={() => this.updateIndicatorList()}
            updateParticipantInfo={() => this.updateParticipantInfo()}
            save={() => this.save()}
            removeUnconfirmedProposedIndicator={() => this.removeUnconfirmedProposedIndicator()}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            formModalRef={this.formRef}
            participantModalRef={this.participantModalRef}
          />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          { this.renderSearchableHeader() }
          
          { this.renderBody() }

          <FormBottomSheetModal
            ref={this.formRef}
            formModalRef={this.participantModalRef}
            snapPoints={participantModalSnapPoints}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CreateNewIndicator);