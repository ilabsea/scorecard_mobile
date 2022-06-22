import React, {Component} from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { LocalizationContext } from '../../components/Translations';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';
import ScorecardProgressButtons from '../../components/ScorecardProgress/ScorecardProgressButtons';
import ScorecardProgressHeader from '../../components/ScorecardProgress/ScorecardProgressHeader';
import ScorecardProgressScrollView from '../../components/ScorecardProgress/ScorecardProgressScrollView';

import Color from '../../themes/color';
import ScorecardService from '../../services/scorecardService';
import internetConnectionService from '../../services/internet_connection_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import scorecardProgressService from '../../services/scorecard_progress_service';
import Scorecard from '../../models/Scorecard';
import settingHelper from '../../helpers/setting_helper';
import { ERROR_SUBMIT_SCORECARD } from '../../constants/error_constant';

import { connect } from 'react-redux';

class ScorecardProgress extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.uuid),
      progressPercentag: 0,
      showProgress: false,
      visibleModal: false,
      errorType: null,
      hasInternetConnection: false,
      messageModalTitle: null,
      messageModalDescription: null,
      isLoading: false,
      hasMatchedEndpointUrl: false,
      isEditable: false,
      isSyncing: false,

      progressMessage: '',
    };
    this.unsubscribeNetInfo;
    this.componentIsUnmount = false;
  }

  async componentDidMount() {
    this.setState({
      hasMatchedEndpointUrl: await Scorecard.hasMatchedEndpointUrl(this.state.scorecard.uuid),
      isEditable: await Scorecard.isEditable(this.state.scorecard),
      progressMessage: await scorecardProgressService.getProgressMessage(this.props.indicators, this.state.scorecard),
    });

    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
  }

  componentWillUnmount() {
    this.componentIsUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
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

    this.checkScorecardProposeIndicatorMethod(() => {
      this.uploadScorecard();
    });
  }

  uploadScorecard() {
    const scorecardService = new ScorecardService();
    scorecardService.upload(this.state.scorecard.uuid, (progressPercentag) => {
      this.setState({progressPercentag: progressPercentag});
      if (progressPercentag == 1) {
        setTimeout(() => {
          this.setState({
            showProgress: false,
            visibleModal: false,
            isEditable: false,
          });
        }, 500);
        scorecardTracingStepsService.trace(this.state.scorecard.uuid, 10);
      }
    }, (errorType) => {
      this.setState({
        visibleModal: true,
        errorType: errorType,
        showProgress: false,
      });
    });

    this.checkSubmitProgress();
  }

  async checkScorecardProposeIndicatorMethod(callback) {
    if (!!this.state.scorecard.propose_indicator_method) {
      callback();
      return;
    }

    Scorecard.update(this.state.scorecard.uuid,
      { propose_indicator_method: await settingHelper.getProposeIndicatorMethodForScorecard() },
      (scorecard) => callback()
    );
  }

  checkSubmitProgress() {
    setTimeout(() => {
      if (!this.componentIsUnmount && this.state.showProgress) {
        this.setState({
          showProgress: false,
          visibleModal: true,
          errorType: ERROR_SUBMIT_SCORECARD,
        });
      }
    }, 60000);
  }

  async updateScorecard(updatedScorecard = null) {
    const scorecardUuid = this.props.currentScorecard ? this.props.currentScorecard.uuid : this.props.route.params.uuid;
    const scorecard = !!updatedScorecard ? updatedScorecard : Scorecard.find(scorecardUuid);

    this.setState({
      scorecard: scorecard,
      isEditable: await Scorecard.isEditable(scorecard),
      progressMessage: await scorecardProgressService.getProgressMessage(this.props.indicators, scorecard)
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScorecardProgressHeader
          scorecard={this.state.scorecard}
          updateLoadingStatus={(status) => this.setState({isLoading: status})}
          updateErrorMessageModal={(errorType, visibleModal) => this.setState({ errorType, visibleModal })}
          hasMatchedEndpointUrl={this.state.hasMatchedEndpointUrl}
          isSyncing={this.state.isSyncing}
        />

        <Spinner visible={this.state.isLoading} color={Color.primaryColor} overlayColor={Color.loadingBackgroundColor} />

        <ScorecardProgressScrollView scorecard={this.state.scorecard}
          updateScorecard={(scorecard) => this.updateScorecard(scorecard)}
          isEditable={this.state.isEditable}
          navigation={this.props.navigation}
          updateSyncStatus={(isSyncing) => this.setState({ isSyncing })}
        />

        <ScorecardProgressButtons
          scorecard={this.state.scorecard}
          progressPercentag={this.state.progressPercentag}
          showProgress={this.state.showProgress}
          indicators={this.props.indicators}
          submitToServer={() => this.submitToServer()}
          updateScorecard={() => this.updateScorecard()}
          progressMessage={this.state.progressMessage}
        />

        <ErrorMessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          errorType={this.state.errorType}
          isSubmit={true}
          isNewScorecard={false}
          scorecardUuid={this.state.scorecard.uuid}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentScorecard: state.currentScorecard,
    indicators: state.votingIndicators.sort((a, b) => (a.median > b.median) ? 1 : -1),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardProgress);