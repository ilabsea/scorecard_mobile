import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Sound from 'react-native-sound';
import Color from '../../themes/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {setRatingScaleAudioStatus} from '../../actions/ratingScaleAction';
import {PLAYING, PAUSED} from '../../constants/indicator_constant';
import votingIndicatorService from '../../services/voting_indicator_service';
import { getDeviceStyle } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';

class PlaySound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playState: 'pause'
    };
  }

  async componentDidMount() {
    const isPlaying = await votingIndicatorService.isPlayingIndicator(this.props.position);
    if (isPlaying)
      this.setState({playState: 'playing'});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.playState == 'playing')
      this.setState({ playState: 'pause' });
  }

  componentWillUnmount() {
    if (this.sound) this.sound.release();
    if (global.sound) global.sound.release();
    this.props.setRatingScaleAudioStatus(PAUSED);

    this.setState = (state, callback) => {
      return;
    };
  }

  playComplete = (success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }

    this.setState({playState: 'pause'});
    this.props.setRatingScaleAudioStatus(PAUSED);
  }

  playAudio() {
    !!this.props.onPress && this.props.onPress();

    if (!this.props.filePath) {
      return;
    }

    this.sound = null;
    Sound.setCategory('Playback');
    let folder = this.props.isLocal ? Sound.MAIN_BUNDLE : '';

    votingIndicatorService.clearPlayingIndicator();
    this.props.setRatingScaleAudioStatus(PAUSED);

    if (global.sound)
      global.sound.release();

    if (this.state.playState === 'playing') {
      this.setState({playState: 'pause'});
      return;
    }

    this.props.setRatingScaleAudioStatus(PLAYING);

    this.sound = new Sound(this.props.filePath, folder, (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      if (global.sound)
        global.sound.release();

      this.setState({playState: 'playing'});
      this.sound.play(this.playComplete);
      global.sound = this.sound;
    });

    if (this.props.onSavePlayingAudio)
      this.props.onSavePlayingAudio();
  }

  getIconName() {
    if (!this.props.filePath) {
      return 'volume-mute-outline';
    }

    return this.state.playState == 'playing' ? 'pause' : 'volume-medium-outline';
  }

  render() {
    const defaultColor = !!this.props.filePath ? Color.clickableColor : Color.grayColor;
    const iconColor = this.props.iconColor || defaultColor;
    const iconSize = this.props.useSmallIcon ? getDeviceStyle(28, 20) : getDeviceStyle(34, 30);
    const btnStyles = [styles.btnAudio, { backgroundColor: this.props.hasBackground ? defaultColor : 'none' }];

    return (
      <TouchableOpacity onPress={() => this.playAudio()}
        style={[!this.props.isHeader ? btnStyles : {}, this.props.containerStyle]}
      >
        { this.props.children }
        <Icon name={this.getIconName()} style={[{ color: iconColor, fontSize: iconSize}, this.getIconName() == 'pause' ? {marginLeft: 1} : {}]}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btnAudio: {
    width: pressableItemSize(),
    height: pressableItemSize(),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 18,
  }
});

function mapStateToProps(state) {
  return {
    ratingScaleAudio: state.ratingScaleAudioReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRatingScaleAudioStatus: (status) => dispatch(setRatingScaleAudioStatus(status)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaySound);