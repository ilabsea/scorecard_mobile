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
import { updateRaisedParticipants } from '../../services/participant_service';
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
      participantUuid: !!props.route.params.participant_uuid ? props.route.params.participant_uuid : null,
    };

    this.participantModalRef = React.createRef();
    this.formModalRef = React.createRef();

    let previousProposedIndicators = [];

    if (props.route.params.participant_uuid) {
      const { scorecard_uuid, participant_uuid } = this.props.route.params;

      this.lastOrderNumber = ProposedIndicator.getLastOrderNumberOfParticipant(scorecard_uuid, participant_uuid); // Last order of the proposed indicator of the participant
      previousProposedIndicators = ProposedIndicator.find(scorecard_uuid, participant_uuid);   // Previous proposed indicators of the participant
    }
    else {
      this.lastOrderNumber = ProposedIndicator.getLastOrderNumberOfScorecard(props.route.params.scorecard_uuid);   // last order of the proposed indicator of the scorecard
      previousProposedIndicators = ProposedIndicator.getAllByScorecard(props.route.params.scorecard_uuid);    // Previous proposed indicators of the scorecard
    }

    AsyncStorage.setItem('previous-proposed-indicators', JSON.stringify(previousProposedIndicators));
    this.componentIsUnmount = false;
  }

  componentDidMount() {
    this.updateIndicatorList();
  }

  componentWillUnmount() { this.componentIsUnmount = true; }

  async updateIndicatorList() {
    if (this.componentIsUnmount)
      return;

    const { scorecard_uuid } = this.props.route.params;
    this.setState({ indicators: await new IndicatorService().getIndicatorList(scorecard_uuid, this.state.searchedName, this.state.isEdit) });
  }

  updateParticipantInfo() {
    const participants = JSON.parse(JSON.stringify(Participant.findByScorecard(this.props.route.params.scorecard_uuid)));
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  save = () => {
    updateRaisedParticipants(this.props.route.params.scorecard_uuid);

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

  handleUnconfirmedIndicator() {
    proposedIndicatorService.handleUnconfirmedIndicator(this.props.route.params.scorecard_uuid, this.state.participantUuid, this.lastOrderNumber);
  }

  renderSearchableHeader() {
    return (
      <SearchableHeader
        updateSearchedName={(name) => this.updateSearchedName(name)}
        updateSearchStatus={(isSearching) => this.updateEditAndSearchStatus(isSearching, false)}
        updateEditStatus={(isEdit) => this.updateEditAndSearchStatus(isEdit, true)}
        handleUnconfirmedIndicator={() => this.handleUnconfirmedIndicator()}
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
            handleUnconfirmedIndicator={() => this.handleUnconfirmedIndicator()}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            formModalRef={this.formModalRef}
            participantModalRef={this.participantModalRef}
          />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          { this.renderSearchableHeader() }
          
          { this.renderBody() }

          <FormBottomSheetModal ref={this.formModalRef} formModalRef={this.participantModalRef} snapPoints={participantModalSnapPoints} />
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