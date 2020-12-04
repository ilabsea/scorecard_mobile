import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import { Modal, Portal, Button, ProgressBar, Colors, List, Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import realm from '../../db/schema';

export default class ParticipantModal extends Component {
  static contextType = LocalizationContext;

  getGenderIcon(gender) {
    switch (gender) {
      case 'female':
        return 'human-female';
      case 'male':
        return 'human-male'
      default:
        return 'gender-transgender';
    }
  }

  onPressItem(item) {
    this.props.onDimiss();
    this.props.navigation.navigate('VotingCriteriaForm', { scorecard_uuid: this.props.scorecardUuid, participant_uuid: item.uuid});
  }

  renderParticipantItem(item) {
    const { translations } = this.context;
    let arr = ['disability', 'minority', 'poor'];
    let description = [];

    for(let i=0; i<arr.length; i++) {
      if(item[arr[i]]) {
        description.push(translations[arr[i]]);
      }
    }
    description = description.join('; ');

    return (
      <View>
        <List.Item
          title={item.age}
          description={description}
          left={props => <List.Icon {...props} icon={this.getGenderIcon(item.gender)} style={{backgroundColor: '#cacaca', borderRadius: 20}}/> }
          onPress={() => this.onPressItem(item)}
          titleStyle={{fontFamily: FontFamily.title}}
          descriptionStyle={{color: '#000'}}
        />
        <Divider />
      </View>
    )
  }

  renderParticipantList() {
    return (
      <FlatList
        style={{flex: 1, backgroundColor: ''}}
        data={this.props.participants}
        renderItem={item => this.renderParticipantItem(item.item)}
        keyExtractor={item => item.uuid}
      />
    );
  }

  renderNoData() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{translations.noData}</Text>
      </View>
    )
  }

  render() {
    const { translations } = this.context;
    const { onDimiss } = this.props;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => onDimiss()} contentContainerStyle={ styles.container }>
          <Text style={styles.header}>{translations.participantList}</Text>

          { !!this.props.participants.length && this.renderParticipantList() }
          { !this.props.participants.length && this.renderNoData() }

          <View style={styles.btnWrapper}>
            <Button mode="contained" labelStyle={{color: '#fff'}} onPress={() => onDimiss()}>{translations.close}</Button>
          </View>

        </Modal>
      </Portal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
    marginHorizontal: 30,
    justifyContent: 'flex-start'
  },
  header: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20,
    textTransform: 'capitalize'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});
