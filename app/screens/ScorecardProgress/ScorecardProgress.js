import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import VerticalProgressStep from '../../components/ScorecardProgress/VerticalProgressStep';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';
import MessageModal from '../../components/MessageModal';
import Color from '../../themes/color';
import { Icon } from 'native-base';
import scorecardService from '../../services/scorecardService';
import authenticationService from '../../services/authentication_service';

import { ProgressBar } from 'react-native-paper';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import { connect } from 'react-redux';

class ScorecardProgress extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    let scorecard = props.currentScorecard;

    this.state = {
      scorecard: scorecard,
      progressPercentag: 0,
      showProgress: false,
      visibleModal: false,
      errorType: null,
      visibleMessageModal: false,
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

  async submitToServer() {
    if (this.state.showProgress)
      return;

    if (!this.state.scorecard.isCompleted || this.state.scorecard.isUploaded) { return; }
    this.setState({
      showProgress: true,
      progressPercentag: 0,
    });

    scorecardService.upload(this.state.scorecard.uuid, (progressPercentag) => {
      this.setState({progressPercentag: progressPercentag});

      if (progressPercentag == 1) {
        setTimeout(() => {
          this.setState({showProgress: false});
        }, 500);
      }
    }, (errorType) => {
      this.setState({
        visibleModal: true,
        errorType: errorType,
        showProgress: false,
      });
    });
  }

  _isButtonDisable = () => {
    if (this.state.showProgress || !this.state.scorecard.isCompleted || this.state.scorecard.isUploaded)
      return true;

    return false;
  }

  _renderBtnSubmit() {
    const { translations } = this.context
    let isDisable = this._isButtonDisable();
    let btnStyle = isDisable ? styles.btnDisabled : { backgroundColor: Color.headerColor };

    return (
      <TouchableOpacity
        disabled={isDisable}
        onPress={() => this.submitToServer() }
        style={[styles.btn, btnStyle]}>

        <Text style={{color: '#fff', fontSize: 20}}>{translations['submit']}</Text>
        { this.state.scorecard.isUploaded &&
          <Icon name={'lock-closed'}  style={{position: 'absolute', right: 6, color: '#fff'}}/>
        }
      </TouchableOpacity>
    )
  }

  _renderProgressBar() {
    if (this.state.showProgress) {
      return (
        <View>
          <Text style={styles.uploadPercentageLabel}>
            {Math.ceil(this.state.progressPercentag * 100)}%
          </Text>
          <ProgressBar
            progress={this.state.progressPercentag}
            color={Color.headerColor}
            style={styles.progressBar}
            visible={ this.state.showProgress }
          />
        </View>
      );
    }
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{padding: 20}}>
          <Text style={{fontSize: 24, fontFamily: FontFamily.title, lineHeight: 40, marginBottom: 16}}>{ translations.step }: {this.state.scorecard.status} / 5</Text>

          <VerticalProgressStep
            progressIndex={this.state.scorecard.status || 3}
            scorecardUuid={this.state.scorecard.uuid}
            navigation={this.props.navigation}
            localNgoId={this.state.scorecard.local_ngo_id}
            showMessageModal={() => this.setState({ visibleMessageModal: true })}
          />
        </ScrollView>

        <View style={{padding: 20}}>
          { this._renderProgressBar() }
          { this._renderBtnSubmit() }
        </View>

        <ErrorMessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          errorType={this.state.errorType}
        />

        <MessageModal
          visible={this.state.visibleMessageModal}
          onDismiss={() => this.setState({visibleMessageModal: false})}
          title={translations.locked}
          description={translations.alreadyUploaded}
          hasConfirmButton={false}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentScorecard: state.currentScorecard,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardProgress);

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
    height: 30,
    backgroundColor: '#e6e7e9',
    marginBottom: 20,
  },
  uploadPercentageLabel: {
    textAlign: 'center',
    zIndex: 1,
    marginTop: 4,
    left: '48%',
    position: 'absolute',
    fontWeight: 'bold',
  }
})
