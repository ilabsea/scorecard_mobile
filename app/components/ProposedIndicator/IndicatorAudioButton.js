import React, {Component} from 'react';
import { View } from 'react-native';
import {getLanguageIndicator} from '../../services/language_indicator_service';

import PlaySound from '../Share/PlaySound';

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
      <View style={{justifyContent: 'center'}}>
        <PlaySound filePath={this.state.audioFile}
          onPress={() => this.props.updatePlayingIndicatorId(this.props.indicator.uuid)}
        />
      </View>
    );
  }
}

export default IndicatorAudioButton;