import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import UserListing from '../../components/RaisingProposed/UserListing';
import ProgressHeader from '../../components/ProgressHeader';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import scorecardService from '../../services/scorecardService';
import InstructionModal from '../../components/InstructionModal';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    let scorecard = scorecardService.find(props.route.params.scorecard_uuid);

    if (scorecard.status < 2) {
      scorecardService.update(scorecard.uuid, {status: '2'});
      props.setCurrentScorecard(scorecard);
    }

    this.state = {
      visibleInstructionModal: true
    }
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ProgressHeader
          title={translations['getStarted']}
          onBackPress={() => this.props.navigation.goBack()}
          progressIndex={3}
        />
        <UserListing
          scorecardUUID={this.props.route.params.scorecard_uuid}
          navigation={this.props.navigation}
        />

        <InstructionModal
          screenName='RaisingProposed'
          visible={this.state.visibleInstructionModal}
          onDimiss={() => this.setState({visibleInstructionModal: false})} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RaisingProposed);
