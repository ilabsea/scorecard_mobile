import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import ProgressHeader from '../../components/ProgressHeader';
import BottomButton from '../../components/BottomButton';
import screenInstructions from '../../db/jsons/screenInstructions';
import TipListItem from '../../components/Tip/TipListItem';

export default class OfflineInstruction extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      screen: screenInstructions.filter(x => x.screenName == props.route.name)[0] || screenInstructions[0]
    };
  }

  _renderHeader() {
    const { translations } = this.context;
    const { screen } = this.state;

    if (screen.header.type == 'ProgressHeader') {
      return (
        <ProgressHeader
          title={translations[screen.header.title]}
          onBackPress={() => this.props.navigation.goBack()}
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
      <View style={{flex: 1}}>
        { this._renderHeader() }

        <ImageBackground
          source={ require('../../assets/images/community.png') }
          style={{flex: 1, resizeMode: "cover"}} >

          <ScrollView contentContainerStyle={{flex: 1, padding: 20}}>
            { this.renderContent() }

          </ScrollView>
        </ImageBackground>

        <View style={{padding: 20}}>
          <BottomButton label={translations.next} onPress={() => this.props.navigation.navigate(this.state.screen.navigateTo, {scorecard_uuid: this.props.route.params.scorecard_uuid})} />
        </View>
      </View>
    )
  }
}
