import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { Modal, Portal, Button, ProgressBar, Colors } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { setModalVisible } from '../../actions/criteriaModalAction';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import Sound from 'react-native-sound';

class CriteriaModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0
    };
  }

  componentWillUnmount(){
    if(this.sound) {
      this.sound.release();
      this.sound = null;
    }

    if(this.timeout) {
      clearInterval(this.timeout);
    }
  }

  renderDuration(){
    let seconds = Math.ceil(this.state.duration);
    if (!seconds) { return ''; }

    const h = parseInt(seconds/(60*60));
    const m = parseInt(seconds%(60*60)/60);
    const s = parseInt(seconds%60);

    return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }

  onDimiss() {
    this.setState({duration: 0, playSeconds: 0});
    this.props.setModalVisible(false);
  }

  playComplete = (success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }

    if(this.timeout) {
      clearInterval(this.timeout);
    }

    this.setState({ playState:'paused' });
    this.sound.setCurrentTime(0);
  }

  async playAudio() {
    this.sound = new Sound(this.props.criteriaModal.criteria.local_audio, '', (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      this.setState({duration: this.sound.getDuration(), playState: 'playing'});
      this.sound.play(this.playComplete);
    });

    this.timeout = setInterval(() => {
      if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing') {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: seconds});
        })
      }
    }, 100);
  }

  getProgress() {
    const { playSeconds, duration } = this.state;

    if (!playSeconds || !duration) { return 0; }

    return Math.ceil(playSeconds*1000/100) / Math.ceil(duration*1000/100);
  }

  renderBtnPlay() {
    if (!this.props.criteriaModal.criteria.local_audio ) {
      return;
    }

    let iconName = this.state.playState == 'playing' ? 'pause' : 'play';

    return (
      <View style={styles.btnPlayWrapper}>
        <TouchableOpacity
          onPress={() => this.playAudio()}
          style={{width: 42, height: 42, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 21}}>

          <Icon name={iconName} style={{marginLeft: 3, color: Color.headerColor}}/>
        </TouchableOpacity>

        <View style={{flex: 1}}></View>

        <Text>{ this.renderDuration() }</Text>
      </View>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.criteriaModal.visible} onDismiss={() => this.onDimiss() } contentContainerStyle={ styles.container }>
          <Text style={styles.header}>{this.props.criteriaModal.criteria.tag}</Text>

          <Text>{translations.issueNote}</Text>

          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text style={{fontSize: 22}}>
                { this.props.criteriaModal.criteria.content || '-' }
              </Text>
            </View>

            <View style={{ height: 60 }}></View>

            { this.renderBtnPlay() }

            <ProgressBar progress={this.getProgress()} color={Color.headerColor} style={styles.progressBar} />
          </View>

          <View style={{flex: 1}}></View>

          <View style={styles.btnWrapper}>
            <Button mode="contained" labelStyle={{color: '#fff'}} onPress={() => this.onDimiss()}>{translations.close}</Button>
          </View>

        </Modal>
      </Portal>
    )
  }
}

function mapStateToProps(state) {
  return {
    criteriaModal: state.criteriaModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setModalVisible: (visibility) => dispatch(setModalVisible(visibility))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaModal);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
    marginHorizontal: 30,
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  header: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20,
    textTransform: 'capitalize'
  },
  btnPlayWrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%'
  },
  progressBar: {
    height: 60,
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
    backgroundColor: '#e6e7e9'
  },
  contentWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 16,
    position: 'relative'
  },
  content: {
    backgroundColor: '#f2f3f5',
    minHeight: 80,
    justifyContent: 'center',
    paddingHorizontal: 16
  }
});
