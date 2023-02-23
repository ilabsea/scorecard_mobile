import React, {Component} from 'react';
import { View, Text } from 'react-native';
import YoutubeIframePlayer from 'react-native-youtube-iframe-player';
import DeviceInfo from 'react-native-device-info'

import { LocalizationContext } from '../Translations';
import BottomSheetModal from '../BottomSheetModal';
import BottomSheetModalTitle from '../BottomSheetModalTitle';

import { bodyFontSize } from '../../utils/font_size_util';
import {containerPadding} from '../../utils/responsive_util';
import {tipModalSnapPoints } from '../../constants/modal_constant';
import { tips } from '../../constants/tip_constant';

class TipBottomSheet extends Component {
  static contextType = LocalizationContext;

  renderContent() {
    const {appLanguage} = this.context;
    const tip = tips[this.props.type]
    return (
      <React.Fragment>
        <BottomSheetModalTitle title={`${this.context.translations.tips} -  ${this.context.translations[tip.title]}`} dashedLineStyle={{ marginBottom: 8 }}/>
        <View style={{paddingHorizontal: containerPadding}}>
          <Text style={{ marginBottom: 20, marginTop: 10, fontSize: bodyFontSize() }}>
            {tip.description}
          </Text>
          <YoutubeIframePlayer videoUrl={tip['video_url']} isTablet={DeviceInfo.isTablet()} locale={appLanguage}/>
        </View>
      </React.Fragment>
    )
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.tipModalRef}
        content={this.renderContent()}
        snapPoints={tipModalSnapPoints[this.props.type]}
      />
    )
  }
}

export default TipBottomSheet;