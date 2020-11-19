import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, FlatList, RefreshControl} from 'react-native';
import realm from '../../db/schema';

import ParticipantListItem from '../../components/ParticipantList/ParticipantListItem';

class ParticipantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.fetchParticipant();
  }

  fetchParticipant = () => {
    this.setState({isLoading: true});
    const participants = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.uuid +'"').sorted('order', false);
    this.setState({
      participants: participants != undefined ? participants : [],
      isLoading: false,
    });
  }

  renderListHeader = () => {
    return (
      <View style={{flexDirection: 'row', paddingVertical: 16}}>
        <View style={{paddingRight: 20, justifyContent: 'center', width: 60}}>
          <Text style={styles.itemTitle}>No.</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>Gender</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>Age</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>Disability</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>Minority</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>Poor</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemTitle}>Youth</Text>
        </View>
        <View style={{width: 60, alignItems: 'center'}}>
          <Text style={styles.itemTitle}>Action</Text>
        </View>
      </View>
    );
  }

  renderParticipantList = () => {
    const numberOfParticipant = realm.objects('ParticipantInformation').filtered('uuid = "' + this.props.route.params.uuid + '"')[0].participant;
    return (
      <FlatList
        data={Array(numberOfParticipant).fill({})}
        renderItem={({item, index}) =>
          <ParticipantListItem index={index} participant={this.state.participants[index]}
            navigation={this.props.navigation} uuid={this.props.route.params.uuid}
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
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Participant list</Text>
          {this.renderListHeader()}
          {this.renderParticipantList()}
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
    paddingTop: 16,
  },
  itemColumn: {
    flex: 1,
    alignItems: 'center',
  },
  itemTitle: {
    fontWeight: '700',
  },
});

export default ParticipantList;