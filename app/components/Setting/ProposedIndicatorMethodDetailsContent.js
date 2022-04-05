import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';

import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { getProposedIndicatorVideoId } from '../../utils/proposed_indicator_util';
import { navigationRef } from '../../navigators/app_navigator';

class ProposedIndicatorMethodDetailsContent extends React.Component {
  static contextType = LocalizationContext;

  showVideoPlayer() {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'VideoPlayer', params: { video_id: getProposedIndicatorVideoId(this.props.proposeMethod.value), title: this.props.proposeMethod.label } }
    ]});
  }

  render() {
    return (
      <View style={{ backgroundColor: Color.accordionContentBgColor, borderColor: Color.paleGrayColor, borderWidth: 1 }}>
        <View style={{padding: containerPadding}}>
          <Text style={{fontSize: bodyFontSize()}}>
            { this.props.proposeMethod.description }
          </Text>

          <TouchableOpacity onPress={() => this.showVideoPlayer()} style={{ flexDirection: 'row', marginTop: 30 }}>
            <Icon name='play-circle-filled' size={20} color={Color.clickableColor} style={{padding: 0, marginRight: 5, marginTop: getDeviceStyle(3, 0), height: 20}} />
            <Text style={{color: Color.clickableColor, fontSize: bodyFontSize()}}>{ this.context.translations.clickHereToWatchHowToProposeIndicator }</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorMethodDetailsContent;