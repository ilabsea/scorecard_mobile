import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView
} from 'react-native';

import { LocalizationContext } from '../Translations';
import tips from '../../db/jsons/tips';
import { Modal, Portal } from 'react-native-paper';
import CloseButton from '../CloseButton';
import TipListItem from './TipListItem';
import styles from '../../themes/modalStyle';

export default class TipModal extends Component {
  static contextType = LocalizationContext;

  renderTips() {
    if (!this.props.tip.tips.length) { return; }

    let doms = this.props.tip.tips.map((tip, index) =>
      <TipListItem
        key={index}
        title={tip.title}
        subTitle={tip.subTitle}
        number={index + 1} />
    )

    return (
      <View>
        <View style={styles.devider}></View>
        <Text style={styles.title}>{ this.props.tip.title }</Text>

        { doms }
      </View>
    );
  }

  renderInstructions() {
    const { translations } = this.context;

    let doms = this.props.screenInstruction.notes.map((note, index) =>
      <TipListItem title={note} number={index + 1} key={index} />
    )

    return (
      <View>
        <Text style={styles.title}>
          {translations.notes}: {this.props.screenInstruction.title}
        </Text>

        { doms }
      </View>
    )
  }

  render() {
    const { translations } = this.context;
    let minHeightStyle = this.props.tip.tips.length ? { minHeight: '70%' } : {};

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.props.onDimiss} contentContainerStyle={ [styles.container, minHeightStyle] }>
          <ScrollView style={{flex: 1}}>
            { this.renderInstructions() }
            { this.renderTips() }
          </ScrollView>

          <View style={styles.btnActionWrapper}>
            <CloseButton onPress={this.props.onDimiss} label={translations.close} />
          </View>
        </Modal>
      </Portal>
    )
  }
}
