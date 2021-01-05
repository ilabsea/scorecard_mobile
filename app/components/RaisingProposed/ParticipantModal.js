import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Icon, Button, Text} from 'native-base';
import { Modal, Portal, Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ActionButton from '../ActionButton';
import Color from '../../themes/color';
import realm from '../../db/schema';
import styles from '../../themes/participantListItemStyle';
import ParticipantModalListItem from './ParticipantModalListItem';
import CloseButton from '../CloseButton';

export default class ParticipantModal extends Component {
  static contextType = LocalizationContext;

  onPressItem(item) {
    this.props.onDismiss();

    !!this.props.onPressItem && this.props.onPressItem(item);
  }

  renderParticipantItem(item) {
    const { translations } = this.context;

    return (
      <ParticipantModalListItem
        participant={item}
        translations={translations}
        onPress={() => this.onPressItem(item) }
      />
    );
  }

  renderParticipantList() {
    return (
      <FlatList
        style={{flex: 1, backgroundColor: '', marginBottom: 20}}
        data={ this.props.participants }
        renderItem={({item, index}) => this.renderParticipantItem(item, index)}
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

  renderAddNewParticipantButton = () => {
    const {translations} = this.context;
    const numberOfParticipant = realm.objects('Scorecard').filtered(`uuid == '${this.props.scorecardUuid}'`)[0].number_of_participant;
    const addedParticipants = realm.objects('Participant').filtered(`scorecard_uuid == '${this.props.scorecardUuid}'`);
    let isDisabled = addedParticipants.length === numberOfParticipant;
    return (
      <View style={{height: 50, alignItems: 'center'}}>
        <Button iconLeft bordered primary disabled={isDisabled} onPress={() => this.props.showAddParticipantModal()} style={{alignSelf: 'flex-end'}}>
          <Icon name='plus' type="FontAwesome" style={isDisabled ? {color: 'gray'} : {color: Color.primaryButtonColor}} />
          <Text style={[styles.buttonLabel, isDisabled ? {color: 'gray'} : {}]}>{translations.addNewParticipant}</Text>
        </Button>

        { isDisabled &&
          <Text style={{color: 'red', fontSize: 14}}>{translations.reachTotalParticipant}</Text>
        }
      </View>
    );
  }

  render() {
    const { translations } = this.context;
    const { onDismiss } = this.props;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => onDismiss()} contentContainerStyle={ styles.container }>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={styles.header}>{translations.participantList}</Text>

            <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
              {this.renderAddNewParticipantButton()}
            </View>
          </View>

          { !!this.props.participants.length && this.renderParticipantList() }
          { !this.props.participants.length && this.renderNoData() }

          <View style={styles.btnWrapper}>
            <CloseButton onPress={() => onDismiss()} label={translations.close} />
          </View>
        </Modal>
      </Portal>
    )
  }
}
