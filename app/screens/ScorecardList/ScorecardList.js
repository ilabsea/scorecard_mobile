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
import MessageModal from '../../components/MessageModal';

import uuidv4 from '../../utils/uuidv4';
// import scorecardService from '../../services/scorecardService';
import scorecardService, { ScorecardService } from '../../services/scorecardService';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

class ScorecardList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      selectedScorecard: null,
      scorecards: scorecardService.getAll(),
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.setState({ scorecards: scorecardService.getAll() });
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  renderList(scorecards) {
    return (scorecards.map((scorecard, index) => (
        <ScorecardItem
          key={uuidv4()}
          onPress={() => this.onPress(scorecard)}
          scorecard={scorecard}
          index={index}
          showDeleteModal={() => this.setState({ visibleModal: true, selectedScorecard: scorecard })}
        />
      )
    ));
  }

  onPress(scorecard) {
    const { translations } = this.context

    if (scorecard.isDeleted) {
      return Alert.alert(translations.deletedScorecard, translations.theScorecardDeleted);
    }
    this.props.setCurrentScorecard(scorecard);
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.displayName});
  }

  _renderNoData() {
    const { translations } = this.context

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 24, fontFamily: 'Battambang-Bold'}}>{translations['noData']}</Text>
      </View>
    );
  }

  _confirmDelete() {
    const scorecardServiceObj = new ScorecardService();
    scorecardServiceObj.delete(this.state.selectedScorecard.uuid);

    this.setState({
      visibleModal: false,
      scorecards: scorecardService.getAll(),
    });
  }

  render() {
    const { translations } = this.context;
    const completedStatus = '5';
    const progressScorecards = this.state.scorecards.filter(s => s.status != completedStatus);
    const completeScorecards = this.state.scorecards.filter(s => s.status == completedStatus);

    if (!this.state.scorecards.length) {
      return this._renderNoData();
    }

    return (
      <ScrollView>
        <View style={{flex: 1, padding: 16}}>
          { !!progressScorecards.length && <Text style={{marginBottom: 10}}>{translations.progressScorecards}</Text>}
          { this.renderList(progressScorecards) }

          { !!completeScorecards.length && <Text style={{marginBottom: 10}}>{translations.completeScorecards}</Text>}
          { this.renderList(completeScorecards) }

          <MessageModal
            visible={this.state.visibleModal}
            onDismiss={() => this.setState({visibleModal: false})}
            title={translations.deleteScorecard}
            description={translations.doYouWantToDeleteThisScorecard}
            hasConfirmButton={true}
            confirmButtonLabel={translations.ok}
            onPressConfirmButton={() => this._confirmDelete()}
          />
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
