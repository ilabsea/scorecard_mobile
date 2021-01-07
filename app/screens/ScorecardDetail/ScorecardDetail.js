import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Container} from "native-base";
import BigHeader from '../../components/BigHeader';

import {LocalizationContext} from '../../components/Translations';
import DisplayScorecardInfo from '../../components/ScorecardDetail/DisplayScorecardInfo';
import DownloadButton from '../../components/ScorecardDetail/DownloadButton';
import BottomButton from '../../components/BottomButton';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';

import IndicatorApi from '../../api/IndicatorApi';
import CafApi from '../../api/CafApi';
import authenticationService from '../../services/authentication_service';

import { getEachSectionPercentage } from '../../utils/scorecard_detail_util';

import {
  handleSaveIndicator,
  handleSaveLanguageIndicator,
  handleSaveAudio,
  handleSaveRatingScale,
  handleSaveProgramLanguage,
  cancelApiRequest,
  getScorecardDetail,
  updateScorecardDownloadStatus,
  updateDownloadedField,
  isDownloaded,
  isResumeDownload,
} from '../../services/scorecard_detail_service';

import {saveCaf} from '../../services/caf_service';
import {AudioService} from '../../services/audio_service';
import RatingScaleService  from '../../services/rating_scale_service';
import Color from '../../themes/color';
import {getErrorType, handleApiResponse} from '../../services/api_service';

