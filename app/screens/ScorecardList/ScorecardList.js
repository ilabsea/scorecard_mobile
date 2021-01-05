import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';

import realm from '../../db/schema';
import { LocalizationContext } from '../../components/Translations';
import ScorecardItem from '../../components/ScorecardItem';
import uuidv4 from '../../utils/uuidv4';
import scorecardService from '../../services/scorecardService';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

class ScorecardList extends Component {
  static contextType = LocalizationContext;

  renderList(scorecards) {
    return (scorecards.map(scorecard => (
        <ScorecardItem
          key={uuidv4()}
          onPress={() => this.onPress(scorecard)}
          scorecard={scorecard}/>
      )
    ));
  }

  onPress(scorecard) {
    const { translations } = this.context

    if (scorecard.isDeleted) {
      return Alert.alert(translations.deletedScorecard, translations.theScorecardDeleted);
    }
    this.props.setCurrentScorecard(scorecard);
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.name});
  }

  _renderNoData() {
    const { translations } = this.context

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 24, fontFamily: 'Battambang-Bold'}}>{translations['noData']}</Text>
      </View>
    );
  }

  render() {
    const { translations } = this.context;
    const scorecards = realm.objects('Scorecard');
    const completedStatus = '5';
    const progressScorecards = scorecards.filter(s => s.status != completedStatus);
    const completeScorecards = scorecards.filter(s => s.status == completedStatus);

    if (!scorecards.length) {
      return this._renderNoData();
    }

    return (
      <ScrollView>
        <View style={{flex: 1, padding: 16}}>
          { !!progressScorecards.length && <Text style={{marginBottom: 10}}>{translations.progressScorecards}</Text>}
          { this.renderList(progressScorecards) }

          { !!completeScorecards.length && <Text style={{marginBottom: 10}}>{translations.completeScorecards}</Text>}
          { this.renderList(completeScorecards) }
        </View>
      </ScrollView>
    )
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
)(ScorecardList);
