import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Container} from "native-base";
import Loading from 'react-native-whc-loading';
import BigHeader from '../../components/BigHeader';

import {LocalizationContext} from '../../components/Translations';
import DisplayScorecardInfo from '../../components/ScorecardDetail/DisplayScorecardInfo';
import DownloadButton from '../../components/ScorecardDetail/DownloadButton';
import BottomButton from '../../components/BottomButton';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';

import IndicatorApi from '../../api/IndicatorApi';
import CafApi from '../../api/CafApi';
import authenticationService from '../../services/authentication_service';

import {
  isAllIndicatorDownloaded,
  isAllCafDownloaded,
  checkAllAudioDownloaded,
  isAllRatingScaleDownloaded,
  handleSaveIndicator,
  handleSaveLanguageIndicator,
  handleSaveAudio,
  handleSaveRatingScale,
  cancelApiRequest,
  getScorecardDetail,
  updateScorecardDownloadStatus,
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
      isStopDownloadIndicator: true,
      isStopDownloadCaf: true,
      isStopDownloadAudio: true,
      isStopDownloadRatingScale: true,
      isStopDownloadLangIndicator: true,
      isFinishChecking: false,
      isRatingScaleDownloaded: false,
      downloadProgress: 0,
      showDownloadProgress: false,
      isStopDownload: false,
      visibleModal: false,
      errorType: null,
    };
  }

  async componentDidMount() {
    this.scorecard = await getScorecardDetail(this.props.route.params.scorecard_uuid);
    this.setState({detail: this.scorecard});
    this.checkSavedIndicator();
    this.checkSavedCaf();
    this.checkSavedRatingScale(this.scorecard.program_id);
  }

  checkSavedIndicator = () => {
    this.refs.loading.show();
    this.fetchIndicatorFromApi(async (response) => {
      const indicators = await response;
      const isIndicatorsDownloaded = await isAllIndicatorDownloaded(indicators, this.state.detail.facility_id);
      this.setState({
        isIndicatorDownloaded: isIndicatorsDownloaded,
        isLanguageIndicatorDownloaded: isIndicatorsDownloaded,
      });
      checkAllAudioDownloaded(indicators, async (isAllDownloaded) => {
        this.setState({isAllAudioDownloaded: isAllDownloaded});
      });
    }, (response) => {});
  }

  checkSavedCaf = () => {
    this.fetchCafFromApi(async (response) => {
      const cafs = response;
      this.setState({
        isCafDownloaded: await isAllCafDownloaded(cafs, this.state.detail.local_ngo_id),
        isFinishChecking: true,
      });
      this.refs.loading.show(false);
    }, (response) => {
      this.setState({isFinishChecking: true})
      this.refs.loading.show(false);
    });
  }

  checkSavedRatingScale = async (programId) => {
    this.setState({
      isRatingScaleDownloaded: await isAllRatingScaleDownloaded(programId)
    })
  }

  renderScorecardDetail = () => {
    const {detail} = this.state;
    return (<DisplayScorecardInfo scorecardDetail={detail}/>);
  };

  downloadIndicator = () => {
    if (this.state.isIndicatorDownloaded && this.state.isLanguageIndicatorDownloaded && this.state.isAllAudioDownloaded) {
      this.updateDownloadProgress(0.6);
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
        this.setState({
          isIndicatorDownloaded,
          isStopDownloadIndicator: true,
        });
      });

      handleSaveLanguageIndicator(options, this.state.isLanguageIndicatorDownloaded, (isLanguageIndicatorDownloaded) => {
        this.setState({
          isLanguageIndicatorDownloaded,
          isStopDownloadLangIndicator: true,
        });
      });

      handleSaveAudio(options, this.state.isAllAudioDownloaded, this.audioService, (isAllAudioDownloaded) => {
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

    handleSaveRatingScale(
      this.state.detail.program_id,
      this.state.isRatingScaleDownloaded,
      this.ratingScaleService,
      this.updateDownloadProgress,
      async (isRatingScaleDownloaded) => {
        this.setState({
          isRatingScaleDownloaded,
          isStopDownloadRatingScale: true,
        });
      }
    );
  }

  downloadCaf = () => {
    if (this.state.isCafDownloaded || this.state.errorType) {
      this.updateDownloadProgress(0.2);
      return;
    }

    this.setState({isStopDownloadCaf: false});
    this.fetchCafFromApi(async (response) => {
      const cafs = await response;
      saveCaf(this.props.route.params.scorecard_uuid, cafs, this.updateDownloadProgress, async (isCafDownloaded) => {
        this.setState({
          isCafDownloaded,
          isStopDownloadCaf: true,
        })
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
  };

  startScorecard = () => {
    this.props.navigation.navigate('ScorecardPreference', {scorecard_uuid: this.props.route.params.scorecard_uuid, local_ngo_id: this.state.detail.local_ngo_id});
  }

  isFullyDownloaded = () => {
    const {isIndicatorDownloaded, isCafDownloaded, isAllAudioDownloaded, isLanguageIndicatorDownloaded, isRatingScaleDownloaded} = this.state;
    if (isIndicatorDownloaded && isCafDownloaded && isAllAudioDownloaded && isLanguageIndicatorDownloaded && isRatingScaleDownloaded)
      return true;

    return false;
  }

  isDisableDownload = () => {
    const {isStopDownloadIndicator, isStopDownloadCaf, isStopDownloadAudio, isStopDownloadLangIndicator, isStopDownloadRatingScale} = this.state;

    if (isStopDownloadIndicator && isStopDownloadCaf && isStopDownloadAudio && isStopDownloadLangIndicator && isStopDownloadRatingScale)
      return false;

    return true;
  }

  updateDownloadProgress = (percentage) => {
    const timeout = setTimeout(() => {
      const currentPrecentage = this.state.downloadProgress + percentage;
      this.setState({downloadProgress: currentPrecentage}, () => {
        if (this.state.downloadProgress >= 1)
          clearTimeout(timeout);
      });
    }, 500);
  }

  renderDownloadButton = () => {
    if (!this.isFullyDownloaded() && this.state.isFinishChecking) {
      const isDisabled = this.state.errorType ? false : this.isDisableDownload();

      return (
        <DownloadButton
          showDownloadProgress={this.state.showDownloadProgress}
          downloadProgress={this.state.downloadProgress}
          disabled={isDisabled}
          onPress={() => this.downloadScorecard()}
        />
      );
    }
  };

  renderStartButton = () => {
    const {translations} = this.context;
    if (this.isFullyDownloaded() && this.state.isFinishChecking) {
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
          <Loading
            ref="loading"
            backgroundColor="#ffffffF2"
            borderRadius={5}
            size={70}
            imageSize={40}
            indicatorColor={Color.primaryColor}
          />

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
