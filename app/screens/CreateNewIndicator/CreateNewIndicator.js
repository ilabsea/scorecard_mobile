import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Portal} from 'react-native-paper';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

import {LocalizationContext} from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import CriteriaSelection from '../../components/RaisingProposed/CriteriaSelection';
import AddNewIndicatorModal from '../../components/RaisingProposed/AddNewIndicatorModal';
import {saveParticipant} from '../../actions/participantAction';
import uuidv4 from '../../utils/uuidv4';
import {connect} from 'react-redux';
import {saveCriteria} from '../../actions/criteriaListAction';
import { CUSTOM } from '../../utils/variable';

import Color from '../../themes/color';
import CreateNewIndicatorParticipantInfo from '../../components/CreateNewIndicator/CreateNewIndicatorParticipantInfo';
import SearchableHeader from '../../components/CreateNewIndicator/SearchableHeader';
import TourTipButton from '../../components/TourTipButton';

import CustomIndicator from '../../models/CustomIndicator';
import LanguageIndicator from '../../models/LanguageIndicator';
import Participant from '../../models/Participant';
import ProposedCriteria from '../../models/ProposedCriteria';

import IndicatorService from '../../services/indicator_service';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import { getDeviceStyle, mobileSubTitleSize, containerPaddingTop, containerPadding } from '../../utils/responsive_util';

