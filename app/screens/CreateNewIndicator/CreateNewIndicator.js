import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import SearchableHeader from '../../components/CreateNewIndicator/SearchableHeader';
import CreateNewIndicatorBody from '../../components/CreateNewIndicator/CreateNewIndicatorBody';

import CustomIndicator from '../../models/CustomIndicator';
import Participant from '../../models/Participant';
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

  updateEditStatus(isEdit) {
    this.setState({ isEdit: isEdit }, () => {
      this.updateIndicatorList();
    });
  }

  updateSearchedName(name) {
    this.setState({ searchedName: name }, () => { this.updateIndicatorList() });
  }

  renderSearchableHeader() {
    return (
      <SearchableHeader
        onBackPress={() => this.props.navigation.goBack()}
        updateSearchedName={(name) => this.updateSearchedName(name)}
        updateSearchStatus={(status) => this.setState({ isSearching: status })}
        updateEditStatus={(isEdit) => this.updateEditStatus(isEdit)}
        isEdit={this.state.isEdit}
        isSearching={this.state.isSearching}
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
            updateEditStatus={(isEdit) => this.updateEditStatus(isEdit)}
            updateSearchStatus={(status) => this.setState({ isSearching: status })}
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