import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import tips from '../../db/jsons/tips';
import { Modal, Portal } from 'react-native-paper';
import CloseButton from '../CloseButton';
import TipListItem from './TipListItem';
import styles from '../../themes/modalStyle';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

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
    const marginHorizontalSize = getDeviceStyle(30, 20);
    const modalHeight = getDeviceStyle('70%', hp('80%'));

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.props.onDimiss}
          contentContainerStyle={ [styles.container, { minHeight: modalHeight, marginHorizontal: marginHorizontalSize, padding: containerPadding}] }
        >
          <ScrollView style={{flex: 1}}>
            <Text style={[styles.title, responsiveStyles.headerTitle]}>{ this.props.tip.title }</Text>

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
