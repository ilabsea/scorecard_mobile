import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Tip from '../Tip';
import CriteriaList from './CriteriaList';
import ListUser from './ListUser';
import BottomButton from '../BottomButton';
import {LocalizationContext} from '../../components/Translations';
import realm from '../../db/schema';
import {Criteria} from '../../services/criteria_service';
import {getRaisedParticipants} from '../../services/participant_service';
import {connect} from 'react-redux';

class UserListing extends Component {
  static contextType = LocalizationContext;

  onPress = () => {
    this.props.navigation.navigate('IndicatorDevelopment', {scorecard_uuid: this.props.scorecardUUID});
  }

  hasRaisedCriteria = () => {
    const raisedParticipants = getRaisedParticipants(this.props.participants, this.props.scorecardUUID);
    const criteria = new Criteria(this.props.scorecardUUID);
    return criteria.hasRaisedCritria(raisedParticipants)
  }

  renderFinishButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton
          disabled={!this.hasRaisedCriteria()}
          label={translations['finish']}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 28}}>
          <Tip screenName={'RaisingProposed'}/>

          <CriteriaList scorecardUUID={this.props.scorecardUUID} />
          <ListUser
            scorecardUUID={this.props.scorecardUUID}
            navigation={this.props.navigation}
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
    padding: 20
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(
  mapStateToProps,
  null,
)(UserListing);
