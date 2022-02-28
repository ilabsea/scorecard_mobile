import React, {Component} from 'react';

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from '../Translations';
import tips from '../../db/jsons/tips';
import { Modal, Portal } from 'react-native-paper';
import CloseButton from '../CloseButton';
import TipListItem from './TipListItem';
import BottomSheetModal from '../BottomSheetModal';
import styles from '../../themes/modalStyle';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

export default class TipModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      snapPoints: ['45%', '80%']
      // snapPoints: ['0%', '45%', '80%']
    }
  }

  renderTips() {
    // let doms = this.props.tip.tips.map((tip, index) =>
    //   <TipListItem
    //     key={index}
    //     title={tip.title}
    //     subTitle={tip.subTitle}
    //     number={index + 1} />
    // )

    let doms = this.props.tip.tips.map((tip, index) => {
      if (index == 3 ) {
        return (
          <React.Fragment key={index}>
            { !this.state.isExpanded && this.renderExpandButton() }

            <TipListItem
              title={tip.title}
              subTitle={tip.subTitle}
              number={index + 1} />
          </React.Fragment>
        )
      }
      else
        return <TipListItem
                key={index}
                title={tip.title}
                subTitle={tip.subTitle}
                number={index + 1} />
    })

    return doms;
  }

  expandModal() {
    this.setState({
      isExpanded: true,
      snapPoints: ['80%']
    });
  }

  renderExpandButton() {
    return (
      <TouchableOpacity onPress={() => this.expandModal()}
        style={{marginBottom: 20, marginTop: -15, alignSelf: 'flex-end', flexDirection: 'row'}}
      >
        <Text style={{color: Color.clickableColor, fontFamily: FontFamily.title, fontSize: 16}}>មើលបន្ថែម</Text>
        <Icon name="expand-more" color={Color.clickableColor} size={26} />
      </TouchableOpacity>
    )
  }

  renderContent() {
    return (
      <React.Fragment>
        <ScrollView style={{flex: 1, padding: containerPadding}}>
          <Text style={[styles.title, responsiveStyles.headerTitle, { marginBottom: 10 }]}>{ this.props.tip.title }</Text>

          { this.renderTips() }
        </ScrollView>
      </React.Fragment>
    )
  }

  onDismissModal() {
    console.log('=== on dismiss ===');
    this.setState({
      isExpanded: false,
      snapPoints: ['45%', '80%'],
    });
  }

  onChangeModal(index) {
    console.log('INDEX ==== ', index);

    this.setState({
      isExpanded: index > 0,
    });
  }

  render() {
    const { translations } = this.context;
    // const marginHorizontalSize = getDeviceStyle(30, 20);
    // const modalHeight = getDeviceStyle('70%', hp('80%'));

    return (
      <BottomSheetModal
        ref={this.props.tipModalRef}
        content={this.renderContent()}
        snapPoints={this.state.snapPoints}
        onDismiss={() => this.onDismissModal()}
        onChange={(index) => this.onChangeModal(index)}
      />
      
      // <BottomSheetModal ref={this.props.tipModalRef}>
      //   { this.renderContent() }
      // </BottomSheetModal>

      // <Portal>
      //   <Modal visible={this.props.visible} onDismiss={this.props.onDimiss}
      //     contentContainerStyle={ [styles.container, { minHeight: modalHeight, marginHorizontal: marginHorizontalSize, padding: containerPadding}] }
      //   >
      //     <ScrollView style={{flex: 1}}>
      //       <Text style={[styles.title, responsiveStyles.headerTitle, { marginBottom: 10 }]}>{ this.props.tip.title }</Text>

      //       { this.renderTips() }
      //     </ScrollView>

      //     <View style={styles.btnActionWrapper}>
      //       <CloseButton onPress={this.props.onDimiss} label={translations.close} />
      //     </View>
      //   </Modal>
      // </Portal>
    )
  }
}
