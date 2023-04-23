import React from 'react';
import AudioPlayerButton from 'react-native-audio-player-button';

import Color from '../../themes/color';
import { pressableItemSize } from '../../utils/component_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class CustomAudioPlayerButton extends React.Component {
  render() {
    const iconSize = this.props.useSmallIcon ? getDeviceStyle(24, 20) : getDeviceStyle(34, 30);

    return <AudioPlayerButton
              {...this.props}
              isSpeakerIcon={this.props.isPlayIcon ? false : true}
              isFromAppBundle={true}
              allowPause={false}
              buttonColor='transparent'
              buttonWidth={pressableItemSize()}
              buttonHeight={pressableItemSize()}
              iconPrimaryColor={Color.clickableColor}
              iconSecondaryColor={Color.clickableColor}
              iconSize={this.props.iconSize || iconSize}
            />
  }
}

export default CustomAudioPlayerButton;