import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';

import { Icon, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';
import uuidv4 from '../../utils/uuidv4';

import VotingCriteriaListItem from '../../components/VotingCriteria/VotingCriteriaListItem';
import { getAll, setVotingCriterias } from '../../actions/votingCriteriaAction';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import ParticipantModal from '../../components/RaisingProposed/ParticipantModal';
import AddNewParticiantModal from '../../components/RaisingProposed/AddNewParticipantModal';

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
    let data = this.props.votingCriterias;

    return (
      <FlatList
        data={data}
        renderItem={item => <VotingCriteriaListItem criteria={item.item}/>}
        keyExtractor={item => uuidv4()}
      />
    )
  }

  goTo(routName) {
    const { navigation } = this.props;

    navigation.navigate(routName, {scorecard_uuid: this.state.scorecard.uuid})
  }

  _goNext() {
    realm.write(() => {
      if (this.state.scorecard.status < 5) {
        this.state.scorecard.status = '5';
      }
    });

    this.goTo('ScorecardResult');
  }

  _goToVotingForm(participant_uuid) {
    this.props.navigation.navigate('VotingCriteriaForm', {scorecard_uuid: this.state.scorecard.uuid, participant_uuid: participant_uuid});
  }

  _showParticipantModal = () => {
    let participants = realm.objects('Participant').filtered(`scorecard_uuid='${this.state.scorecard.uuid}' AND voted=false`);
    this.setState({
      participantVisible: true,
      participants: participants,
    });
  };

  _showAddParticipantModal = () => {
    this.setState({
      participantVisible: false,
      addParticipantVisible: true,
    });
  }

  _hideAddParticipantModal = () => {
    this.setState({
      addParticipantVisible: false,
      participantVisible: true,
    });
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <Text style={[styles.h1, {flex: 1}]}>{translations.top_indicators} {this.state.votingCriterias.length}</Text>

          <Button
            onPress={() => this._showParticipantModal()}
            iconLeft
            style={{backgroundColor: Color.headerColor}}>
            <Icon name='plus' type="FontAwesome" />
            <Text>{translations.newVote}</Text>
          </Button>

        </View>

        { this._renderList() }

        <ActionButton
          onPress={() => this._goNext()}
          customBackgroundColor={Color.headerColor}
          label={translations.next}/>

        <ParticipantModal
          participants={this.state.participants || []}
          visible={this.state.participantVisible}
          scorecardUuid={this.state.scorecard.uuid}
          navigation={this.props.navigation}
          onDismiss={() => this.setState({participantVisible: false})}
          showAddParticipantModal={() => this._showAddParticipantModal()}
          onPressItem={(participantUuid) => this._goToVotingForm(participantUuid)}
        />

        <AddNewParticiantModal
          visible={this.state.addParticipantVisible}
          onDismiss={() => this.setState({addParticipantVisible: false})}
          onClose={() => this._hideAddParticipantModal()}
          scorecardUuid={this.state.scorecard.uuid}
          navigation={this.props.navigation}
          onSaveParticipant={(participantUuid) => this._goToVotingForm(participantUuid)}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <View style={styles.container}>
          <Tip />

          { this._renderContent() }
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
    flex: 1
  },
  h1: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20
  }
})
