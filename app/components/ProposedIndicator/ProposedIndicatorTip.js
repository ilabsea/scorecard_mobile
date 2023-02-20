import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomSheetModal from '../BottomSheetModal';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import YoutubeIframePlayer from '../Share/YoutubeIframePlayer';

import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import { proposedIndicatorTipSnapPoints } from '../../constants/modal_constant';

class ProposedIndicatorTip extends Component {
  static contextType = LocalizationContext;

  renderContent() {
    return (
      <View>
        <BottomSheetModalTitle title={`${this.context.translations.tips} -  ${this.context.translations.proposedIndicatorTip}`} dashedLineStyle={{ marginBottom: 8 }}/>
        <View style={{paddingHorizontal: containerPadding}}>
          <Text style={{ marginBottom: 20, marginTop: 10, fontSize: bodyFontSize() }}>
            ខាងក្រោមជាវិធីសាស្ត្រមួយចំនួនដែលអាចជួយអ្នកក្នុងការទទួលបានលក្ខណៈវិនិច្ឆ័យពីអ្នកចូលរួមដើម្បីធ្វើការបំផុស។
          </Text>
          <YoutubeIframePlayer videoId="mrDtdRQ-LlQ" height={getDeviceStyle(320, 200)} width='100%' />
        </View>
      </View>
    )
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.tipModalRef}
        content={this.renderContent()}
        snapPoints={proposedIndicatorTipSnapPoints}
      />
    )
  }
}

export default ProposedIndicatorTip;