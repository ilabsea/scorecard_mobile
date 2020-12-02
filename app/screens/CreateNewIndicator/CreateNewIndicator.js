import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import {Provider, Portal} from 'react-native-paper';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import OutlinedActionButton from '../../components/OutlinedActionButton';
import CriteriaSelection from '../../components/RaisingProposed/CriteriaSelection';
import AddNewIndicatorModal from '../../components/RaisingProposed/AddNewIndicatorModal';
import Color from '../../themes/color';
import {saveParticipant} from '../../actions/participantAction';
import uuidv4 from '../../utils/uuidv4';
import {connect} from 'react-redux';
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
    };
  }

  componentDidMount() {
    const proposedCriterias = realm.objects('ProposedCriteria')
      .filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'" AND participant_uuid = "' + this.props.route.params.participant_uuid + '"');
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

  save = () => {
    let participants = JSON.parse(JSON.stringify(realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'"').sorted('order', false)));
    this.handleDeleteUnselectedProposedCriteria();
    this.state.selectedIndicators.map((indicator) => {
      const attrs = {
        uuid: this.getCriteriaUUID(indicator.uuid),
        scorecard_uuid: this.props.route.params.scorecard_uuid.toString(),
        indicatorable_id: indicator.uuid.toString(),
        indicatorable_type: indicator.type,
        indicatorable_name: indicator.name,
        participant_uuid: this.props.route.params.participant_uuid,
        tag: indicator.tag
      };
      realm.write(() => { realm.create('ProposedCriteria', attrs, 'modified'); });
    });
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
    if (this.state.isValid) {
      return (
        <View style={{paddingBottom: 42, justifyContent: 'flex-end'}}>
          <ActionButton
            label={translations['saveAndAddNew']}
            customButtonStyle={{marginBottom: 20}}
            customBackgroundColor={Color.primaryButtonColor}
            isDisabled={false}
          />
          <OutlinedActionButton label={translations['saveAndGoNext']} isDisabled={false} onPress={() => this.save()}/>
        </View>
      );
    }
  };

  render() {
    const {translations} = this.context;
    return (
      <Provider>
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{paddingHorizontal: 20, paddingTop: 28, flex: 1}}>
                <Text style={{fontSize: 18, color: '#2e2e2e', marginTop: 20}}>
                  {translations['chooseProposedCriteria']}
                </Text>
                <CriteriaSelection
                  ref={this.indicatorSelectionRef}
                  selectIndicator={this.selectIndicator}
                  scorecardUUID={this.props.route.params.scorecard_uuid}
                  participantUUID={this.props.route.params.participant_uuid}
                />
                {this.renderSaveButton()}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
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
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewIndicator);
