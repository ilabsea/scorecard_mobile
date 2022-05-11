import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Root } from 'native-base';

import Color from '../../themes/color';

import {LocalizationContext} from '../../components/Translations';
import ParticipantMain from '../../components/Participant/ParticipantMain';
import BottomButton from '../../components/BottomButton';
import ProgressHeader from '../../components/ProgressHeader';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import ParticipantModel from '../../models/Participant';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import { containerPadding } from '../../utils/responsive_util';
import {participantListModalSnapPoints} from '../../constants/modal_constant';

class Participant extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.totalParticipant = 0;
    this.state = {
      isLoading: false,
    }
    this.participantModalRef = React.createRef();
    this.formModalRef = React.createRef();
  }

  componentDidMount() {
    this.fetchParticipant();
  }

  fetchParticipant = () => {
    const participants = ParticipantModel.findByScorecard(this.props.route.params.scorecard_uuid);
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  next = () => {
    scorecardTracingStepsService.trace(this.props.route.params.scorecard_uuid, 4);
    this.props.navigation.navigate('OfflineRaisingProposed', {scorecard_uuid: this.props.route.params.scorecard_uuid})
  }

  renderBottomSection() {
    return (
      <React.Fragment>
        <View style={{padding: containerPadding}}>
          <BottomButton label={this.context.translations.next} onPress={() => this.next()} />
        </View>

        <FormBottomSheetModal ref={this.formModalRef} formModalRef={this.participantModalRef} snapPoints={participantListModalSnapPoints}
          onDismissModal={() => this.setState({ visibleModal: false })}
        />
      </React.Fragment>
    )
  }

  render() {
    const {translations} = this.context;

    return (
      <Root>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
            <ProgressHeader
              title={translations.getStarted}
              progressIndex={2}
            />

            <ParticipantMain
              scorecardUuid={this.props.route.params.scorecard_uuid}
              participants={this.props.participants}
              participantModalRef={this.participantModalRef}
              formModalRef={this.formModalRef}
            />

            { this.renderBottomSection() }
          </View>
        </TouchableWithoutFeedback>
      </Root>
    );
  }
}

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(mapStateToProps, mapDispatchToProps)(Participant);