const WalkableView = walkthroughable(View);
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
      selectedIndicators: [],
      unselectedIndicators: [],
      participant_uuid: this.props.route.params.participant_uuid,
      customIndicator: null,
      showTourTip: false,
      isSearching: false,
      isEdit: false,
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
    });
  };

  closeModal = () => {
    const otherIndicatorIndex = this.state.indicators.length - 1;
    const newIndicators = this.state.indicators;
    newIndicators[otherIndicatorIndex].isSelected = false;

    this.setState({
      isModalVisible: false,
      indicators: newIndicators
    });
  }

  saveCustomIndicator = (customIndicator, customLanguageIndicator) => {
    let selectedIndicators = this.state.selectedIndicators;
    selectedIndicators.push(customIndicator);

    this.setState({selectedIndicators});

    CustomIndicator.create(customIndicator);
    LanguageIndicator.create(customLanguageIndicator);

    this.setState({
      isModalVisible: false,
      isValid: true,
      customIndicator: customIndicator,
    });
    
    this._updateIndicatorList();
  }

  updateRaisedParticipant = () => {
    const participant = {
      uuid: this.state.participant_uuid,
      raised: true,
    };

    Participant.create(participant);
  }

  save = () => {
    let participants = JSON.parse(JSON.stringify(Participant.findByScorecard(this.props.route.params.scorecard_uuid)));
    this.handleDeleteUnselectedProposedCriteria();
    this.state.selectedIndicators.map((indicator) => {
      const attrs = {
        uuid: this.getCriteriaUUID(indicator.uuid),
        scorecard_uuid: this.props.route.params.scorecard_uuid.toString(),
        indicatorable_id: indicator.uuid.toString(),
        indicatorable_type: indicator.type || CUSTOM,
        indicatorable_name: indicator.name,
        participant_uuid: this.state.participant_uuid,
        tag: indicator.tag
      };

      ProposedCriteria.create(attrs);
    });

    this.updateRaisedParticipant();
    this.props.saveCriteria(this.props.route.params.scorecard_uuid);
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
    this.props.navigation.goBack();
  }

  handleDeleteUnselectedProposedCriteria = () => {
    const proposedCriterias = this.getProposedCriteria(this.props.route.params.participant_uuid);
    let deleteCriterias = [];
    proposedCriterias.map((criteria) => {
      this.state.unselectedIndicators.map((indicator) => {
        if (indicator.uuid == criteria.indicatorable_id)
          deleteCriterias.push(criteria);
      })
    });
    deleteCriterias.map((criteria) => {
      const proposedCriteria = ProposedCriteria.findByParticipant(criteria.indicatorable_id, this.props.route.params.participant_uuid);
      ProposedCriteria.destory(proposedCriteria);
    });
  }

  getProposedCriteria = (participantUUID) => {
    return JSON.parse(JSON.stringify(ProposedCriteria.find(this.props.route.params.scorecard_uuid, participantUUID)));
  }

  getCriteriaUUID = (indicatorUUID) => {
    const proposedCriterias = this.getProposedCriteria(this.props.route.params.participant_uuid);
    for (let i=0; i<proposedCriterias.length; i++) {
      if (proposedCriterias[i].indicatorable_id === indicatorUUID.toString())
        return proposedCriterias[i].uuid;
    }
    return uuidv4();
  }

  renderSaveButton = () => {
    const {translations} = this.context;

    if (this.state.isSearching)
      return;

    return (
      <View style={{padding: containerPadding, paddingHorizontal: 0}}>
        { this.state.showTourTip &&
          <CopilotStep text={translations.clickOnSaveButtonToContinue} order={1} name="finishButton">
            <WalkableView>
              <BottomButton disabled={!this.state.isValid} label={translations['saveAndGoNext']} onPress={() => this.save()} />
            </WalkableView>
          </CopilotStep>
        }

        { !this.state.showTourTip &&
          <BottomButton disabled={!this.state.isValid} label={translations['saveAndGoNext']} onPress={() => this.save()} />
        }
      </View>
    );
  };

  _renderParticipant() {
    if (this.state.isSearching)
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
    const allCriteria = indicatorService.getIndicatorList(this.props.route.params.scorecard_uuid, this.state.participant_uuid, '', translations.addNewCriteria);

    this.setState({
      indicators: allCriteria.indicators,
      selectIndicators: allCriteria.selectedIndicators,
    });
  }

  startNextTourTip = () => {
    this.setState({ showTourTip: true });
    this.props.start();
  }

  updateSearchedIndicator = (indicators, allSelectedIndicators) => {
    const { unselectedIndicators, selectedIndicators } = this.state;
    let newSelectedIndicators = createNewIndicatorHelper.getNewSelectedIndicators(allSelectedIndicators, selectedIndicators, unselectedIndicators);

    this.setState({
      indicators: createNewIndicatorHelper.getUpdatedIndicators(indicators, unselectedIndicators),
      selectedIndicators: newSelectedIndicators,
      isValid: createNewIndicatorHelper.isAbleToSaveIndicator(newSelectedIndicators),
    });
  }

  renderSearchableHeader() {
    return (
      <SearchableHeader
        scorecardUuid={this.props.route.params.scorecard_uuid}
        participantUuid={this.props.route.params.participant_uuid}
        onBackPress={() => this.props.navigation.goBack()}
        updateSearchedIndicator={this.updateSearchedIndicator}
        updateSearchStatus={(status) => this.setState({ isSearching: status })}
        updateIsEditStatus={(status) => this.setState({ isEdit: status })}
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
        customIndicator={this.state.customIndicator}
        startNextTourTip={() => this.startNextTourTip()}
        isSearching={this.state.isSearching}
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

            { !this.state.isSearching &&
              <Text style={{fontSize: headerTitleSize, color: Color.lightBlackColor, marginTop: 20}}>
                {translations['chooseProposedCriteria']}
              </Text>
            }

            { this.renderCriteriaList() }

            { this.renderSaveButton() }

            <Portal>
              <AddNewIndicatorModal
                isVisible={this.state.isModalVisible}
                closeModal={() => this.closeModal()}
                saveCustomIndicator={this.saveCustomIndicator}
                participantUUID={this.props.route.params.participant_uuid}
                scorecardUUID={this.props.route.params.scorecard_uuid}
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

export default copilot({
  overlay: 'svg',
  animated: true,
  verticalOffset: 24,
  backdropColor: "rgba(31, 31, 31, 0.7)",
  labels: {
    finish: <TourTipButton label='finish' />
  },
  stepNumberComponent: () => (<View/>)
})(connect(mapStateToProps, mapDispatchToProps)(CreateNewIndicator));