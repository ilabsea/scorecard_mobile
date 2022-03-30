import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Tooltip from 'react-native-walkthrough-tooltip';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { bodyFontSize, subTitleFontSize } from '../../utils/font_size_util';
import { getTimeFromDuration } from '../../utils/time_util';

class RecordAudioButton extends Component {
  static contextType = LocalizationContext;
  state = {
    toolTipVisible: false,
  }

  renderRecordTime = () => {
    return (
      <Text style={{fontWeight: 'bold', fontSize: subTitleFontSize()}}>
        { getTimeFromDuration(this.props.recordDuration) }
      </Text>
    );
  };

  render() {
    const { translations } = this.context;

    return (
      <View>
        <View style={{alignItems: 'center', height: 30}}>
          {this.props.isRecording && this.renderRecordTime()}
        </View>
        <Tooltip
          isVisible={this.state.toolTipVisible}
          content={<Text style={{fontSize: bodyFontSize()}}>{ translations.pleasePressAndHoldTheButtonToRecordAudio }</Text>}
          contentStyle={{width: 300, flexWrap: 'wrap', flexDirection: 'row'}}
          placement="top"
          onClose={() => this.setState({ toolTipVisible: false })}
        >
          <TouchableOpacity
            onLongPress={() => this.props.recordVoice()}
            onPressOut={() => this.props.stopRecordVoice()}
            onPress={() => this.setState({ toolTipVisible: true })}
            style={styles.voiceRecordButton}>
            <MaterialIcon name="mic" size={35} color={Color.whiteColor} />
          </TouchableOpacity>
        </Tooltip>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  voiceRecordButton: {
    backgroundColor: Color.primaryButtonColor,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default RecordAudioButton;