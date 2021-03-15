import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import realm from '../../db/schema';

import {LocalizationContext} from '../../components/Translations';
import ParticipantListItem from '../../components/ParticipantList/ParticipantListItem';
import BottomButton from '../../components/BottomButton';
import ProgressHeader from '../../components/ProgressHeader';
import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';
import OutlinedButton from '../../components/OutlinedButton';
import NoDataMessage from '../../components/NoDataMessage';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import Participant from '../../models/Participant';

class ParticipantList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.totalParticipant = 0;
    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.fetchParticipant();
  }

  fetchParticipant = () => {
    const participants = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'"').sorted('order', false);
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  renderListHeader = () => {
    if (this.props.participants.length > 0) {
      const {translations} = this.context;
      const tableHeads = ['gender', 'age', 'disability', 'minority', 'poor', 'youth'];
      const doms = tableHeads.map((col, index) =>
        <View style={styles.itemColumn} key={index}>
          <Text style={styles.itemTitle}>{translations[col]}</Text>
        </View>
      )

      return (
        <View style={{flexDirection: 'row', paddingBottom: 16}}>
          <View style={{paddingRight: 20, justifyContent: 'center', width: 60}}>
            <Text style={styles.itemTitle}>{translations.no}</Text>
          </View>

          { doms }

          <View style={{width: 60, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.itemTitle}>{translations.action}</Text>
          </View>
        </View>
      );
    }
  }

  renderParticipantList = () => {
    const numberOfParticipant = realm.objects('Scorecard').filtered('uuid = "' + this.props.route.params.scorecard_uuid + '"')[0].number_of_participant;
    this.totalParticipant = numberOfParticipant;

    let doms = null;

    if (Participant.getAll(this.props.route.params.scorecard_uuid).length > 0) {
      doms = this.props.participants.map((participant, index) =>
        <ParticipantListItem key={index} index={index} participant={participant}
          navigation={this.props.navigation} scorecardUUID={this.props.route.params.scorecard_uuid}
        />
      )
    }

    return doms;
  }

  renderTitleWithAddNewButton() {
    const {translations} = this.context;

    return (
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={{fontSize: 20, fontFamily: FontFamily.title}}>
            {translations.participantList}
          </Text>

          <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 5}}>({ this.props.participants.length })</Text>
        </View>

        { this.props.participants.length > 0 &&
          <OutlinedButton
            icon="plus"
            label={translations.addNewParticipant}
            onPress={() => this.addNewParticipant() }
          />
        }
      </View>
    )
  }

  renderNoData() {
    const { translations } = this.context;

    return (
      <NoDataMessage
        title={translations.pleaseAddParticipant}
        buttonLabel={translations.addNewParticipant}
        onPress={() => this.addNewParticipant()}
      />
    );
  }

  addNewParticipant = () => {
    this.props.navigation.navigate('AddNewParticipant', {scorecard_uuid: this.props.route.params.scorecard_uuid});
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ProgressHeader
            title={translations.getStarted}
            onBackPress={() => this.props.navigation.goBack()}
            onPressHome={() => this.props.navigation.popToTop()}
            progressIndex={2}
          />

          <ScrollView contentContainerStyle={styles.container}>
            { this.renderTitleWithAddNewButton() }
            { this.renderListHeader() }
            { this.renderParticipantList() }

            { this.props.participants.length == 0 && this.renderNoData() }
          </ScrollView>

          <View style={{padding: 20}}>
            <BottomButton
              label={translations.next}
              onPress={() => this.props.navigation.navigate('OfflineRaisingProposed', {scorecard_uuid: this.props.route.params.scorecard_uuid})}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  itemColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
