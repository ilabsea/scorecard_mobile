import React, {Component} from 'react';
import { View } from 'react-native';

import Color from '../../themes/color';

import {LocalizationContext} from '../../components/Translations';
import UserListing from '../../components/RaisingProposed/UserListing';
import ProgressHeader from '../../components/ProgressHeader';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

import Scorecard from '../../models/Scorecard';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.hasInternetConnection = false;
    let scorecard = Scorecard.find(props.route.params.scorecard_uuid);

    if (scorecard.status < 2) {
      Scorecard.update(scorecard.uuid, {status: '2'});
      props.setCurrentScorecard(scorecard);
    }
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
        <ProgressHeader
          title={translations['getStarted']}
          onBackPress={() => this.props.navigation.goBack()}
          onPressHome={() => this.props.navigation.popToTop()}
          progressIndex={3}
        />
        <UserListing
          scorecardUUID={this.props.route.params.scorecard_uuid}
          navigation={this.props.navigation}
        />
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
