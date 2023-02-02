import React, {Component} from 'react';
import { View } from 'react-native';

import {getLanguageIndicator} from '../../services/language_indicator_service';

// import PlaySound from '../Share/PlaySound';
import CustomAudioPlayerButton from '../Share/CustomAudioPlayerButton';

class IndicatorAudioButton extends Component {
  state = {
    audioFile: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.playingIndicatorId != props.indicator.uuid) {
      const languageIndicator = getLanguageIndicator(props.scorecardUUID, props.indicator.indicator_uuid, 'audio');
      return { audioFile: languageIndicator != undefined ? languageIndicator.local_audio : null }
    }

    return null;
  }

  render() {
    return (
      <View style={{justifyContent: 'center', borderWidth: 0}}>
        {/* <PlaySound filePath={this.state.audioFile}
          onPress={() => this.props.updatePlayingIndicatorId(this.props.indicator.uuid)}
        /> */}

        <CustomAudioPlayerButton
          audio={this.state.audioFile}
          itemUuid={this.props.indicator.uuid}
          playingUuid={this.props.playingIndicatorId}
          updatePlayingUuid={(uuid) => this.props.updatePlayingIndicatorId(uuid)}
          buttonStyle={{borderRadius: 0, alignItems: 'flex-end'}}
        />
      </View>
    );
  }
}

export default IndicatorAudioButton;