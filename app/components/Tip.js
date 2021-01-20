import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { LocalizationContext } from '../components/Translations';
import { Icon } from 'native-base';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import cardListItemStyle from '../themes/cardListItemStyle';
import tips from '../db/jsons/tips';
import TipModal from './Tip/TipModal';
import screenInstructions from '../db/jsons/screenInstructions';

export default class Tip extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      tip: tips.filter(t => t.screenName == props.screenName)[0] || tips[0],
      screenInstruction: screenInstructions.filter(s => s.screenName == props.screenName)[0] || screenInstructions[0],
      visibleModal: false
    };
  }

  renderTipIcon(scorecard) {
    let iconSize = 73 * 0.9;

    return (
      <View style={[cardListItemStyle.statusIconWrapper]}>
        <Image source={require('../assets/images/tip.png')} style={{width: iconSize, height: iconSize}}/>
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};
    const { translations } = this.context;
    const description = this.state.tip.description || this.state.tip.tips.map(t => t.title).join(' ');

    return (
      <View>
        <TouchableOpacity
          onPress={ () => this.setState({visibleModal: true}) }
          style={[cardListItemStyle.listItem, customStyle.card]}>

          { this.renderTipIcon(scorecard) }

          <View style={cardListItemStyle.contentWrapper}>
            <Text style={cardListItemStyle.h1}>{ translations.tips }</Text>

            <Text numberOfLines={2} style={cardListItemStyle.paragraph}>{ description }</Text>

            <View style={cardListItemStyle.viewDetail}>
              <Text>{translations.viewTips}</Text>
              <Icon name='chevron-forward-outline' style={{fontSize: 24}} />
            </View>

          </View>
        </TouchableOpacity>

        <TipModal
          visible={this.state.visibleModal}
          tip={this.state.tip}
          screenInstruction={this.state.screenInstruction}
          onDimiss={() => this.setState({visibleModal: false})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    minHeight: 450,
    marginHorizontal: 30,
    justifyContent: 'flex-start'
  },
});
