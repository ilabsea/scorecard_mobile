import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Moment from 'moment';

import {LocalizationContext} from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import DownloadButton from '../../components/ScorecardDetail/DownloadButton';
import ProgressHeader from '../../components/ProgressHeader';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';
import MessageModal from '../../components/MessageModal';
import ScorecardPreferenceForm from '../../components/ScorecardPreference/ScorecardPreferenceForm';

import ScorecardService from '../../services/scorecardService';
import authenticationFormService from '../../services/authentication_form_service';
import { getErrorType } from '../../services/api_service';
import internetConnectionService from '../../services/internet_connection_service';
import scorecardPreferenceService from '../../services/scorecard_preference_service';

import {
  isDownloaded as isScorecardDownloaded,
  download,
  stopDownload,
  getDownloadPercentage,
} from '../../services/scorecard_download_service';

class ScorecardPreference extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    const scorecardService = new ScorecardService();
    const scorecard = scorecardService.find(this.props.route.params.scorecard_uuid)

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

    this.formRef = React.createRef();;
  }

  componentDidMount() {
    internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });

    scorecardPreferenceService.loadProgramLanguage(this.state.scorecard,
      (languageSet) => {
        this.setState({
          languages: languageSet.languages,
          textLocale: languageSet.textLocale,
          audioLocale: languageSet.audioLocale,
        });
      }
    );
  }

  changeValue = (fieldName, value) =>  {
    let newState = {};
    newState[fieldName] = value;
    this.setState(newState);
  }

  saveSelectedData = () => {
    this.formRef.current.closeAllSelectBox()
    const {date, textLocale, audioLocale} = this.state;
    scorecardPreferenceService.updatePreference(this.props.route.params.scorecard_uuid, date, textLocale, audioLocale);

    this.props.navigation.navigate('Facilitator', {scorecard_uuid: this.props.route.params.scorecard_uuid, local_ngo_id: this.props.route.params.local_ngo_id});
  }

  isFullyDownloaded = () => {
    return scorecardPreferenceService.isFullyDownloaded(this.props.route.params.scorecard_uuid, this.state.isFinishDownloaded);
  }

  showConfirmModal = async (hasScorecardDownload) => {
    const { translations } = this.context;
    const isAuthenticated = await authenticationFormService.isAuthenticated();

    if (!this.state.hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection);
      return;
    }
    else if (!isAuthenticated) {
      this.errorCallback('422');
      return;
    }

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

  renderDownloadButton = () => {
    if (this.isFullyDownloaded())
      return;

    const { translations } = this.context;
    const isDisabled = this.state.errorType ? false : this.state.isDownloading;
    const hasScorecardDownload = scorecardPreferenceService.hasScorecardDownload(this.state.scorecard.uuid);
    const label = hasScorecardDownload ? translations.resumeDownload : translations.downloadAndSave;

    return (
      <View>
        { this.state.isErrorDownload &&
          <Text style={{textAlign: 'center', marginBottom: 5, color: 'red'}}>{translations.failedToDownloadScorecard}</Text>
        }

        <DownloadButton
          showDownloadProgress={this.state.isDownloading}
          downloadProgress={this.state.downloadProgress}
          disabled={isDisabled}
          onPress={() => this.showConfirmModal(hasScorecardDownload)}
          label={label}
        />
      </View>
    );
  };

  renderNextButton = () => {
    const {translations} = this.context;
    if (this.isFullyDownloaded()) {
      return (
        <BottomButton label={translations.next} onPress={() => this.saveSelectedData()} />
      );
    }
  };

  onBackPress = () => {
    stopDownload();
    this.props.navigation.goBack();
  }

  onDismissErrorMessageModal = () => {
    this.setState({
      visibleModal: false,
      isErrorDownload: false,
      errorType: null,
    });
  }

  render() {
    const {translations} = this.context;
    const textLocaleLabel = scorecardPreferenceService.getLocaleLabel(this.state.languages, this.state.textLocale);
    const audioLocaleLabel = scorecardPreferenceService.getLocaleLabel(this.state.languages, this.state.audioLocale);

    return (
      <TouchableWithoutFeedback onPress={() => this.formRef.current.closeAllSelectBox()}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ProgressHeader
            title={translations['getStarted']}
            onBackPress={() => this.onBackPress()}
            onPressHome={() => this.props.navigation.popToTop()}
            progressIndex={0}/>

          <ScrollView contentContainerStyle={styles.container}>
            <ScorecardPreferenceForm
              ref={this.formRef}
              languages={this.state.languages}
              changeValue={this.changeValue}
              scorecard={this.state.scorecard}
              textLocale={this.state.textLocale}
              audioLocale={this.state.audioLocale}
            />
          </ScrollView>

          <View style={{padding: 20}}>
            { this.renderDownloadButton() }

            { this.renderNextButton() }
          </View>

          <ErrorMessageModal
            visible={this.state.visibleModal}
            onDismiss={() => this.onDismissErrorMessageModal()}
            errorType={this.state.errorType}
          />

          <MessageModal
            visible={this.state.visibleConfirmModal}
            onDismiss={() => this.setState({visibleConfirmModal: false})}
            title={translations.theScorecardContainsImagesAndAudios}
            description={translations.formatString(translations.downloadScorcardDescription, textLocaleLabel, audioLocaleLabel)}
            hasConfirmButton={true}
            confirmButtonLabel={translations.ok}
            onPressConfirmButton={() => this.downloadScorecard()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 28,
  },
});

export default ScorecardPreference;
