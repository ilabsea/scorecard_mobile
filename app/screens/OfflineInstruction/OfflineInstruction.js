import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';

import Color from '../../themes/color';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import ProgressHeader from '../../components/Share/ProgressHeader';
import BottomButton from '../../components/BottomButton';
import screenInstructions from '../../db/jsons/screenInstructions';
import TipListItem from '../../components/Tip/TipListItem';
import { containerPadding } from '../../utils/responsive_util'

import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';

export default class OfflineInstruction extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      screen: screenInstructions.filter(x => x.screenName == props.route.name)[0] || screenInstructions[0],
      isIndicatorBase: true
    };
    this.initProposeIndicatorType()
  }

  async initProposeIndicatorType() {
    this.setState({ isIndicatorBase: await isProposeByIndicatorBase() })
  }

  _renderHeader() {
    const { translations } = this.context;
    const { screen } = this.state;

    if (screen.header.type == 'ProgressHeader') {
      return (
        <ProgressHeader
          title={translations[screen.header.title]}
          progressIndex={screen.header.progressIndex}
        />
      )
    }

    return (
      <HorizontalProgressHeader
        title={translations[screen.header.title]}
        navigation={this.props.navigation}
        progressIndex={screen.header.progressIndex} />
    )
  }

  renderContent() {
    let doms = this.state.screen.notes.map((note, index) =>
      <TipListItem
        titleStyle={{color: Color.whiteColor}}
        key={index}
        title={note}
        number={index + 1} />
    );

    return (
      <View style={{backgroundColor: Color.tipContentBgColor, borderRadius: 10, padding: 20, paddingBottom: 0}}>
        {doms}
      </View>
    );
  }


  render() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        { this._renderHeader() }

        <ImageBackground
          source={ require('../../assets/images/community.png') }
          style={{flex: 1, resizeMode: "cover"}} >

          <ScrollView contentContainerStyle={{flex: 1, padding: containerPadding}}>
            { this.renderContent() }

          </ScrollView>
        </ImageBackground>

        <View style={{padding: containerPadding}}>
          <BottomButton label={translations.next} onPress={() => this.props.navigation.navigate(this.state.screen.navigateTo, {scorecard_uuid: this.props.route.params.scorecard_uuid, isIndicatorBase: this.state.isIndicatorBase})} />
        </View>
      </View>
    )
  }
}
