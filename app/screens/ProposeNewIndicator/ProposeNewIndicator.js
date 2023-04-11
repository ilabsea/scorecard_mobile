import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux';

import {LocalizationContext} from '../../components/Translations';
import ProposeNewIndicatorSearchBox from '../../components/ProposeNewIndicator/ProposeNewIndicatorSearchBox';
import ProposeNewIndicatorProposedList from '../../components/ProposeNewIndicator/ProposeNewIndicatorProposedList';
import BoldLabel from '../../components/Share/BoldLabel';
import { containerPadding } from '../../utils/responsive_util';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import BottomButton from '../../components/BottomButton';
import settingHelper from '../../helpers/setting_helper';

import { updateRaisedParticipants } from '../../services/participant_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';

import {saveParticipant} from '../../actions/participantAction';
import {setSelectedIndicators} from '../../actions/selectedIndicatorAction';

import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
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
  }
  async componentDidMount() {
    this.setState({
      proposedIndicators: ProposedIndicator.getAllDistinct(this.props.route.params.scorecard_uuid),
      isIndicatorBase: await isProposeByIndicatorBase(),
      endpointId: await settingHelper.getSavedEndpointUrlId()
    })
  }

  updateParticipantInfo() {
    const participants = JSON.parse(JSON.stringify(Participant.getAllByScorecard(this.props.route.params.scorecard_uuid)));
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  save = () => {
    updateRaisedParticipants(this.props.route.params.scorecard_uuid);
    this.updateParticipantInfo();
    this.props.setSelectedIndicators(proposedIndicatorService.getProposedIndicators(this.props.route.params.scorecard_uuid));
    this.props.navigation.goBack();
  }

  updateProposedIndicators = () => {
    const proposedIndicators = !this.state.isIndicatorBase ? ProposedIndicator.find(this.props.route.params.scorecard_uuid, this.state.participantUuid)
                              : ProposedIndicator.getAllByScorecard(this.props.route.params.scorecard_uuid);

    this.setState({ isValid: proposedIndicators.length > 0 });
  }

  render() {
    const {translations} = this.context
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flexGrow: 1, paddingHorizontal: containerPadding, paddingTop: 15}}>
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
          />
          <View style={{padding: containerPadding, paddingHorizontal: 0, zIndex: -2}}>
            <BottomButton disabled={!this.state.isValid} label={translations.saveAndGoNext} onPress={() => this.save()} />
          </View>
          <FormBottomSheetModal ref={this.bottomSheetRef} formModalRef={this.formModalRef} snapPoints={participantListModalSnapPoints} onDismissModal={() => this.updateProposedIndicators()} />
        </View>
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