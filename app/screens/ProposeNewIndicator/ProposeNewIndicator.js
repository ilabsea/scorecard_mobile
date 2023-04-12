import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import ProposeNewIndicatorNavHeader from '../../components/ProposeNewIndicator/ProposeNewIndicatorNavHeader';
import ProposeNewIndicatorSearchBox from '../../components/ProposeNewIndicator/ProposeNewIndicatorSearchBox';
import ProposeNewIndicatorProposedList from '../../components/ProposeNewIndicator/ProposeNewIndicatorProposedList';
import BoldLabel from '../../components/Share/BoldLabel';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import { containerPadding } from '../../utils/responsive_util';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import BottomButton from '../../components/BottomButton';
import settingHelper from '../../helpers/setting_helper';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import { updateRaisedParticipants } from '../../services/participant_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import {saveParticipant} from '../../actions/participantAction';
import {setSelectedIndicators} from '../../actions/selectedIndicatorAction';
import { participantListModalSnapPoints } from '../../constants/modal_constant';

class ProposeNewIndicator extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      proposedIndicators: [],
      isValid: false,
      isIndicatorBase: false,
      participantUuid: !!props.route.params.participant_uuid ? props.route.params.participant_uuid : null,
      endpointId: null,
    }

    this.formModalRef = React.createRef();
    this.bottomSheetRef = React.createRef();

    const { last_order_number, previous_proposed_indicators } = proposedIndicatorHelper.getLastProposed(props.route.params.scorecard_uuid, props.route.params.participant_uuid)
    this.lastOrderNumber = last_order_number
    AsyncStorage.setItem('previous-proposed-indicators', JSON.stringify(previous_proposed_indicators));
  }
  async componentDidMount() {
    const proposedIndicators = ProposedIndicator.getAllDistinct(this.props.route.params.scorecard_uuid)
    this.setState({
      proposedIndicators: proposedIndicators,
      isValid: proposedIndicators.length > 0,
      isIndicatorBase: await isProposeByIndicatorBase(),
      endpointId: await settingHelper.getSavedEndpointUrlId()
    })
  }

  save = () => {
    updateRaisedParticipants(this.props.route.params.scorecard_uuid);
    const participants = JSON.parse(JSON.stringify(Participant.getAllByScorecard(this.props.route.params.scorecard_uuid)));
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
    this.props.setSelectedIndicators(proposedIndicatorService.getProposedIndicators(this.props.route.params.scorecard_uuid));
    this.props.navigation.goBack();
  }

  updateProposedIndicators = () => {
    const proposedIndicators = !this.state.isIndicatorBase ? ProposedIndicator.find(this.props.route.params.scorecard_uuid, this.state.participantUuid)
                              : ProposedIndicator.getAllByScorecard(this.props.route.params.scorecard_uuid);
    this.setState({ isValid: proposedIndicators.length > 0 });
  }

  onBottomSheetDismiss = () => {
    this.updateProposedIndicators()
    this.bottomSheetRef.current?.setBodyContent(null)
  }

  renderBody = () => {
    const {translations} = this.context
    return <View style={{flexGrow: 1, paddingHorizontal: containerPadding, paddingTop: 15}}>
              <ProposeNewIndicatorSearchBox scorecardUuid={this.props.route.params.scorecard_uuid} updateIsValid={(status) => this.setState({isValid: status})}
                bottomSheetRef={this.bottomSheetRef}
                formModalRef={this.formModalRef}
              />
              <BoldLabel label={`${translations.proposedIndicator}: ${this.state.proposedIndicators.length}`} customStyle={{marginTop: 10, zIndex: -2}} />
              <ProposeNewIndicatorProposedList scorecardUuid={this.props.route.params.scorecard_uuid}
                proposedIndicators={this.state.proposedIndicators}
                endpointId={this.state.endpointId}
                bottomSheetRef={this.bottomSheetRef}
                formModalRef={this.formModalRef}
                updateProposedIndicators={() => this.updateProposedIndicators()}
              />
              <View style={{padding: containerPadding, paddingHorizontal: 0, zIndex: -2}}>
                <BottomButton disabled={!this.state.isValid} label={translations.saveAndGoNext} onPress={() => this.save()} />
              </View>
              <FormBottomSheetModal ref={this.bottomSheetRef} formModalRef={this.formModalRef} snapPoints={participantListModalSnapPoints} onDismissModal={() => this.onBottomSheetDismiss()} />
            </View>
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <React.Fragment>
          <ProposeNewIndicatorNavHeader bottomSheetRef={this.bottomSheetRef} formModalRef={this.formModalRef}
            handleUnconfirmedIndicator={() => proposedIndicatorService.handleUnconfirmedIndicator(this.props.route.params.scorecard_uuid, this.state.participantUuid, this.lastOrderNumber)}
          />
          {this.renderBody()}
        </React.Fragment>
      </TouchableWithoutFeedback>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID)),
    setSelectedIndicators: (selectedIndicators) => dispatch(setSelectedIndicators(selectedIndicators)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ProposeNewIndicator)