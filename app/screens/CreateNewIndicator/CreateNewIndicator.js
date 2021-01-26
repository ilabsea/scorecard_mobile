import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import {Provider, Portal} from 'react-native-paper';
import {Icon} from 'native-base';
import { FontFamily } from '../../assets/stylesheets/theme/font';

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

class CreateNewIndicator extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.indicatorSelectionRef = React.createRef();
    this.state = {
      isModalVisible: false,
      isValid: false,
      selectedIndicators: [],
      unselectedIndicators: [],
      participant_uuid: this.props.route.params.participant_uuid
    };
  }

  componentDidMount() {
    const proposedCriterias = realm.objects('ProposedCriteria')
      .filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'" AND participant_uuid = "' + this.state.participant_uuid + '"');
    this.setState({isValid: (proposedCriterias != undefined && proposedCriterias.length > 0) ? true : false});
  }

  selectIndicator = () => {
    this.setState({
      isModalVisible: this.indicatorSelectionRef.current.state.isModalVisible,
      selectedIndicators: this.indicatorSelectionRef.current.state.selectedIndicators,
      unselectedIndicators: this.indicatorSelectionRef.current.state.unselectedIndicators,
      isValid: this.indicatorSelectionRef.current.state.selectedIndicators.length > 0 ? true : false,
    });
  };

  closeModal = () => {
    const otherIndicatorIndex = this.indicatorSelectionRef.current.state.indicators.length - 1;
    this.indicatorSelectionRef.current.state.indicators[otherIndicatorIndex].isSelected = false;
    this.setState({isModalVisible: false});
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
    });
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
      <View style={{padding: 20}}>
        <BottomButton disabled={!this.state.isValid} label={translations['saveAndGoNext']} onPress={() => this.save()} />
      </View>
    );
  };

  _renderParticipant() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={{fontSize: 18, color: '#2e2e2e'}}>
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

  render() {
    const {translations} = this.context;
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20, paddingBottom: 28}} keyboardShouldPersistTaps='handled'>
          { this._renderParticipant() }
          <Text style={{fontSize: 18, color: '#2e2e2e', marginTop: 20}}>
            {translations['chooseProposedCriteria']}
          </Text>

          <CriteriaSelection
            ref={this.indicatorSelectionRef}
            selectIndicator={this.selectIndicator}
            scorecardUUID={this.props.route.params.scorecard_uuid}
            participantUUID={this.props.route.params.participant_uuid}
          />
        </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewIndicator);
