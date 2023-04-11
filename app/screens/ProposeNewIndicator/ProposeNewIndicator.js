import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux';

import {LocalizationContext} from '../../components/Translations';
import ProposeNewIndicatorSearchBox from '../../components/ProposeNewIndicator/ProposeNewIndicatorSearchBox';
import EmptyListAction from '../../components/Share/EmptyListAction';
import BoldLabel from '../../components/Share/BoldLabel';
import { containerPadding } from '../../utils/responsive_util';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import BottomButton from '../../components/BottomButton';

import { updateRaisedParticipants } from '../../services/participant_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';

import {saveParticipant} from '../../actions/participantAction';
import {setSelectedIndicators} from '../../actions/selectedIndicatorAction';

class ProposeNewIndicator extends React.Component {
  static contextType = LocalizationContext;
  state = {
    proposedIndicators: [],
    isValid: false,
    isIndicatorBase: false,
    participantUuid: !!this.props.route.params.participant_uuid ? this.props.route.params.participant_uuid : null,
  }
  async componentDidMount() {
    this.setState({
      proposedIndicator: ProposedIndicator.getAllByScorecard(this.props.route.params.scorecard_uuid),
      isIndicatorBase: await isProposeByIndicatorBase(),
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
    const proposedIndicators = !this.state.isIndicatorBase ? ProposedIndicator.find(this.props.route.params.scorecard_uuid, this.props.participantUuid)
                              : ProposedIndicator.getAllByScorecard(this.props.route.params.scorecard_uuid);

    this.setState({ isValid: proposedIndicators.length > 0 });
    // this.props.updateIndicatorList();
    // !!this.props.isEdit && this.closeModal();
  }

  render() {
    const {translations} = this.context
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flexGrow: 1, paddingHorizontal: containerPadding, paddingTop: 15}}>
          <ProposeNewIndicatorSearchBox scorecardUuid={this.props.route.params.scorecard_uuid}
            updateIsValid={(status) => this.setState({isValid: status})}
            updateProposedIndicators={() => this.updateProposedIndicators()}
          />
          <BoldLabel label={`${translations.proposedIndicator}: ${this.state.proposedIndicators.length}`} customStyle={{marginTop: 10, zIndex: -1}} />
          <EmptyListAction title={translations.noIndicatorProposed} hideButton={true}
            contentContainerStyle={{zIndex: -1, flexGrow: 1, justifyContent: 'center', paddingTop: 26}}
          />

          <View style={{padding: containerPadding, paddingHorizontal: 0, zIndex: -2}}>
            <BottomButton disabled={!this.state.isValid} label={translations.saveAndGoNext}
              onPress={() => this.save()}
            />
          </View>
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