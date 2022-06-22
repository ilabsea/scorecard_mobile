import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Color from '../../themes/color';

import Tip from '../Share/Tip';
import ListUser from './ListUser';
import BottomButton from '../BottomButton';
import {LocalizationContext} from '../../components/Translations';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import Participant from '../../models/Participant';
import Scorecard from '../../models/Scorecard';
import {connect} from 'react-redux' ;
import { removeFromSelected } from '../../actions/selectedIndicatorAction';
import { containerPadding } from '../../utils/responsive_util';
import { navigate } from '../../navigators/app_navigator';
import settingHelper from '../../helpers/setting_helper';

class ProposedIndicatorContent extends Component {
  static contextType = LocalizationContext;

  onPress = async () => {
    Scorecard.update(this.props.scorecardUuid, { propose_indicator_method: await settingHelper.getProposeIndicatorMethodForScorecard() });
    this.clearSelectedIndicators();
    scorecardTracingStepsService.trace(this.props.scorecardUuid, 5);
    navigate('OfflineIndicatorDevelopment', {scorecard_uuid: this.props.scorecardUuid});
  }

  clearSelectedIndicators = () => {
    this.props.selectedIndicators.map(indicator => {
      this.props.removeFromSelected(indicator);
    });
  }

  renderFinishButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton
          disabled={!proposedIndicatorService.hasProposedIndicator(this.props.scorecardUuid)}
          label={translations['finishAndNext']}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{padding: containerPadding, paddingBottom: 28, flexGrow: 1}}>
          <Tip screenName='ProposedIndicator' showTipModal={() => this.props.tipModalRef.current?.present()} />

          <ListUser
            scorecardUuid={this.props.scorecardUuid}
            numberOfParticipant={Participant.getAll(this.props.scorecardUuid).length}
            numberOfProposedParticipant={Participant.getNumberOfProposedParticipant(this.props.scorecardUuid)}
            visibleModal={this.props.visibleModal}
            participantModalRef={this.props.participantModalRef}
            formModalRef={this.props.formModalRef}
            updateModalVisible={(status) => this.props.updateModalVisible(status)}
          />
        </ScrollView>

        { this.renderFinishButton() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: containerPadding
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Color.whiteColor,
  },
});

function mapStateToProps(state) {
  return {
    participants: state.participantReducer.participants,
    selectedIndicators: state.selectedIndicators,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromSelected: (indicator) => dispatch(removeFromSelected(indicator)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProposedIndicatorContent);
