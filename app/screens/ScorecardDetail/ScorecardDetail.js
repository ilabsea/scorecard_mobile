import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Container, Button, Icon} from "native-base";

import realm from '../../db/schema';
import BigHeader from '../../components/BigHeader';

import {LocalizationContext} from '../../components/Translations';
import DisplayScorecardInfo from '../../components/ScorecardDetail/DisplayScorecardInfo';
import BottomButton from '../../components/BottomButton';

import {connect} from 'react-redux';
import {loadIndicatorListAction} from '../../actions/indicatorAction';
import {loadCafListAction} from '../../actions/cafAction';
import {isIndicatorDownloaded, isCafDownloaded, CheckAllAudioDownloaded} from '../../services/scorecard_detail_service';
import {saveLanguageIndicator} from '../../services/language_indicator_service';
import {saveIndicator} from '../../services/indicator_service';
import {saveCaf} from '../../services/caf_service';
import {saveAudio} from '../../services/audio_service';
import CustomStyle from '../../themes/customStyle';

class ScorecardDetail extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      detail: '',
      isIndicatorDownloaded: false,
      isCafDownloaded: false,
      isAllAudioDownloaded: false,
      loadingMessage: '',
      isStopDownloadIndicator: true,
      isStopDownloadCaf: true,
      isStopDownloadAudio: true,
      isFinishChecking: false,
    };
  }

  componentDidMount() {
    const scorecard = realm.objects('Scorecard').filtered(`uuid == '${this.props.route.params.scorecard_uuid}'`)[0];
    this.scorecard = scorecard;
    this.setState({detail: scorecard});
    this.checkSavedIndicator();
    this.checkSavedCaf();
  }

  checkSavedIndicator = () => {
    this.fetchIndicatorFromApi(async (response) => {
      const indicators = await response;
      this.setState({isIndicatorDownloaded: await isIndicatorDownloaded(indicators)});
      CheckAllAudioDownloaded(indicators, async (isAllDownloaded) => {
        this.setState({isAllAudioDownloaded: isAllDownloaded});
      });
    }, (response) => {});
  }

  checkSavedCaf = () => {
    this.fetchCafFromApi(async (response) => {
      const cafs = await response;
      this.setState({
        isCafDownloaded: await isCafDownloaded(cafs),
        isFinishChecking: true,
      });
    }, (response) => {this.setState({isFinishChecking: true})});
  }

  renderScorecardDetail = () => {
    const {detail} = this.state;
    return (<DisplayScorecardInfo scorecardDetail={detail}/>);
  };

  downloadIndicator = () => {
    this.setState({
      loadingMessage: 'Downloading indicator.....',
      isStopDownloadIndicator: false,
    });

    this.fetchIndicatorFromApi(async (response) => {
      this.setState({
        isStopDownloadIndicator: true,
        isStopDownloadAudio: false,
        loadingMessage: '',
      });
      const indicators = await response;
      saveIndicator(this.props.route.params.scorecard_uuid, indicators, async (isIndicatorDownloaded) => {this.setState({isIndicatorDownloaded})});
      saveLanguageIndicator(this.props.route.params.scorecard_uuid, indicators);
      saveAudio(indicators, async (isAllAudioDownloaded) => {
        this.setState({isAllAudioDownloaded});
      });
    }, (response) => {
      this.setState({isStopDownloadIndicator: true});
    });
  }

  fetchIndicatorFromApi = (successCallback, failedCallback) => {
    this.props.loadIndicatorListAction(this.scorecard.facility_id, (isSuccess, response) => {
      if (isSuccess)
        successCallback(response);
      else
        failedCallback(response);
    });
  }

  downloadCaf = () => {
    this.setState({
      loadingMessage: 'Downloading caf.....',
      isStopDownloadCaf: false,
    });

    this.fetchCafFromApi(async (response) => {
      const cafs = await response;
      saveCaf(this.props.route.params.scorecard_uuid, cafs, async (isCafDownloaded) => {this.setState({isCafDownloaded})});
      this.setState({
        loadingMessage: '',
        isStopDownloadAudio: true,
        isStopDownloadCaf: true
      });
    }, (response) => {
      this.setState({
        isStopDownloadAudio: true,
        isStopDownloadCaf: true,
      });
    });
  }

  fetchCafFromApi = (successCallback, failedCallback) => {
    this.props.loadCafListAction(this.scorecard.local_ngo_id, (isSuccess, response) => {
      if (isSuccess)
        successCallback(response);
      else
        failedCallback(response);
    });
  }

  downloadScorecard = () => {
    const {isIndicatorDownloaded, isCafDownloaded, isAllAudioDownloaded} = this.state;
    if (!isIndicatorDownloaded || !isAllAudioDownloaded)
      this.downloadIndicator();
    if (!isCafDownloaded)
      this.downloadCaf();
  };

  startScorecard = () => {
    this.props.navigation.navigate('ScorecardPreference', {scorecard_uuid: this.props.route.params.scorecard_uuid});
  }

  isFullyDownloaded = () => {
    const {isIndicatorDownloaded, isCafDownloaded, isAllAudioDownloaded} = this.state;
    if (isIndicatorDownloaded && isCafDownloaded && isAllAudioDownloaded)
      return true;

    return false;
  }

  isDisableDownload = () => {
    const {isStopDownloadIndicator, isStopDownloadCaf, isStopDownloadAudio} = this.state;

    if (isStopDownloadIndicator && isStopDownloadCaf && isStopDownloadAudio)
      return false;

    return true;
  }

  renderDownloadButton = () => {
    const {translations} = this.context;
    if (!this.isFullyDownloaded() && this.state.isFinishChecking) {
      return (
        <Button full bordered iconRight primary
          onPress={() => this.downloadScorecard()}
          disabled={this.isDisableDownload()}
          style={CustomStyle.bottomButton}
        >
          <Text style={[styles.buttonLabelStyle, {color: '#E2762D'}]}>
            {translations["downloadAndSave"]}
          </Text>
          <Icon name="download" style={{right: 0, position: 'absolute'}} />
        </Button>
      );
    }
  };

  renderStartButton = () => {
    const {translations} = this.context;
    if (this.isFullyDownloaded() && this.state.isFinishChecking)
      return (<BottomButton label={translations.start} onPress={() => this.startScorecard()} />);
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
          <Text style={{fontSize: 18, marginBottom: -10}}>{translations.pleaseCheckScorecardDetailBelow}</Text>
          {this.renderScorecardDetail()}

          <Text style={{textAlign: 'center', fontSize: 18, marginTop: 20}}>
            {this.state.loadingMessage}
          </Text>

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
  }
});

function mapStateToProps(state) {
  return {
    isLoading: state.loadIndicatorListReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadIndicatorListAction: (facilityId, callback) => dispatch(loadIndicatorListAction(facilityId, callback)),
    loadCafListAction: (localNgoId, callback) => dispatch(loadCafListAction(localNgoId, callback)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardDetail);
