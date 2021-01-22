import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { LocalizationContext } from './Translations';
import { Modal, Portal } from 'react-native-paper';
import { Icon } from 'native-base';
import CloseButton from './CloseButton';
import screenInstructions from '../db/jsons/screenInstructions';
import TipListItem from './Tip/TipListItem';
import styles from '../themes/modalStyle';

export default class InstructionModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      screen: screenInstructions.filter(x => x.screenName == props.screenName)[0]
    };
  }

  renderContent() {
    let doms = this.state.screen.notes.map((note, index) =>
      <TipListItem key={index} title={note} number={index + 1} />
    );

    return doms;
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.visible} dismissable={false} contentContainerStyle={ styles.container }>
          <Text style={styles.title}>
            {translations.notes}: {this.state.screen.title}
          </Text>

          <ScrollView style={{flex: 1}}>
            { this.renderContent() }
          </ScrollView>

          <View style={styles.btnActionWrapper}>
            <CloseButton onPress={this.props.onDimiss} label={translations.next} />
          </View>
        </Modal>
      </Portal>
    )
  }
}
