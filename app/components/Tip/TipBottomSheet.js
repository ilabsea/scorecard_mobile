import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomSheetModal from '../BottomSheetModal';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import YoutubeIframePlayer from '../Share/YoutubeIframePlayer';

import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding, isShortWidthScreen } from '../../utils/responsive_util';
import {tipModalSnapPoints } from '../../constants/modal_constant';
import { tips } from '../../constants/tip_constant';

class TipBottomSheet extends Component {
  static contextType = LocalizationContext;

  renderContent() {
    const tip = tips[this.props.type]
    return (
      <React.Fragment>
        <BottomSheetModalTitle title={`${this.context.translations.tips} -  ${this.context.translations[tip.title]}`} dashedLineStyle={{ marginBottom: 8 }}/>
        <View style={{paddingHorizontal: containerPadding}}>
          <Text style={{ marginBottom: 20, marginTop: 10, fontSize: bodyFontSize() }}>
            {tip.description}
          </Text>
          <YoutubeIframePlayer videoId={tip['video_id']} height={getDeviceStyle(320, isShortWidthScreen() ? 200 : 240)} width='100%' />
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