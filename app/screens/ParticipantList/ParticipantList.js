import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, RefreshControl} from 'react-native';
import realm from '../../db/schema';

import {LocalizationContext} from '../../components/Translations';
import ParticipantListItem from '../../components/ParticipantList/ParticipantListItem';
import ParticipantCountLabel from '../../components/ParticipantList/ParticipantCountLabel';
import BottomButton from '../../components/BottomButton';
import ProgressHeader from '../../components/ProgressHeader';
import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

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
    this.setState({isLoading: true});
    const participants = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'"').sorted('order', false);
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
    this.setState({
      isLoading: false,
    });
  }

  renderListHeader = () => {
    const {translations} = this.context;
    return (
      <View style={{flexDirection: 'row', paddingBottom: 16}}>
        <View style={{paddingRight: 20, justifyContent: 'center', width: 60}}>
          <Text style={styles.itemTitle}>{translations.no}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>{translations.gender}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>{translations.age}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>{translations.disability}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>{translations.minority}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>{translations.poor}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>{translations.youth}</Text>
        </View>
        <View style={{width: 60, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.itemTitle}>{translations.action}</Text>
        </View>
      </View>
    );
  }

  renderParticipantList = () => {
    const numberOfParticipant = realm.objects('ParticipantInformation').filtered('scorecard_uuid = "' + this.props.route.params.scorecard_uuid + '"')[0].participant;
    this.totalParticipant = numberOfParticipant;
    return (
      <FlatList
        data={Array(numberOfParticipant).fill({})}
        renderItem={({item, index}) =>
          <ParticipantListItem index={index} participant={this.props.participants[index]}
            navigation={this.props.navigation} scorecardUUID={this.props.route.params.scorecard_uuid}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
           refreshing={this.state.isLoading}
           onRefresh={() => this.fetchParticipant()}
          />
        }
      />
    );
  }

  render() {
    const {translations} = this.context;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <ProgressHeader
            title={translations.getStarted}
            onBackPress={() => this.props.navigation.goBack()}
            progressIndex={2}
          />
          <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>{translations.participantList}</Text>
            {this.renderListHeader()}
            {this.renderParticipantList()}
            <ParticipantCountLabel
              customContainerStyle={{paddingVertical: 10}}
              totalParticipant={this.totalParticipant}
              addedParticipant={this.props.participants.length}
            />
            <BottomButton
              label={translations.next}
              onPress={() => this.props.navigation.navigate('RaisingProposed', {scorecard_uuid: this.props.route.params.scorecard_uuid})}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 28,
  },
  itemColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontWeight: '700',
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);