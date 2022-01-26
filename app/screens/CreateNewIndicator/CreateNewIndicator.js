import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';
import {saveCriteria} from '../../actions/criteriaListAction';
import Color from '../../themes/color';
import SearchableHeader from '../../components/CreateNewIndicator/SearchableHeader';
import CreateNewIndicatorBody from '../../components/CreateNewIndicator/CreateNewIndicatorBody';

import Participant from '../../models/Participant';
import ProposedCriteria from '../../models/ProposedCriteria';
import proposedCriteriaService from '../../services/proposedCriteriaService';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';

class CreateNewIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isValid: false,
      indicators: [],
      selectedIndicators: JSON.parse(JSON.stringify(ProposedCriteria.find(props.route.params.scorecard_uuid, props.route.params.participant_uuid))),
      unselectedIndicators: [],
      participantUuid: this.props.route.params.participant_uuid,
      customIndicator: null,
      isSearching: false,
      isEdit: false,
      selectedCustomIndicator: null,
    };
  }

  componentDidMount() {
    const proposedCriterias = ProposedCriteria.find(this.props.route.params.scorecard_uuid, this.state.participantUuid);
    this.setState({isValid: (proposedCriterias != undefined && proposedCriterias.length > 0) ? true : false});
    this.updateIndicatorList();
  }

  selectIndicator = (selectedIndicators, unselectedIndicators, isModalVisible = false) => {
    this.setState({
      selectedIndicators: selectedIndicators,
      unselectedIndicators: unselectedIndicators,
      isValid: createNewIndicatorHelper.isAbleToSaveIndicator(selectedIndicators),
      selectedCustomIndicator: null,
      isModalVisible: isModalVisible,
    });
  };

  closeModal = () => {
    const otherIndicatorIndex = this.state.indicators.length - 1;
    const newIndicators = this.state.indicators;
    newIndicators[otherIndicatorIndex].isSelected = false;

    this.setState({
      isModalVisible: false,
      indicators: newIndicators,
      selectedCustomIndicator: null,
    });
  }

  // Update the custom indicators list after edit the custom indicator
  updateCustomIndicator(customIndicator) {
    this.setState({
      isModalVisible: false,
      selectedCustomIndicator: null,
      selectedIndicators: createNewIndicatorHelper.getUpdatedSelectedIndicators(this.state.selectedIndicators, customIndicator),
    }, () => this.updateIndicatorList());

    const participants = JSON.parse(JSON.stringify(Participant.findByScorecard(this.props.route.params.scorecard_uuid)));
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  // Update the indicators list after create new custom indicator
  saveCustomIndicator = (customIndicator) => {
    let selectedIndicators = this.state.selectedIndicators;
    selectedIndicators.push(customIndicator);

    this.setState({
      selectedIndicators: selectedIndicators,
      isModalVisible: false,
      isValid: true,
      customIndicator: customIndicator,
    }, () => this.updateIndicatorList());
  }

  save = () => {
    const params = {
      scorecard_uuid: this.props.route.params.scorecard_uuid,
      participant_uuid: this.state.participantUuid,
      unselected_indicators: this.state.unselectedIndicators,
      selected_indicators: this.state.selectedIndicators,
    };

    proposedCriteriaService.saveProposedCriterias(params, (participants) => {
      this.props.saveCriteria(this.props.route.params.scorecard_uuid);
      this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
      this.props.navigation.goBack();
    });
  }

  updateSelectedParticipant(indicatorDataset) {
    if (this.state.participantUuid != indicatorDataset.participant_uuid) {
      this.setState({
        isValid: false,
        customIndicator: null,
        unselectedIndicators: [],
        selectedIndicators: indicatorDataset.selected_indicators,
        indicators: indicatorDataset.indicators,
        participantUuid: indicatorDataset.participant_uuid
      });
    }
  }

  updateIndicatorList = () => {
    const indicatorDataset = createNewIndicatorHelper.getIndicatorDataset(this.props.route.params.scorecard_uuid, this.state.selectedIndicators, this.state.isEdit);

    this.setState({
      indicators: indicatorDataset.indicators,
      groupedIndicators: indicatorDataset.groupedIndicators,
    });
  }

  updateSearchedIndicator = (indicatorDataset) => {
    const { unselectedIndicators, selectedIndicators } = this.state;
    const allSelectedIndicators = indicatorDataset.selectedIndicators;
    let newSelectedIndicators = createNewIndicatorHelper.getNewSelectedIndicators(allSelectedIndicators, selectedIndicators, unselectedIndicators);

    this.setState({
      indicators: createNewIndicatorHelper.getUpdatedIndicators(indicatorDataset.indicators, unselectedIndicators),
      selectedIndicators: newSelectedIndicators,
      isValid: createNewIndicatorHelper.isAbleToSaveIndicator(newSelectedIndicators),
      groupedIndicators: indicatorDataset.groupedIndicators,
    });
  }

  updateEditStatus(isEdit) {
    this.setState({ isEdit: isEdit }, () => this.updateIndicatorList());
  }

  renderSearchableHeader() {
    return (
      <SearchableHeader
        scorecardUuid={this.props.route.params.scorecard_uuid}
        onBackPress={() => this.props.navigation.goBack()}
        updateSearchedIndicator={this.updateSearchedIndicator}
        updateSearchStatus={(status) => this.setState({ isSearching: status })}
        updateIsEditStatus={(isEdit) => this.updateEditStatus(isEdit)}
        isEdit={this.state.isEdit}
        selectedIndicators={this.state.selectedIndicators}
        isSearching={this.state.isSearching}
      />
    )
  }

  editCustomIndicator(customIndicator) {
    Keyboard.dismiss();
    this.setState({
      isModalVisible: true,
      selectedCustomIndicator: customIndicator
    });
  }

  renderBody() {
    return <CreateNewIndicatorBody
            scorecardUuid={this.props.route.params.scorecard_uuid}
            participantUuid={this.state.participantUuid}
            indicators={this.state.indicators}
            selectedIndicators={this.state.selectedIndicators}
            unselectedIndicators={this.state.unselectedIndicators}
            groupedIndicators={this.state.groupedIndicators}
            customIndicator={this.state.customIndicator}
            selectedCustomIndicator={this.state.selectedCustomIndicator}
            isSearching={this.state.isSearching}
            isEdit={this.state.isEdit}
            isValid={this.state.isValid}
            isModalVisible={this.state.isModalVisible}
            save={() => this.save()}
            selectIndicator={this.selectIndicator}
            editCustomIndicator={(customIndicator) => this.editCustomIndicator(customIndicator)}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            stopEditing={() => this.updateEditStatus(false)}
            closeModal={() => this.closeModal()}
            stopSearching={() => this.setState({ isSearching: false })}
            updateSearchedIndicator={this.updateSearchedIndicator}
            updateCustomIndicator={(customIndicator) => this.updateCustomIndicator(customIndicator)}
            saveCustomIndicator={(customIndicator) => this.saveCustomIndicator(customIndicator)}
          />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          { this.renderSearchableHeader() }
          <View style={{flex: 1, backgroundColor: Color.whiteColor, padding: containerPadding, paddingBottom: 0, paddingTop: containerPaddingTop}}>
            { this.renderBody() }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

function mapDispatchToProps(dispatch) {
  return {
    saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID)),
    saveCriteria: (scorecardUUID) => dispatch(saveCriteria(scorecardUUID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewIndicator);