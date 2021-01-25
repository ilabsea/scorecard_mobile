import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';

import { LocalizationContext } from './Translations';
import { Modal, Portal } from 'react-native-paper';
import { Icon } from 'native-base';
import screenInstructions from '../db/jsons/screenInstructions';
import TipListItem from './Tip/TipListItem';
import styles from '../themes/modalStyle';
import BottomButton from './BottomButton';

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
      <TipListItem
        titleStyle={{color: '#fff'}}
        key={index}
        title={note}
        number={index + 1} />
    );

    return (
      <View style={{backgroundColor: '#858796', borderRadius: 10, padding: 20, paddingBottom: 0}}>
        {doms}
      </View>
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.visible} dismissable={false} contentContainerStyle={ styles.containerFull }>
          <Text style={styles.title}>
            {translations.notes}: {this.state.screen.title}
          </Text>

          <ImageBackground
            imageStyle={{borderRadius: 10}}
            source={ require('../assets/images/community.png') }
            style={{flex: 1, resizeMode: "cover"}} >

            <ScrollView style={{flex: 1}}>
              { this.renderContent() }

            </ScrollView>
          </ImageBackground>

          <View style={{paddingTop: 20}}>
            <BottomButton label={translations.next} onPress={this.props.onDimiss} />
          </View>
        </Modal>
      </Portal>
    )
  }
}
