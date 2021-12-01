import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Moment from 'moment';

import {LocalizationContext} from '../../components/Translations';
import ProgressHeader from '../../components/ProgressHeader';
import ScorecardPreferenceForm from '../../components/ScorecardPreference/ScorecardPreferenceForm';
import ScorecardPreferenceButtons from '../../components/ScorecardPreference/ScorecardPreferenceButtons';
import ScorecardPreferenceModals from '../../components/ScorecardPreference/ScorecardPreferenceModals';

import { getErrorType } from '../../services/api_service';
import internetConnectionService from '../../services/internet_connection_service';
import scorecardPreferenceService from '../../services/scorecard_preference_service';
import scorecardSyncService from '../../services/scorecard_sync_service';
import scorecardStepService from '../../services/scorecard_step_service';
import Scorecard from '../../models/Scorecard';
import Color from '../../themes/color';

import {
  isDownloaded as isScorecardDownloaded,
  download,
  stopDownload,
  getDownloadPercentage,
} from '../../services/scorecard_download_service';

let _this = null;

class ScorecardPreference extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    const scorecard = Scorecard.find(this.props.route.params.scorecard_uuid)

    this.state = {
      scorecard: scorecard,
      languages: [],
      textLocale: scorecard.text_language_code || '',
      audioLocale: scorecard.audio_language_code || '',
      date: scorecard.conducted_date || Moment().format('DD/MM/YYYY'),
      downloadProgress: 0,
      visibleModal: false,
      errorType: null,
      isFinishDownloaded: false,
      isDownloading: false,
      isErrorDownload: false,
      isDownloadAudio: false,
      hasInternetConnection: false,
      visibleConfirmModal: false,
    };

    _this = this;
    this.formRef = React.createRef();
    this.unsubscribeNetInfo;
  }

  componentDidMount() {
    const { appLanguage } = this.context;

    scorecardSyncService.syncPlannedDates(this.props.route.params.scorecard_uuid);

    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });

    scorecardPreferenceService.loadProgramLanguage(this.state.scorecard, appLanguage,
      (languageSet) => {
        this.setState({
          languages: languageSet.languages,
          textLocale: languageSet.textLocale,
          audioLocale: languageSet.audioLocale,
        });
      },
      (error) => {
        this.setState({languages: []});
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  changeValue = (fieldName, value) =>  {
    let newState = {};
    newState[fieldName] = value;
    this.setState(newState);
  }

  saveSelectedData = () => {
    this.formRef.current.closeAllSelectBox()
    const {date, textLocale, audioLocale} = this.state;
    scorecardPreferenceService.saveSelectedData(this.props.route.params.scorecard_uuid, date, textLocale, audioLocale);

    scorecardStepService.recordStep(this.props.route.params.scorecard_uuid, 2);

    this.props.navigation.navigate('Facilitator', {scorecard_uuid: this.props.route.params.scorecard_uuid, local_ngo_id: this.props.route.params.local_ngo_id});
  }

  showConfirmModal = (hasScorecardDownload) => {
    if (hasScorecardDownload)
      this.downloadScorecard();
    else
      this.setState({ visibleConfirmModal: true });
  }

  downloadScorecard = () => {
    this.setState({ visibleConfirmModal: false });

    if (this.state.errorType || isScorecardDownloaded(this.props.route.params.scorecard_uuid))
      return;

    this.setState({
      errorType: null,
      downloadProgress: 0,
      isDownloading: true,
      isErrorDownload: false,
    });

    const {date, textLocale, audioLocale} = this.state;
    scorecardPreferenceService.updatePreference(this.props.route.params.scorecard_uuid, date, textLocale, audioLocale);

    download(this.state.scorecard, this.state.audioLocale, this.updateDownloadProgress, this.errorCallback);
  };

  updateDownloadProgress = () => {
    let updatedPercentage = this.state.downloadProgress;

    const { scorecard_uuid } = this.props.route.params;
    this.setState({downloadProgress: getDownloadPercentage(scorecard_uuid)}, () => {
      updatedPercentage = isScorecardDownloaded(scorecard_uuid) ? 1 : this.state.downloadProgress;
    });

    if (updatedPercentage >= 1) {
      this.setState({
        isFinishDownloaded: true,
        isDownloading: false,
      });

      Scorecard.update(this.props.route.params.scorecard_uuid, { downloaded: true });
    }
  }

  errorCallback = (error) => {
    this.setState({
      errorType: getErrorType(error),
      isDownloading: false,
      visibleModal: true,
      isErrorDownload: true,
    });
  }

  onBackPress = () => {
    stopDownload();
    this.props.navigation.goBack();
  }

  onDismissModal(type) {
    const modalState = {
      message_modal: { visibleConfirmModal: false },
      error_modal: {
        visibleModal: false,
        isErrorDownload: false,
        errorType: null,
      }
    };

    _this.setState(modalState[type]);
  }

  renderBottomButtons() {
    return (
      <ScorecardPreferenceButtons
        scorecardUuid={this.props.route.params.scorecard_uuid}
        isFinishDownloaded={this.state.isFinishDownloaded}
        languages={this.state.languages}
        errorType={this.state.errorType}
        isDownloading={this.state.isDownloading}
        isErrorDownload={this.state.isErrorDownload}
        downloadProgress={this.state.downloadProgress}
        showConfirmModal={this.showConfirmModal}
        saveSelectedData={() => this.saveSelectedData()}
        hasInternetConnection={this.state.hasInternetConnection}
        errorCallback={this.errorCallback}
      />
    )
  }

  renderModals() {
    return (
      <ScorecardPreferenceModals
        scorecardUuid={this.props.route.params.scorecard_uuid}
        languages={this.state.languages}
        selectedLanguage={{text_locale: this.state.textLocale, audio_locale: this.state.audioLocale}}
        visibleModal={this.state.visibleModal}
        visibleConfirmModal={this.state.visibleConfirmModal}
        errorType={this.state.errorType}
        onDismissModal={this.onDismissModal}
        downloadScorecard={() => this.downloadScorecard()}
      />
    )
  }

  renderForm() {
    return (
      <ScorecardPreferenceForm
        ref={this.formRef}
        languages={this.state.languages}
        changeValue={this.changeValue}
        scorecard={this.state.scorecard}
        textLocale={this.state.textLocale}
        audioLocale={this.state.audioLocale}
      />
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.formRef.current.closeAllSelectBox()}>
        <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
          <ProgressHeader
            title={this.context.translations['getStarted']}
            progressIndex={0}/>

          { this.renderForm() }

          { this.renderBottomButtons() }

          { this.renderModals() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ScorecardPreference;