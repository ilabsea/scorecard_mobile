import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

import { LocalizationContext } from '../components/Translations';
import { Icon } from 'native-base';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import cardListItemStyle from '../themes/cardListItemStyle';
import tips from '../db/jsons/tips';
import { Modal, Portal, Button, Avatar } from 'react-native-paper';
import uuidv4 from '../utils/uuidv4';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

export default class TipModal extends Component {
  static contextType = LocalizationContext;

  renderTip(tip, index) {
    return (
      <View key={uuidv4()} style={{flexDirection: 'row', marginBottom: 20}}>
        <View style={{marginRight: 20}}>
          <Avatar.Text size={60} label={index+1} style={{backgroundColor: Color.tipBgColor}} />
        </View>

        <View style={{flex: 1}}>
          <Text style={{fontFamily: FontFamily.title, fontSize: 18}}>{tip.title}</Text>
          <Text>{tip.subTitle}</Text>
        </View>
      </View>
    )
  }

  renderTipList() {
    let doms = this.props.tip.tips.map((tip, i) => this.renderTip(tip, i));

    return doms;
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.props.onDimiss} contentContainerStyle={ styles.container }>
          <Text style={{fontSize: 24, fontFamily: FontFamily.title, marginBottom: 20}}>{ translations.tipsDetails }</Text>

          <ScrollView style={{flex: 1}}>
            { this.renderTipList() }
          </ScrollView>

          <View style={styles.btnWrapper}>
            <Button mode="contained" contentStyle={{backgroundColor: Color.headerColor}} labelStyle={{color: '#fff', fontFamily: FontFamily.title}} onPress={this.props.onDimiss}>{translations.close}</Button>
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
    minHeight: "60%",
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

