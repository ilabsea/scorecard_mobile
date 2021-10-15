import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Portal} from 'react-native-paper';

import {LocalizationContext} from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import CriteriaSelection from '../../components/RaisingProposed/CriteriaSelection';
import RaisingProposedCustomIndicatorList from '../../components/RaisingProposed/RaisingProposedCustomIndicatorList';
import AddNewIndicatorModal from '../../components/RaisingProposed/AddNewIndicatorModal';
import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';
import {saveCriteria} from '../../actions/criteriaListAction';

import Color from '../../themes/color';
import CreateNewIndicatorParticipantInfo from '../../components/CreateNewIndicator/CreateNewIndicatorParticipantInfo';
import SearchableHeader from '../../components/CreateNewIndicator/SearchableHeader';

import CustomIndicator from '../../models/CustomIndicator';
import Participant from '../../models/Participant';
import ProposedCriteria from '../../models/ProposedCriteria';

import IndicatorService from '../../services/indicator_service';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import { getDeviceStyle, mobileSubTitleSize, containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import customIndicatorService from '../../services/custom_indicator_service';
import proposedCriteriaService from '../../services/proposedCriteriaService';

const headerTitleSize = getDeviceStyle(18, mobileSubTitleSize());

class CreateNewIndicator extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.indicatorSelectionRef = React.createRef();
    this.state = {
      isModalVisible: false,
      isValid: false,
      indicators: [],
      selectedIndicators: JSON.parse(JSON.stringify(proposedCriteriaService.getAllByParticipant(props.route.params.scorecard_uuid, props.route.params.participant_uuid))),
      unselectedIndicators: [],
      groupedIndicators: [],
      participant_uuid: this.props.route.params.participant_uuid,
      customIndicator: null,
      isSearching: false,
      isEdit: false,
      selectedCustomIndicator: null,
    };
  }

  componentDidMount() {
    const proposedCriterias = ProposedCriteria.find(this.props.route.params.scorecard_uuid, this.state.participant_uuid);
    this.setState({isValid: (proposedCriterias != undefined && proposedCriterias.length > 0) ? true : false});
    this._updateIndicatorList();
  }

  selectIndicator = (selectedIndicators, unselectedIndicators, isModalVisible) => {
    this.setState({
      selectedIndicators: selectedIndicators,
      unselectedIndicators: unselectedIndicators,
      isModalVisible: isModalVisible,
      isValid: createNewIndicatorHelper.isAbleToSaveIndicator(selectedIndicators),
      selectedCustomIndicator: null,
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

  updateCustomIndicator(customIndicator) {
    this.setState({
      isModalVisible: false,
      indicators: customIndicatorService.getIndicatorList(this.props.route.params.scorecard_uuid, ''),
      selectedCustomIndicator: null,
      selectedIndicators: createNewIndicatorHelper.getUpdatedSelectedIndicators(this.state.selectedIndicators, customIndicator),
    });

    const participants = JSON.parse(JSON.stringify(Participant.findByScorecard(this.props.route.params.scorecard_uuid)));
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  saveCustomIndicator = (customIndicator) => {
    let selectedIndicators = this.state.selectedIndicators;
    selectedIndicators.push(customIndicator);

    this.setState({
      selectedIndicators: selectedIndicators,
      isModalVisible: false,
      isValid: true,
      customIndicator: customIndicator,
    });
    
    this._updateIndicatorList();
  }

  save = () => {
    const { scorecard_uuid, participant_uuid } = this.props.route.params;
    let participants = JSON.parse(JSON.stringify(Participant.findByScorecard(scorecard_uuid)));

    createNewIndicatorHelper.deleteUnselectedProposedIndicator(scorecard_uuid, participant_uuid, this.state.unselectedIndicators);
    createNewIndicatorHelper.createNewProposedIndicator(scorecard_uuid, participant_uuid, this.state.selectedIndicators);
    Participant.create({ uuid: this.state.participant_uuid, raised: true });

    this.props.saveCriteria(scorecard_uuid);
    this.props.saveParticipant(participants, scorecard_uuid);
    this.props.navigation.goBack();
  }

  renderSaveButton = () => {
    const {translations} = this.context;

    if (this.state.isSearching || this.state.isEdit)
      return;

    return (
      <View style={{padding: containerPadding, paddingHorizontal: 0}}>
        <BottomButton disabled={!this.state.isValid} label={translations['saveAndGoNext']} onPress={() => this.save()} />
      </View>
    );
  };

  _renderParticipant() {
    if (this.state.isSearching || this.state.isEdit)
      return;

    return (
      <CreateNewIndicatorParticipantInfo
        scorecardUuid={this.props.route.params.scorecard_uuid}
        participantUuid={this.props.route.params.participant_uuid}
        onGetParticipant={(participant) => this.setState({participant_uuid: participant.uuid})}
        navigation={this.props.navigation}
      />
    )
  }

  _updateIndicatorList = () => {
    const { translations } = this.context;
    const indicatorService = new IndicatorService();
    const allCriteria = indicatorService.getIndicatorList(this.props.route.params.scorecard_uuid, '', translations.addNewCriteria, this.state.selectedIndicators);

    this.setState({
      indicators: allCriteria.indicators,
      selectIndicators: allCriteria.selectedIndicators,
      groupedIndicators: allCriteria.groupedIndicators,
    });
  }

  updateSearchedIndicator = (indicatorDataset) => {
    const { unselectedIndicators, selectedIndicators } = this.state;
    const allSelectedIndicators = indicatorDataset.selectedIndicators;
    let newSelectedIndicators = createNewIndicatorHelper.getNewSelectedIndicators(allSelectedIndicators, selectedIndicators, unselectedIndicators);
    // The getNewSelectedIndicators requires all selected indicators, selected indicators that are not saved yet, and unselected indicators

    this.setState({
      indicators: createNewIndicatorHelper.getUpdatedIndicators(indicatorDataset.indicators, unselectedIndicators),
      selectedIndicators: newSelectedIndicators,
      isValid: createNewIndicatorHelper.isAbleToSaveIndicator(newSelectedIndicators),
      groupedIndicators: indicatorDataset.groupedIndicators,
    });
  }

  updateEditStatus(isEdit) {
    this.setState({ isEdit: isEdit });

    if (isEdit)
      this.setState({ indicators: CustomIndicator.getAll(this.props.route.params.scorecard_uuid) });
    else
      this._updateIndicatorList();
  }

  renderSearchableHeader() {
    return (
      <SearchableHeader
        scorecardUuid={this.props.route.params.scorecard_uuid}
        participantUuid={this.props.route.params.participant_uuid}
        onBackPress={() => this.props.navigation.goBack()}
        updateSearchedIndicator={this.updateSearchedIndicator}
        updateSearchStatus={(status) => this.setState({ isSearching: status })}
        updateIsEditStatus={(isEdit) => this.updateEditStatus(isEdit)}
        isEdit={this.state.isEdit}
      />
    )
  }

  renderCriteriaList() {
    return (
      <CriteriaSelection
        ref={this.indicatorSelectionRef}
        selectIndicator={this.selectIndicator}
        scorecardUUID={this.props.route.params.scorecard_uuid}
        participantUUID={this.props.route.params.participant_uuid}
        indicators={this.state.indicators}
        selectedIndicators={this.state.selectedIndicators}
        unselectedIndicators={this.state.unselectedIndicators}
        groupedIndicators={this.state.groupedIndicators}
        customIndicator={this.state.customIndicator}
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

  renderCustomIndicatorList() {
    return (
      <RaisingProposedCustomIndicatorList
        scorecardUuid={this.props.route.params.scorecard_uuid}
        indicators={this.state.indicators}
        editCustomIndicator={(indicator) => this.editCustomIndicator(indicator)}
        selectedCustomIndicator={this.state.selectedCustomIndicator}
      />
    )
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          { this.renderSearchableHeader() }
          <View style={{flex: 1, backgroundColor: Color.whiteColor, padding: containerPadding, paddingBottom: 0, paddingTop: containerPaddingTop}}>
            { this._renderParticipant() }

            { (!this.state.isSearching && !this.state.isEdit) &&
              <Text style={{fontSize: headerTitleSize, color: Color.lightBlackColor, marginTop: 20}}>
                {translations['chooseProposedCriteria']}
              </Text>
            }

            { !this.state.isEdit ? this.renderCriteriaList() : this.renderCustomIndicatorList() }

            { this.renderSaveButton() }

            <Portal>
              <AddNewIndicatorModal
                isVisible={this.state.isModalVisible}
                closeModal={() => this.closeModal()}
                saveCustomIndicator={this.saveCustomIndicator}
                participantUUID={this.props.route.params.participant_uuid}
                scorecardUUID={this.props.route.params.scorecard_uuid}
                selectedCustomIndicator={this.state.selectedCustomIndicator}
                isEdit={this.state.isEdit}
                updateCustomIndicator={(customIndicator) => this.updateCustomIndicator(customIndicator)}
              />
            </Portal>
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