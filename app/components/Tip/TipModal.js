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
    let doms = this.props.tip.tips.map((tip, index) =>
      <TipListItem
        key={index}
        title={tip.title}
        subTitle={tip.subTitle}
        number={index + 1} />
    )

    return doms;
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.props.onDimiss} contentContainerStyle={ [styles.container, { minHeight: '70%' }] }>
          <ScrollView style={{flex: 1}}>
            <Text style={styles.title}>{ this.props.tip.title }</Text>

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
