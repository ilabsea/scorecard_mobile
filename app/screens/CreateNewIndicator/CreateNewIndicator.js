import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import SearchableHeader from '../../components/CreateNewIndicator/SearchableHeader';
import CreateNewIndicatorBody from '../../components/CreateNewIndicator/CreateNewIndicatorBody';

import CustomIndicator from '../../models/CustomIndicator';
import Participant from '../../models/Participant';
import ProposedIndicator from '../../models/ProposedIndicator';
import IndicatorService from '../../services/indicator_service';

class CreateNewIndicator extends Component {
  constructor(props) {
    super(props);
    this.indicatorSelectionRef = React.createRef();
    this.state = {
      indicators: [],
      searchedName: '',
      isSearching: false,
      isEdit: false,
    };

    this.lastOrderNumber = ProposedIndicator.getLastOrderNumberOfParticipant(props.route.params.scorecard_uuid, props.route.params.participant_uuid);
  }

  componentDidMount() {
    this.updateIndicatorList();
  }

  updateIndicatorList() {
    const { scorecard_uuid } = this.props.route.params;
    this.setState({
      indicators: !this.state.isEdit ? new IndicatorService().getIndicatorList(scorecard_uuid, this.state.searchedName) : CustomIndicator.getAll(scorecard_uuid)
    });
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
    Participant.create({ uuid: this.props.route.params.participant_uuid, raised: true });
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

  onBackPress() {
    const { scorecard_uuid, participant_uuid } = this.props.route.params;
    ProposedIndicator.destroyUnconfirmProposedIndicators(scorecard_uuid, participant_uuid, this.lastOrderNumber);
    this.props.navigation.goBack();
  }

  renderSearchableHeader() {
    return (
      <SearchableHeader
        onBackPress={() => this.onBackPress()}
        updateSearchedName={(name) => this.updateSearchedName(name)}
        updateSearchStatus={(isSearching) => this.updateEditAndSearchStatus(isSearching, false)}
        updateEditStatus={(isEdit) => this.updateEditAndSearchStatus(isEdit, true)}
        isEdit={this.state.isEdit}
        isSearching={this.state.isSearching}
        searchedName={this.state.searchedName}
      />
    )
  }

  renderBody() {
    return <CreateNewIndicatorBody
            indicators={this.state.indicators}
            scorecardUuid={this.props.route.params.scorecard_uuid}
            participantUuid={this.props.route.params.participant_uuid}
            isEdit={this.state.isEdit}
            isSearching={this.state.isSearching}
            updateEditStatus={(isEdit) => this.updateEditAndSearchStatus(isEdit, true)}
            updateSearchStatus={(isSearching) => this.updateEditAndSearchStatus(isSearching, false)}
            updateIndicatorList={() => this.updateIndicatorList()}
            updateParticipantInfo={() => this.updateParticipantInfo()}
            save={() => this.save()}
          />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          { this.renderSearchableHeader() }
          
          { this.renderBody() }
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