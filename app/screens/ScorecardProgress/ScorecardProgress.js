import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

import realm from '../../db/schema';
import { LocalizationContext } from '../../components/Translations';
import VerticalProgressStep from '../../components/ScorecardProgress/VerticalProgressStep';
import Color from '../../themes/color';
import { Icon } from 'native-base';
import scorecardService from '../../services/scorecardService';
import { ProgressBar } from 'react-native-paper';

export default class ScorecardProgress extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    let scorecard = realm.objects('Scorecard').filtered(`uuid == '${props.route.params.uuid}'`)[0];

    this.state = {
      scorecard: scorecard,
      progressPercentag: 0,
      showProgress: false
    };
  }

  _renderBtnDownload() {
    const { translations } = this.context

    return (
      <TouchableOpacity style={[styles.btn, styles.btnOutline]}>
        <View style={{flex: 1}}></View>

        <Text style={styles.btnOutlineText}>{translations['resumeDownload']}</Text>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Icon name={'cloud-download-outline'} style={{color: Color.headerColor, marginRight: 20}}/>
        </View>
      </TouchableOpacity>
    )
  }

  submitToServer() {
    if (!this.state.scorecard.isCompleted || this.state.scorecard.isUploaded) { return; }
    this.setState({showProgress: true});

    scorecardService.upload(this.state.scorecard.uuid, (progressPercentag) => {
      this.setState({progressPercentag: progressPercentag});

      if (progressPercentag == 1) {
        setTimeout(() => {
          this.setState({showProgress: false});
        }, 500);
      }
    });
  }

  _renderBtnSubmit() {
    const { translations } = this.context
    const btnStyle = (this.state.scorecard.isCompleted && !this.state.scorecard.isUploaded) ? { backgroundColor: Color.headerColor } : styles.btnDisabled;

    return (
      <TouchableOpacity
        onPress={() => this.submitToServer() }
        style={[styles.btn, btnStyle]}>

        <Text style={{color: '#fff', fontWeight: 'bold'}}>{translations['submit']}</Text>
        { this.state.scorecard.isUploaded &&
          <Icon name={'lock-closed'}  style={{position: 'absolute', right: 6, color: '#fff'}}/>
        }
      </TouchableOpacity>
    )
  }

  _renderProgressBar() {
    return (
      <ProgressBar
        progress={this.state.progressPercentag}
        color={Color.headerColor}
        style={styles.progressBar}
        visible={ this.state.showProgress }
      />
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={{flex: 1, padding: 16}}>
          <Text style={{fontSize: 24, color: "#000", fontWeight: 'bold', lineHeight: 40, marginBottom: 16}}>3 of 5 Step</Text>

          <VerticalProgressStep
            progressIndex={this.state.scorecard.status || 3}
            scorecardUuid={this.state.scorecard.uuid}
            navigation={this.props.navigation}/>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            { this._renderProgressBar() }
            { false && this._renderBtnDownload() }
            { this._renderBtnSubmit() }
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Color.headerColor,
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  btnDisabled: {
    backgroundColor: Color.disabledBtnBg,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderColor: Color.headerColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20
  },
  btnOutlineText: {
    color: Color.headerColor,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e6e7e9',
    marginBottom: 20,
  },
})
