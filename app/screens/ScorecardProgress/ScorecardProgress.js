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
import ScorecardService from '../../services/scorecardService';
import internetConnectionService from '../../services/internet_connection_service';

import { ProgressBar } from 'react-native-paper';

import { connect } from 'react-redux';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import ScorecardProgressTabletStyles from './styles/tablet/ScorecardProgressStyle';
import ScorecardProgressMobileStyles from './styles/mobile/ScorecardProgressStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

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
      hasInternetConnection: false,
      messageModalTitle: null,
      messageModalDescription: null,
    };
  }

  componentDidMount() {
    internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
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
    const { translations } = this.context;

    if (!this.state.hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection,);
      return;
    }

    if (this.state.showProgress)
      return;

    if (!this.state.scorecard.isInLastPhase || this.state.scorecard.isUploaded) { return; }
    this.setState({
      showProgress: true,
      progressPercentag: 0,
    });

    const scorecardService = new ScorecardService();
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
    if (this.state.showProgress || this.state.scorecard.isUploaded || !this.state.scorecard.finished)
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
        style={[responsiveStyles.btn, btnStyle]}>

        <Text style={responsiveStyles.btnText}>{translations['submit']}</Text>
        { this.state.scorecard.isUploaded &&
          <Icon name={'lock-closed'}  style={responsiveStyles.lockIcon}/>
        }
      </TouchableOpacity>
    )
  }

  _renderProgressBar() {
    if (this.state.showProgress) {
      return (
        <View>
          <Text style={responsiveStyles.uploadPercentageLabel}>
            {Math.ceil(this.state.progressPercentag * 100)}%
          </Text>
          <ProgressBar
            progress={this.state.progressPercentag}
            color={Color.headerColor}
            style={responsiveStyles.progressBar}
            visible={ this.state.showProgress }
          />
        </View>
      );
    }
  }

  showMessageModal = (title, description) => {
    this.setState({
      visibleMessageModal: true,
      messageModalTitle: title,
      messageModalDescription: description,
    });
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={responsiveStyles.container}>
          <Text style={responsiveStyles.title}>{ translations.step }: {this.state.scorecard.status} / 5</Text>

          <VerticalProgressStep
            progressIndex={this.state.scorecard.status || 3}
            scorecard={this.state.scorecard}
            navigation={this.props.navigation}
            showMessageModal={() => this.showMessageModal(translations.locked, translations.alreadyUploaded)}
          />
        </ScrollView>

        <View style={{padding: containerPadding}}>
          { this._renderProgressBar() }
          { this._renderBtnSubmit() }
        </View>

        <ErrorMessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          errorType={this.state.errorType}
          isSubmit={true}
          isNewScorecard={false}
        />

        <MessageModal
          visible={this.state.visibleMessageModal}
          onDismiss={() => this.setState({visibleMessageModal: false})}
          title={this.state.messageModalTitle}
          description={this.state.messageModalDescription}
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
})