class ScorecardDetail extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.audioService = new AudioService(false);
    this.ratingScaleService = new RatingScaleService(false);
    this.indicatorApi = null;
    this.cafApi = null;
    this.state = {
      detail: '',
      isIndicatorDownloaded: false,
      isLanguageIndicatorDownloaded: false,
      isCafDownloaded: false,
      isAllAudioDownloaded: false,
      isRatingScaleDownloaded: false,
      isProgramLanguageDownloaded: false,
      isStopDownloadIndicator: true,
      isStopDownloadCaf: true,
      isStopDownloadAudio: true,
      isStopDownloadRatingScale: true,
      isStopDownloadLangIndicator: true,
      isStopDownloadProgramLanguage: true,
      downloadProgress: 0,
      showDownloadProgress: false,
      isStopDownload: false,
      visibleModal: false,
      errorType: null,
      isFinishDownloaded: false,
    };
  }

  async componentDidMount() {
    this.scorecard = await getScorecardDetail(this.props.route.params.scorecard_uuid);
    this.setState({
      detail: this.scorecard,
      isIndicatorDownloaded: this.scorecard.indicator_downloaded,
      isLanguageIndicatorDownloaded: this.scorecard.language_indicator_downloaded,
      isCafDownloaded: this.scorecard.caf_downloaded,
      isAllAudioDownloaded: this.scorecard.audio_downloaded,
      isRatingScaleDownloaded: this.scorecard.rating_scale_downloaded,
      isProgramLanguageDownloaded: this.scorecard.program_language_downloaded,
    });
  }

  renderScorecardDetail = () => {
    const {detail} = this.state;
    return (<DisplayScorecardInfo scorecardDetail={detail}/>);
  };

  downloadIndicator = () => {
    if (this.state.isIndicatorDownloaded && this.state.isLanguageIndicatorDownloaded && this.state.isAllAudioDownloaded) {
      this.updateDownloadProgress(getEachSectionPercentage() * 3);
      return;
    }

    this.setState({
      isStopDownloadIndicator: this.state.isIndicatorDownloaded,
      isStopDownloadLangIndicator: this.state.isLanguageIndicatorDownloaded,
      isStopDownloadAudio: this.state.isAllAudioDownloaded,
    });
    this.fetchIndicatorFromApi(async (response) => {
      const options = {
        indicators: await response,
        scorecardUuid: this.props.route.params.scorecard_uuid,
        updateDownloadProgress: this.updateDownloadProgress,
      };

      handleSaveIndicator(options, this.state.isIndicatorDownloaded, (isIndicatorDownloaded) => {
        updateDownloadedField(this.props.route.params.scorecard_uuid, 'indicator', isIndicatorDownloaded);

        this.setState({
          isIndicatorDownloaded,
          isStopDownloadIndicator: true,
        });
      });

      handleSaveLanguageIndicator(options, this.state.isLanguageIndicatorDownloaded, (isLanguageIndicatorDownloaded) => {
        updateDownloadedField(this.props.route.params.scorecard_uuid, 'language_indicator', isLanguageIndicatorDownloaded);

        this.setState({
          isLanguageIndicatorDownloaded,
          isStopDownloadLangIndicator: true,
        });
      });

      handleSaveAudio(options, this.state.isAllAudioDownloaded, this.audioService, (isAllAudioDownloaded) => {
        updateDownloadedField(this.props.route.params.scorecard_uuid, 'audio', isAllAudioDownloaded);

        this.setState({
          isAllAudioDownloaded,
          isStopDownloadAudio: true,
        });
      });
    }, (error) => {
      this.setErrorState(error);
      this.setState({isStopDownloadIndicator: true});
    });
  }

  fetchIndicatorFromApi = async (successCallback, failedCallback) => {
    this.indicatorApi = new IndicatorApi();
    const response = await this.indicatorApi.load(this.scorecard.facility_id);
    handleApiResponse(response, successCallback, failedCallback);
  }

  downloadRatingScale = () => {
    if (this.state.errorType)
      return;

    if (this.state.isRatingScaleDownloaded) {
      this.updateDownloadProgress(getEachSectionPercentage());
      return;
    }

    this.setState({ isStopDownloadRatingScale: false });
    handleSaveRatingScale(
      this.state.detail.program_id,
      this.ratingScaleService,
      this.updateDownloadProgress,
      async (isRatingScaleDownloaded) => {
        updateDownloadedField(this.props.route.params.scorecard_uuid, 'rating_scale', isRatingScaleDownloaded);

        this.setState({
          isRatingScaleDownloaded,
          isStopDownloadRatingScale: true,
        });
      }
    );
  }

  downloadCaf = () => {
    if (this.state.isCafDownloaded || this.state.errorType) {
      this.updateDownloadProgress(getEachSectionPercentage());
      return;
    }

    this.setState({isStopDownloadCaf: false});
    this.fetchCafFromApi(async (response) => {
      const cafs = await response;
      saveCaf(this.props.route.params.scorecard_uuid, cafs, this.updateDownloadProgress, async (isCafDownloaded) => {
        updateDownloadedField(this.props.route.params.scorecard_uuid, 'caf', isCafDownloaded);

        this.setState({
          isCafDownloaded,
          isStopDownloadCaf: true,
        });
      });
    }, (error) => {
      this.setErrorState(error);
      this.setState({
        isStopDownloadAudio: true,
        isStopDownloadCaf: true,
      });
    });
  }

  fetchCafFromApi = async (successCallback, failedCallback) => {
    this.cafApi = new CafApi();
    const response = await this.cafApi.load(this.scorecard.local_ngo_id);
    handleApiResponse(response, successCallback, failedCallback);
  }

  downloadProgramLanguage = () => {
    if (this.state.isProgramLanguageDownloaded) {
      this.updateDownloadProgress(getEachSectionPercentage());
      return;
    }

    this.setState({ isStopDownloadProgramLanguage: false });
    handleSaveProgramLanguage(
      this.state.detail.program_id,
      this.updateDownloadProgress,
      (isProgramLanguageDownloaded) => {
        updateDownloadedField(this.props.route.params.scorecard_uuid, 'program_language', isProgramLanguageDownloaded);

        this.setState({
          isProgramLanguageDownloaded,
          isStopDownloadProgramLanguage: true,
        });
      }
    );
  }

  downloadScorecard = async () => {
    const isErrorAuthentication = await authenticationService.isErrorAuthentication();
    if (isErrorAuthentication) {
      this.setErrorState('422');
      return;
    }

    this.setState({
      showDownloadProgress: true,
      errorType: null,
      downloadProgress: 0,
    });
    this.downloadIndicator();
    this.downloadCaf();
    this.downloadRatingScale();
    this.downloadProgramLanguage();
  };

  startScorecard = () => {
    this.props.navigation.navigate('ScorecardPreference', {scorecard_uuid: this.props.route.params.scorecard_uuid, local_ngo_id: this.state.detail.local_ngo_id});
  }

  isFullyDownloaded = () => {
    return isDownloaded(this.props.route.params.scorecard_uuid) || this.state.isFinishDownloaded;
  }

  isDisableDownload = () => {
    const {
      isStopDownloadIndicator,
      isStopDownloadCaf,
      isStopDownloadAudio,
      isStopDownloadLangIndicator,
      isStopDownloadRatingScale,
      isStopDownloadProgramLanguage,
    } = this.state;

    if (isStopDownloadIndicator && isStopDownloadCaf &&
        isStopDownloadAudio && isStopDownloadLangIndicator &&
        isStopDownloadRatingScale && isStopDownloadProgramLanguage)
      return false;

    return true;
  }

  updateDownloadProgress = (percentage) => {
    const timeout = setTimeout(() => {
      const currentPercentage = this.state.downloadProgress + percentage;
      this.setState({downloadProgress: currentPercentage}, () => {
        if (this.state.downloadProgress >= 0.98) {
          updateScorecardDownloadStatus(this.props.route.params.scorecard_uuid);
          this.setState({
            isFinishDownloaded: true
          });
          clearTimeout(timeout);
        }
      });
    }, 500);
  }

  renderDownloadButton = () => {
    if (!this.isFullyDownloaded()) {
      const isDisabled = this.state.errorType ? false : this.isDisableDownload();
      const { translations } = this.context;
      const label = isResumeDownload(this.state.detail) ? translations.resumeDownload : translations.downloadAndSave;

      return (
        <DownloadButton
          showDownloadProgress={this.state.showDownloadProgress}
          downloadProgress={this.state.downloadProgress}
          disabled={isDisabled}
          onPress={() => this.downloadScorecard()}
          label={label}
        />
      );
    }
  };

  renderStartButton = () => {
    const {translations} = this.context;
    if (this.isFullyDownloaded()) {
      updateScorecardDownloadStatus(this.props.route.params.scorecard_uuid);
      return (
        <BottomButton label={translations.start} onPress={() => this.startScorecard()} />
      );
    }
  };

  onBackPress = () => {
    cancelApiRequest(this.indicatorApi, this.cafApi, this.ratingScaleService);
    this.setState({
      isStopDownload: true,
    });
    this.audioService.isStopDownload = true;
    this.ratingScaleService.isStopDownload = true;
    this.props.navigation.goBack();
  }

  _renderHeader() {
    const {translations} = this.context;
    return (
      <BigHeader
        title={translations.welcomeTo}
        bigTitle={translations.scorecardApp}
        onBackPress={() => this.onBackPress()}/>
    )
  }

  setErrorState = (error) => {
    this.setState({
      errorType: getErrorType(error),
      showDownloadProgress: false,
      visibleModal: true,
    });
  }

  render() {
    const {translations} = this.context;
    return (
      <Container>
        {this._renderHeader()}
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{fontSize: 18, marginBottom: -10}}>{translations.pleaseCheckScorecardDetailBelow}</Text>
          {this.renderScorecardDetail()}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {this.renderDownloadButton()}
          {this.renderStartButton()}
        </View>
        <ErrorMessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          errorType={this.state.errorType}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 20
  },
});

export default ScorecardDetail;
