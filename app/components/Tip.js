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
import { TouchableRipple } from 'react-native-paper';

export default class Tip extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      tip: tips.filter(t => t.screenName == props.screenName)[0] || tips[0],
      visibleModal: false
    };
  }

  renderTipIcon(scorecard) {
    let iconSize = 40;

    return (
      <View style={[cardListItemStyle.statusIconWrapper, {width: 70}]}>
        <Image source={require('../assets/images/tip.png')} style={{width: iconSize, height: iconSize}}/>
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};
    const { translations } = this.context;

    return (
      <View>
        <TouchableRipple
          onPress={ () => this.setState({visibleModal: true}) }
          style={[customStyle.card, {marginBottom: 16}]}>

          <View style={{flexDirection: 'row'}}>
            { this.renderTipIcon(scorecard) }

            <View style={styles.contentWrapper}>
              <Text style={[cardListItemStyle.h2, { marginBottom: 0, flex: 1 }]}>{ translations.tips }</Text>
              <Text style={{color: Color.headerColor}}>{translations.viewTips}</Text>
              <Icon name='chevron-forward-outline' style={{fontSize: 24, color: Color.headerColor}} />
            </View>
          </View>
        </TouchableRipple>

        <TipModal
          visible={this.state.visibleModal}
          tip={this.state.tip}
          onDimiss={() => this.setState({visibleModal: false})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
    paddingRight: 10
  }
});
