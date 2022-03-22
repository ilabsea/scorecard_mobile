import React from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import SearchableHeader from '../../components/CreateNewIndicator/SearchableHeader';
import IndicatorBaseBody from '../../components/ProposedIndicatorByIndicatorBase/IndicatorBaseBody';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import ProposedIndicatorParticipantList from '../../components/ProposedIndicatorByIndicatorBase/ProposedIndicatorParticipantList';

import CustomIndicator from '../../models/CustomIndicator';
import IndicatorService from '../../services/indicator_service';
import { indicatorParticipantListModalSnapPoints } from '../../constants/modal_constant';

class ProposedIndicatorByIndicatorBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indicators: [],
      searchedName: '',
      isSearching: false,
      isEdit: false,
      participants: [],
    }

    this.participantModalRef = React.createRef();
    this.formRef = React.createRef();
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

  updateSearchedName(name) {
    this.setState({ searchedName: name }, () => { this.updateIndicatorList() });
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

  renderSearchableHeader() {
    return (
      <SearchableHeader
        updateSearchedName={(name) => this.updateSearchedName(name)}
        updateSearchStatus={(isSearching) => this.updateEditAndSearchStatus(isSearching, false)}
        updateEditStatus={(isEdit) => this.updateEditAndSearchStatus(isEdit, true)}
        removeUnconfirmedProposedIndicator={() => this.removeUnconfirmedProposedIndicator()}
        isEdit={this.state.isEdit}
        isSearching={this.state.isSearching}
        searchedName={this.state.searchedName}
      />
    )
  }

  renderBody() {
    return <IndicatorBaseBody
            indicators={this.state.indicators}
            scorecardUuid={this.props.route.params.scorecard_uuid}
            participantUuid={this.state.participantUuid}
            isEdit={this.state.isEdit}
            isSearching={this.state.isSearching}
            updateEditStatus={(isEdit) => this.updateEditAndSearchStatus(isEdit, true)}
            updateSearchStatus={(isSearching) => this.updateEditAndSearchStatus(isSearching, false)}
            updateIndicatorList={() => this.updateIndicatorList()}
            updateParticipantInfo={() => this.updateParticipantInfo()}
            openParticipantList={(indicator) => this.openParticipantList(indicator)}
            save={() => this.save()}
            removeUnconfirmedProposedIndicator={() => this.removeUnconfirmedProposedIndicator()}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
          />
  }

  save = () => {
    // Participant.create({ uuid: this.state.participantUuid, raised: true });
    // this.updateParticipantInfo();
    this.props.navigation.goBack();
  }

  openParticipantList(indicator) {
    console.log('selected indicator == ', indicator)

    this.formRef.current?.setBodyContent(<ProposedIndicatorParticipantList scorecardUuid={this.props.route.params.scorecard_uuid} selectedIndicator={indicator} />);
    this.participantModalRef.current?.present();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          { this.renderSearchableHeader() }
          
          { this.renderBody() }

          <FormBottomSheetModal ref={this.formRef} formModalRef={this.participantModalRef} snapPoints={indicatorParticipantListModalSnapPoints} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ProposedIndicatorByIndicatorBase;