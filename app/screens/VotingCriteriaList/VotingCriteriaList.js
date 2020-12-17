import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Icon, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import VotingCriteriaListItem from '../../components/VotingCriteria/VotingCriteriaListItem';
import { getAll, setVotingCriterias } from '../../actions/votingCriteriaAction';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import ParticipantInfo from '../../components/CreateNewIndicator/ParticipantInfo';

class VotingCriteriaList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    let scorecard_uuid = props.route.params.scorecard_uuid;

    this.state = {
      scorecard: realm.objects('Scorecard').filtered(`uuid='${scorecard_uuid}'`)[0],
      votingCriterias: JSON.parse(JSON.stringify(realm.objects('VotingCriteria').filtered(`scorecard_uuid='${scorecard_uuid}'`))),
      participantVisible: false,
      addParticiantVisible: false,
    };
  }

  componentDidMount() {
    realm.write(() => {
      if (this.state.scorecard.status < 4) {
        this.state.scorecard.status = '4';
      }
    });

    this.props.setVotingCriterias(this.state.votingCriterias, { scorecard_uuid: this.state.scorecard.uuid });
  }

  _renderHeader() {
    return (
      <HorizontalProgressHeader
        title={this.state.scorecard.name}
        navigation={this.props.navigation}
        progressIndex={3}/>
    )
  }

  _renderList() {
    return this.props.votingCriterias.map((item, index) => <VotingCriteriaListItem criteria={item} key={index}/>);
  }

  goTo(routName) {
    const { navigation } = this.props;

    navigation.navigate(routName, {scorecard_uuid: this.state.scorecard.uuid})
  }

  _goNext() {
    this.goTo('ScorecardResult');
  }

  _goToVotingForm(participant_uuid) {
    this.props.navigation.navigate('VotingCriteriaForm', {scorecard_uuid: this.state.scorecard.uuid, participant_uuid: participant_uuid});
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={[styles.h1, {flex: 1}]}>{translations.top_indicators} {this.state.votingCriterias.length}</Text>

          <ParticipantInfo
            participants={realm.objects('Participant').filtered(`scorecard_uuid='${this.state.scorecard.uuid}' AND voted=false SORT(order ASC)`)}
            scorecard_uuid={ this.state.scorecard.uuid }
            mode={{type: 'button', label: translations.newVote, iconName: 'plus'}}
            onPressItem={(participant) => this._goToVotingForm(participant.uuid)}
            onPressCreateParticipant={(participant) => this._goToVotingForm(participant.uuid)}
            navigation={this.props.navigation}/>
        </View>

        { this._renderList() }
      </View>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <ScrollView contentContainerStyle={styles.container}>
          <Tip screenName={'VotingCriteriaList'}/>

          { this._renderContent() }
        </ScrollView>

        <View style={styles.container}>
          <ActionButton
            onPress={() => this._goNext()}
            customBackgroundColor={Color.headerColor}
            label={translations.next}/>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    votingCriterias: state.votingCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
    setVotingCriterias: (criterias) => dispatch(setVotingCriterias(criterias)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VotingCriteriaList);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  h1: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20
  }
})
