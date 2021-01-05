import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Container, Button, Icon} from "native-base";
import {ProgressBar} from 'react-native-paper';
import Loading from 'react-native-whc-loading';
import realm from '../../db/schema';
import BigHeader from '../../components/BigHeader';

import {LocalizationContext} from '../../components/Translations';
import DisplayScorecardInfo from '../../components/ScorecardDetail/DisplayScorecardInfo';
import BottomButton from '../../components/BottomButton';

import IndicatorApi from '../../api/IndicatorApi';
import CafApi from '../../api/CafApi';

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
import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';
import {handleApiResponse} from '../../services/api_service';

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
    }, (response) => {
      this.setState({isStopDownloadIndicator: true});
    });
  }

  fetchIndicatorFromApi = async (successCallback, failedCallback) => {
    this.indicatorApi = new IndicatorApi();
    const response = await this.indicatorApi.load(this.scorecard.facility_id);
    handleApiResponse(response, successCallback, failedCallback);
  }

  downloadRatingScale = () => {
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
    if (this.state.isCafDownloaded) {
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
    }, (response) => {
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

  downloadScorecard = () => {
    this.setState({showDownloadProgress: true});
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
    const { translations } = this.context;

    if (!this.isFullyDownloaded() && this.state.isFinishChecking) {
      const isDisabled = this.isDisableDownload();

      return (
        <View>
          { this.state.showDownloadProgress &&
            <View>
              <Text style={styles.downloadPercentageLabel}>{Math.ceil(this.state.downloadProgress * 100)}%</Text>
              <ProgressBar progress={this.state.downloadProgress} color={Color.headerColor} style={styles.progressBar}
                visible={this.state.showDownloadProgress}
              />
            </View>
          }

          <Button full bordered iconRight primary
            onPress={() => this.downloadScorecard()}
            disabled={isDisabled}
            style={[CustomStyle.bottomButton, isDisabled ? {borderColor: 'gray'} : {}]}>

            <Text style={[styles.buttonLabelStyle, isDisabled ? {color: 'gray'} : {color: '#E2762D'}]}>
              {translations["downloadAndSave"]}
            </Text>
            <Icon name="download" style={{right: 0, position: 'absolute'}} />
          </Button>
        </View>
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
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
  progressBar: {
    height: 30,
    backgroundColor: '#e6e7e9',
    marginBottom: 20,
  },
  downloadPercentageLabel: {
    textAlign: 'center',
    zIndex: 1,
    marginTop: 4,
    left: '48%',
    position: 'absolute',
    fontWeight: 'bold',
  }
});

export default ScorecardDetail;
