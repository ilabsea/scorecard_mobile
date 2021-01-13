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
import authenticationService from '../../services/authentication_service';

import {
  cancelApiRequest,
  getScorecardDetail,
  handleSaveScorecardPhase,
  saveCallback,
} from '../../services/scorecard_detail_service';

import {
  find as findScorecardDownload,
  isDownloaded,
  getDownloadPercentage,
  isInidcatorSectionDownloaded,
} from '../../services/scorecard_download_service';

import {AudioService} from '../../services/audio_service';
import RatingScaleService  from '../../services/rating_scale_service';
import {getErrorType, handleApiResponse} from '../../services/api_service';

import {saveIndicator} from '../../services/indicator_service';
import {saveLanguageIndicator} from '../../services/language_indicator_service';
import { save as saveProgramLanguage } from '../../services/program_language_service';
import { save as saveCaf } from '../../services/caf_service';

import {
  indicatorPhase,
  languageIndicatorPhase,
  audioPhase,
  cafPhase,
  ratingScalePhase,
  programLanguagePhase,
} from '../../constants/scorecard_constant';

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
      downloadProgress: 0,
      showDownloadProgress: false,
      isStopDownload: false,
      visibleModal: false,
      errorType: null,
      isFinishDownloaded: false,
      isDownloading: false,
    };
  }

  async componentDidMount() {
    this.scorecard = await getScorecardDetail(this.props.route.params.scorecard_uuid);
    this.setState({ detail: this.scorecard });
  }

  renderScorecardDetail = () => {
    const {detail} = this.state;
    return (<DisplayScorecardInfo scorecardDetail={detail}/>);
  };

  downloadIndicatorSection = () => {
    if (isInidcatorSectionDownloaded()) {
      this.updateDownloadProgress();
      return;
    }

    this.fetchIndicatorFromApi(async (response) => {
      const indicators = await response;
      const { scorecard_uuid } = this.props.route.params;
      const phases = [
        {
          value: indicatorPhase,
          save: saveIndicator(scorecard_uuid, indicators, (isDownloaded) => {
            this._callback(indicatorPhase, isDownloaded);
          })
        },
        {
          value: languageIndicatorPhase,
          save: saveLanguageIndicator(scorecard_uuid, indicators, (isDownloaded) => {
            this._callback(languageIndicatorPhase, isDownloaded);
          })
        },
        {
          value: audioPhase,
          save: this.audioService.saveAudio(0, indicators, (isDownloaded) => {
            this._callback(audioPhase, isDownloaded);
          })
        }
      ]

      phases.map((phase) => {
        handleSaveScorecardPhase(scorecard_uuid, phase.value, this.updateDownloadProgress, () => {
          phase.save;
        });
      });
    }, (error) => {
      this.setErrorState(error);
      this.setState({isDownloading: false});
    });
  }

  fetchIndicatorFromApi = async (successCallback, failedCallback) => {
    this.indicatorApi = new IndicatorApi();
    const response = await this.indicatorApi.load(this.scorecard.facility_id);
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
      isDownloading: true,
    });

    if (this.state.errorType)
      return;

    this.downloadIndicatorSection();

    const { scorecard_uuid } = this.props.route.params;
    const { program_id, local_ngo_id } = this.state.detail

    const phases = [
      {
        value: cafPhase,
        save: saveCaf(local_ngo_id, (isDownloaded) => {
          this._callback(cafPhase, isDownloaded);
        })
      },
      {
        value: ratingScalePhase,
        save: this.ratingScaleService.saveData(program_id, (isDownloaded) => {
          this._callback(ratingScalePhase, isDownloaded);
        })
      },
      {
        value: programLanguagePhase,
        save: saveProgramLanguage(program_id, (isDownloaded) => {
          this._callback(programLanguagePhase, isDownloaded);
        })
      }
    ];

    phases.map((phase) => {
      handleSaveScorecardPhase(scorecard_uuid, phase.value, this.updateDownloadProgress, () => {
        phase.save;
      });
    });
  };

  _callback = (phase, isDownloaded) => {
    saveCallback(this.props.route.params.scorecard_uuid, phase, isDownloaded, this.updateDownloadProgress);
  }

  startScorecard = () => {
    this.props.navigation.navigate('ScorecardPreference', {scorecard_uuid: this.props.route.params.scorecard_uuid, local_ngo_id: this.state.detail.local_ngo_id});
  }

  isFullyDownloaded = () => {
    return isDownloaded(this.props.route.params.scorecard_uuid) || this.state.isFinishDownloaded;
  }

  updateDownloadProgress = () => {
    const { scorecard_uuid } = this.props.route.params;
    const timeout = setTimeout(() => {
      this.setState({downloadProgress: getDownloadPercentage(scorecard_uuid)}, () => {
        if (isDownloaded(scorecard_uuid)) {
          this.setState({
            isFinishDownloaded: true,
            isDownloading: false,
            showDownloadProgress: false,
          });

          clearTimeout(timeout);
        }
      });
    }, 500);
  }

  renderDownloadButton = () => {
    if (!this.isFullyDownloaded()) {
      const isDisabled = this.state.errorType ? false : this.state.isDownloading;
      const { translations } = this.context;
      const label = findScorecardDownload(this.props.route.params.scorecard_uuid) != undefined ? translations.resumeDownload : translations.downloadAndSave;

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
    const title = `${translations.scorecardApp} - ${this.props.route.params.scorecard_uuid}`;

    return (
      <BigHeader
        title={translations.welcomeTo}
        bigTitle={title}
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
