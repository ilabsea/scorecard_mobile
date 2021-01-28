import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Container} from "native-base";
import BigHeader from '../../components/BigHeader';

import {LocalizationContext} from '../../components/Translations';
import DisplayScorecardInfo from '../../components/ScorecardDetail/DisplayScorecardInfo';
import DownloadButton from '../../components/ScorecardDetail/DownloadButton';
import BottomButton from '../../components/BottomButton';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';

import authenticationService from '../../services/authentication_service';

import {
  find as findScorecardDownload,
  update as updateScorecardDownload,
  isDownloaded as isScorecardDownloaded,
  getDownloadPercentage,
} from '../../services/scorecard_download_service';

import { save as saveRatingScale }  from '../../services/rating_scale_service';
import {getErrorType} from '../../services/api_service';

import {
  saveIndicatorSection,
  IndicatorService,
} from '../../services/indicator_service';
import { save as saveProgramLanguage } from '../../services/program_language_service';
import { save as saveCaf } from '../../services/caf_service';

import { LanguageIndicatorService } from '../../services/language_indicator_service';
import { LanguageRatingScaleService } from '../../services/language_rating_scale_service';
import scorecardService from '../../services/scorecardService';

class ScorecardDetail extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.languageIndicatorService = new LanguageIndicatorService();
    this.languageRatingScaleService = new LanguageRatingScaleService();
    this.indicatorService = new IndicatorService();

    this.cafApi = null;
    this.state = {
      scorecard: scorecardService.find(props.route.params.scorecard_uuid),
      downloadProgress: 0,
      showDownloadProgress: false,
      isStopDownload: false,
      visibleModal: false,
      errorType: null,
      isFinishDownloaded: false,
      isDownloading: false,
      isErrorDownload: false,
    };
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
      isErrorDownload: false,
    });

    if (this.state.errorType)
      return;

    this.downloadProgramLanguage();
  };

  downloadProgramLanguage = () => {
    saveProgramLanguage(this.props.route.params.scorecard_uuid, this.state.scorecard.program_id,
      (isDownloaded, phase) => {
        this.successCallback(isDownloaded, phase, this.downloadCaf());
      },
      this.errorCallback
    );
  }

  downloadCaf = () => {
    saveCaf(this.props.route.params.scorecard_uuid, this.state.scorecard.local_ngo_id,
      (isDownloaded, phase) => {
        this.successCallback(isDownloaded, phase, this.downloadRatingScale());
      },
      this.errorCallback
    );
  }

  downloadRatingScale = () => {
    saveRatingScale(this.props.route.params.scorecard_uuid, this.state.scorecard.program_id,
      (isDownloaded, phase) => {
        this.successCallback(isDownloaded, phase, this.downloadIndicator());
      },
      this.errorCallback
    );
  }

  downloadIndicator = () => {
    saveIndicatorSection(this.props.route.params.scorecard_uuid, this.state.scorecard.facility_id,
      (isDownloaded, phase) => {
        this.successCallback(isDownloaded, phase, this.downloadLangIndicatorAudio());
      },
      this.errorCallback
    );
  }

  downloadLangIndicatorAudio = () => {
    this.languageIndicatorService.saveAudio(this.props.route.params.scorecard_uuid,
      (isDownloaded, phase) => {
        this.successCallback(isDownloaded, phase, this.downloadLangRatingScaleAudio());
      },
      this.errorCallback
    );
  }

  downloadLangRatingScaleAudio = () => {
    this.languageRatingScaleService.saveAudio(this.state.scorecard.program_id,
      (isDownloaded, phase) => {
        this.successCallback(isDownloaded, phase, this.downloadIndicatorImage());
      },
      this.errorCallback
    );
  }

  downloadIndicatorImage = () => {
    this.indicatorService.saveImage(this.props.route.params.scorecard_uuid,
      (isDownloaded, phase) => {
        this.successCallback(isDownloaded, phase, null);
      },
      this.errorCallback
    );
  }

  successCallback = (isDownloaded, phase, downloadNextPhase) => {
    if (isDownloaded) {
      updateScorecardDownload(this.props.route.params.scorecard_uuid, phase, this.updateDownloadProgress);

      if (downloadNextPhase)
        downloadNextPhase();
    }
  }

  errorCallback = () => {
    this.setState({
      isErrorDownload: true,
      showDownloadProgress: false,
    });
  }

  startScorecard = () => {
    this.props.navigation.navigate('ScorecardPreference', {scorecard_uuid: this.props.route.params.scorecard_uuid, local_ngo_id: this.state.scorecard.local_ngo_id});
  }

  isFullyDownloaded = () => {
    return isScorecardDownloaded(this.props.route.params.scorecard_uuid) || this.state.isFinishDownloaded;
  }

  updateDownloadProgress = () => {
    const { scorecard_uuid } = this.props.route.params;
    const timeout = setTimeout(() => {
      this.setState({downloadProgress: getDownloadPercentage(scorecard_uuid)}, () => {
        if (isScorecardDownloaded(scorecard_uuid)) {
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
    if (this.isFullyDownloaded()) {
      return;
    }

    const isDisabled = this.state.errorType ? false : this.state.isDownloading;
    const { translations } = this.context;
    const label = findScorecardDownload(this.props.route.params.scorecard_uuid) != undefined ? translations.resumeDownload : translations.downloadAndSave;

    return (
      <View>
        { this.state.isErrorDownload &&
          <Text style={{textAlign: 'center', marginBottom: 5, color: 'red'}}>{translations.failedToDownloadScorecard}</Text>
        }

        <DownloadButton
          showDownloadProgress={this.state.showDownloadProgress}
          downloadProgress={this.state.downloadProgress}
          disabled={isDisabled}
          onPress={() => this.downloadScorecard()}
          label={label}
        />
      </View>
    );
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
    this.setState({
      isStopDownload: true,
    });

    this.languageIndicatorService.stopDownload()
    this.languageRatingScaleService.stopDownload();
    this.indicatorService.stopDownload();

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
          <DisplayScorecardInfo scorecardDetail={this.state.scorecard}/>
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
