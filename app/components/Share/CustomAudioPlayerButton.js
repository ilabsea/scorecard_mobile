import React from 'react';
import AudioPlayerButton from 'react-native-audio-player-button';
import Icon from 'react-native-vector-icons/Ionicons';

import Color from '../../themes/color';
import { pressableItemSize } from '../../utils/component_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class CustomAudioPlayerButton extends React.Component {
  render() {
    const iconSize = this.props.useSmallIcon ? getDeviceStyle(28, 20) : getDeviceStyle(34, 30);

    return <AudioPlayerButton
              {...this.props}
              isSpeakerIcon={true}
              isFromAppBundle={true}
              allowPause={false}
              buttonColor='transparent'
              buttonWidth={pressableItemSize()}
              buttonHeight={pressableItemSize()}
              iconPrimaryColor={Color.clickableColor}
              iconSecondaryColor={Color.clickableColor}
              iconSize={iconSize}
              customIcon={<Icon/>}
              customIconSet={{play: 'volume-medium-outline', pause: 'pause', mute: 'volume-mute-outline'}}
            />
  }
}

export default CustomAudioPlayerButton;