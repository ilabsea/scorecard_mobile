import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {Text} from 'native-base';
import { Modal, Portal } from 'react-native-paper';
import { LocalizationContext } from '../Translations';

import OutlinedButton from '../OutlinedButton';

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

    return (
      <OutlinedButton
        icon="plus"
        label={translations.addNew}
        onPress={() => this.props.showAddParticipantModal() }
      />
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
            <View style={{flex:1}} />
            {this.renderAddNewParticipantButton()}
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
