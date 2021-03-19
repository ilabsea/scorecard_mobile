import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Portal} from 'react-native-paper';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import CriteriaSelection from '../../components/RaisingProposed/CriteriaSelection';
import AddNewIndicatorModal from '../../components/RaisingProposed/AddNewIndicatorModal';
import {saveParticipant} from '../../actions/participantAction';
import uuidv4 from '../../utils/uuidv4';
import {connect} from 'react-redux';
import {saveCriteria} from '../../actions/criteriaListAction';
import { CUSTOM } from '../../utils/variable';

import ParticipantInfo from '../../components/CreateNewIndicator/ParticipantInfo';
import TourTipButton from '../../components/TourTipButton';

import IndicatorService from '../../services/indicator_service';

import { getDeviceStyle } from '../../utils/responsive_util';

import createNewIndicatorTabletStyles from '../../assets/stylesheets/screens/tablet/CreateNewIndicatorStyle';
import createNewIndicatorMobileStyles from '../../assets/stylesheets/screens/mobile/CreateNewIndicatorStyle';

const styles = getDeviceStyle(createNewIndicatorTabletStyles, createNewIndicatorMobileStyles);

const WalkableView = walkthroughable(View);
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
    };
  }

  componentDidMount() {
    const proposedCriterias = realm.objects('ProposedCriteria')
      .filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'" AND participant_uuid = "' + this.state.participant_uuid + '"');

    this.setState({isValid: (proposedCriterias != undefined && proposedCriterias.length > 0) ? true : false});
    this._updateIndicatorList();
  }

  selectIndicator = (criteriaSelectionState) => {
    this.setState({
      isModalVisible: criteriaSelectionState.isModalVisible,
      selectedIndicators: criteriaSelectionState.selectedIndicators,
      unselectedIndicators: criteriaSelectionState.unselectedIndicators,
      isValid: criteriaSelectionState.selectedIndicators.length > 0 ? true : false,
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
    realm.write(() => {
      realm.create('CustomIndicator', customIndicator, 'modified');
      realm.create('LanguageIndicator', customLanguageIndicator, 'modified');
    });

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
    realm.write(() => {realm.create('Participant', participant, 'modified')});
  }

  save = () => {
    let participants = JSON.parse(JSON.stringify(realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'"').sorted('order', false)));
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

      realm.write(() => { realm.create('ProposedCriteria', attrs, 'modified'); });
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
      const proposedCriteria = realm.objects('ProposedCriteria')
        .filtered(`indicatorable_id = '${criteria.indicatorable_id}' AND participant_uuid = '${this.props.route.params.participant_uuid}'`);

      realm.write(() => { realm.delete(proposedCriteria); });
    });
  }

  getProposedCriteria = (participantUUID) => {
    return JSON.parse(JSON.stringify(realm.objects('ProposedCriteria').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'" AND participant_uuid = "'+ participantUUID +'"')));
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

    return (
      <View style={{padding: 20, paddingHorizontal: 0}}>
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
    const { translations } = this.context;

    return (
      <View>
        <Text style={styles.headerTitle}>
          {translations.selectParticipant}
        </Text>

        <ParticipantInfo
          participants={realm.objects('Participant').filtered(`scorecard_uuid='${this.props.route.params.scorecard_uuid}' AND raised=false SORT(order ASC)`)}
          scorecard_uuid={ this.props.route.params.scorecard_uuid }
          participant_uuid={ this.props.route.params.participant_uuid }
          onGetParticipant={(participant) => this.setState({participant_uuid: participant.uuid})}
          navigation={this.props.navigation}
        />
      </View>
    )
  }

  _updateIndicatorList = () => {
    const { translations } = this.context;
    const indicatorService = new IndicatorService();
    const allCriteria = indicatorService.getIndicatorList(this.props.route.params.scorecard_uuid, this.state.participant_uuid, translations.addNewCriteria);

    this.setState({
      indicators: allCriteria.indicators,
      selectIndicators: allCriteria.selectedIndicators,
    });
  }

  startNextTourTip = () => {
    this.setState({ showTourTip: true });
    this.props.start();
  }

  render() {
    const {translations} = this.context;

    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 0}}>
        { this._renderParticipant() }
        <Text style={styles.chooseIndicatorTitle}>
          {translations['chooseProposedCriteria']}
        </Text>

        <CriteriaSelection
          ref={this.indicatorSelectionRef}
          selectIndicator={this.selectIndicator}
          scorecardUUID={this.props.route.params.scorecard_uuid}
          participantUUID={this.props.route.params.participant_uuid}
          indicators={this.state.indicators}
          selectedIndicators={this.state.selectedIndicators}
          customIndicator={this.state.customIndicator}
          startNextTourTip={() => this.startNextTourTip()}
        />

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