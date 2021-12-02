import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Color from '../../themes/color';

import Tip from '../Tip';
import ListUser from './ListUser';
import BottomButton from '../BottomButton';
import {LocalizationContext} from '../../components/Translations';
import {Criteria} from '../../services/criteria_service';
import {getRaisedParticipants} from '../../services/participant_service';
import scorecardStepService from '../../services/scorecard_step_service';
import Participant from '../../models/Participant';
import {connect} from 'react-redux' ;
import { removeFromSelected } from '../../actions/selectedCriteriaAction';
import { containerPadding } from '../../utils/responsive_util';

class ProposeCriteriaContent extends Component {
  static contextType = LocalizationContext;

  onPress = () => {
    this.clearSelectedCriterias();
    scorecardStepService.recordStep(this.props.scorecardUuid, 5);
    this.props.navigation.navigate('OfflineIndicatorDevelopment', {scorecard_uuid: this.props.scorecardUuid});
  }

  clearSelectedCriterias = () => {
    this.props.selectedCriterias.map(criteria => {
      this.props.removeFromSelected(criteria);
    });
  }

  hasRaisedCriteria = () => {
    const raisedParticipants = getRaisedParticipants(this.props.scorecardUuid);
    const criteria = new Criteria(this.props.scorecardUuid);
    return criteria.hasRaisedCritria(raisedParticipants)
  }

  renderFinishButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton
          disabled={!this.hasRaisedCriteria()}
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
          <Tip screenName={'RaisingProposed'}/>

          <ListUser
            scorecardUuid={this.props.scorecardUuid}
            navigation={this.props.navigation}
            numberOfParticipant={Participant.getAll(this.props.scorecardUuid).length}
            numberOfProposedParticipant={Participant.getNumberOfProposedParticipant(this.props.scorecardUuid)}
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
    selectedCriterias: state.selectedCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromSelected: (criteria) => dispatch(removeFromSelected(criteria)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProposeCriteriaContent);
