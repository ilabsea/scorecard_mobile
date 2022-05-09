import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Color from '../../themes/color';

import {LocalizationContext} from '../../components/Translations';
import ParticipantListContent from '../../components/ParticipantList/ParticipantListContent';
import BottomButton from '../../components/BottomButton';
import ProgressHeader from '../../components/ProgressHeader';
import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import Participant from '../../models/Participant';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';

import { containerPadding } from '../../utils/responsive_util';

class ParticipantList extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.totalParticipant = 0;
    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.fetchParticipant();
  }

  fetchParticipant = () => {
    const participants = Participant.findByScorecard(this.props.route.params.scorecard_uuid);
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  next = () => {
    scorecardTracingStepsService.trace(this.props.route.params.scorecard_uuid, 4);
    this.props.navigation.navigate('OfflineRaisingProposed', {scorecard_uuid: this.props.route.params.scorecard_uuid})
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
          <ProgressHeader
            title={translations.getStarted}
            progressIndex={2}
          />

          <ParticipantListContent
            scorecardUuid={this.props.route.params.scorecard_uuid}
            participants={this.props.participants}
          />

          <View style={{padding: containerPadding}}>
            <BottomButton label={translations.next} onPress={() => this.next()} />
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
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);