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

import {isAllIndicatorDownloaded, isAllCafDownloaded, CheckAllAudioDownloaded, isAllRatingScaleDownloaded} from '../../services/scorecard_detail_service';
import {saveLanguageIndicator} from '../../services/language_indicator_service';
import {saveIndicator} from '../../services/indicator_service';
import {saveCaf} from '../../services/caf_service';
import {saveAudio} from '../../services/audio_service';
import ratingScaleService  from '../../services/rating_scale_service';
import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';
import {handleApiResponse} from '../../services/api_service';

class ScorecardDetail extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      detail: '',
      isIndicatorDownloaded: false,
      isLanguageIndicatorDownloaded: false,
      isCafDownloaded: false,
      isAllAudioDownloaded: false,
      isStopDownloadIndicator: true,
      isStopDownloadCaf: true,
      isStopDownloadAudio: true,
      isFinishChecking: false,
      isRatingScaleDownloaded: false,
      downloadProgress: 0,
      showDownloadProgress: false,
    };
  }

  componentDidMount() {
    const scorecard = realm.objects('Scorecard').filtered(`uuid == '${this.props.route.params.scorecard_uuid}'`)[0];
    this.scorecard = scorecard;
    this.setState({detail: scorecard});
    this.checkSavedIndicator();
    this.checkSavedCaf();
    this.checkSavedRatingScale(scorecard.program_id);
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
      CheckAllAudioDownloaded(indicators, async (isAllDownloaded) => {
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

  checkSavedRatingScale = (programId) => {
    this.setState({
      isRatingScaleDownloaded: isAllRatingScaleDownloaded(programId)
    })
  }

  renderScorecardDetail = () => {
    const {detail} = this.state;
    return (<DisplayScorecardInfo scorecardDetail={detail}/>);
  };

  downloadIndicator = () => {
    this.setState({isStopDownloadIndicator: false});
    this.fetchIndicatorFromApi(async (response) => {
      this.setState({
        isStopDownloadIndicator: true,
        isStopDownloadAudio: false,
      });
      const indicators = await response;
      saveIndicator(this.props.route.params.scorecard_uuid, indicators, this.updateDownloadProgress, async (isIndicatorDownloaded) => {
        this.setState({isIndicatorDownloaded});
      });
      saveLanguageIndicator(this.props.route.params.scorecard_uuid, indicators, this.updateDownloadProgress, (isLanguageIndicatorDownloaded) => {
        this.setState({isLanguageIndicatorDownloaded});
      });
      saveAudio(0, indicators, this.updateDownloadProgress, async (isAllAudioDownloaded) => {
        this.setState({isAllAudioDownloaded});
      });
      ratingScaleService.saveData(this.state.detail.program_id, this.updateDownloadProgress, (isRatingScaleDownloaded) => {
        this.setState({isRatingScaleDownloaded});
      });
    }, (response) => {
      this.setState({isStopDownloadIndicator: true});
    });
  }

  fetchIndicatorFromApi = async (successCallback, failedCallback) => {
    const indicatorApi = new IndicatorApi();
    const response = await indicatorApi.load(this.scorecard.facility_id);
    handleApiResponse(response, successCallback, failedCallback);
  }

  downloadCaf = () => {
    this.setState({isStopDownloadCaf: false});
    this.fetchCafFromApi(async (response) => {
      const cafs = await response;
      saveCaf(this.props.route.params.scorecard_uuid, cafs, this.updateDownloadProgress, async (isCafDownloaded) => {this.setState({isCafDownloaded})});
      this.setState({
        isStopDownloadAudio: true,
        isStopDownloadCaf: true,
      });
    }, (response) => {
      this.setState({
        isStopDownloadAudio: true,
        isStopDownloadCaf: true,
      });
    });
  }

  fetchCafFromApi = async (successCallback, failedCallback) => {
    const cafApi = new CafApi();
    const response = await cafApi.load(this.scorecard.local_ngo_id);
    handleApiResponse(response, successCallback, failedCallback);
  }

  downloadScorecard = () => {
    const {isIndicatorDownloaded, isCafDownloaded, isAllAudioDownloaded} = this.state;
    this.setState({showDownloadProgress: true});
    if (!isIndicatorDownloaded || !isAllAudioDownloaded)
      this.downloadIndicator();
    if (!isCafDownloaded)
      this.downloadCaf();
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
    const {isStopDownloadIndicator, isStopDownloadCaf, isStopDownloadAudio} = this.state;

    if (isStopDownloadIndicator && isStopDownloadCaf && isStopDownloadAudio)
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
    const {translations} = this.context;
    if (!this.isFullyDownloaded() && this.state.isFinishChecking) {
      const isDisabled = this.isDisableDownload();
      return (
        <View>
          <ProgressBar progress={this.state.downloadProgress} color={Color.headerColor} style={styles.progressBar}
            visible={this.state.showDownloadProgress}
          />

          <Button full bordered iconRight primary
            onPress={() => this.downloadScorecard()}
            disabled={isDisabled}
            style={[CustomStyle.bottomButton, isDisabled ? {borderColor: 'gray'} : {}]}
          >
            <Text style={[styles.buttonLabelStyle, isDisabled ? {color: 'gray'} : {color: '#E2762D'}]}>
              {translations["downloadAndSave"]}
            </Text>
            <Icon name="download" style={{right: 0, position: 'absolute'}} />
          </Button>
        </View>
      );
    }
  };

  updateScorecardDownloadStatus = () => {
    const attrs = {
      uuid: this.props.route.params.scorecard_uuid,
      downloaded: true,
    };
    realm.write(() => { realm.create('Scorecard', attrs, 'modified'); });
  }

  renderStartButton = () => {
    const {translations} = this.context;
    if (this.isFullyDownloaded() && this.state.isFinishChecking) {
      this.updateScorecardDownloadStatus();
      return (<BottomButton label={translations.start} onPress={() => this.startScorecard()} />);
    }
  };

  _renderHeader() {
    const {translations} = this.context;
    return (
      <BigHeader
        title={translations.welcomeTo}
        bigTitle={translations.scorecardApp}
        onBackPress={() => this.props.navigation.goBack()}/>
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
          <View style={styles.buttonContainer}>
            {this.renderDownloadButton()}
            {this.renderStartButton()}
          </View>
        </ScrollView>
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e6e7e9',
    marginBottom: 20,
  },
});

export default ScorecardDetail;
