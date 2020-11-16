import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Content
} from "native-base";

import realm from '../../db/schema';
import BigHeader from '../../components/BigHeader';

import ActionButton from '../../components/ActionButton';
import {LocalizationContext} from '../../components/Translations';

import {connect} from 'react-redux';
import {loadIndicatorListAction} from '../../actions/indicatorAction';
import {loadCafListAction} from '../../actions/cafAction';
import {isIndicatorDownloaded, isCafDownloaded, CheckAllAudioDownloaded} from '../../services/ScorecardDetail/local_storage_data_checker_service';
import {saveIndicator, saveLanguageIndicator, saveCaf, saveAudio} from '../../services/ScorecardDetail/save_data_service';

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
    };
  }

  async componentDidMount() {
    const scorecard = await JSON.stringify(realm.objects('Scorecard').filtered(`uuid == '${this.props.route.params.uuid}'`)[0]);
    this.setState({detail: JSON.parse(scorecard)});
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
      this.setState({isCafDownloaded: await isCafDownloaded(cafs)});
    }, (response) => {});
  }

  renderScorecardDetail = () => {
    const {translations} = this.context;
    const {detail} = this.state;

    return (
      <View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>{translations['year']}:</Text>
          <Text style={styles.textValue}>{detail['year']}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>{translations['unitType']}:</Text>
          <Text style={styles.textValue}>{detail['unit_type_name']}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>{translations['scorecardType']}:</Text>
          <Text style={styles.textValue}>{detail['scorecard_type_name']}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>{translations['province']}:</Text>
          <Text style={styles.textValue}>{detail['province']}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>{translations['district']}:</Text>
          <Text style={styles.textValue}>{detail['district']}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>{translations['commune']}:</Text>
          <Text style={styles.textValue}>{detail['commune']}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>{translations['implementor']}:</Text>
          <Text style={styles.textValue}>{detail['local_ngo_name']}</Text>
        </View>
      </View>
    );
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
      saveIndicator(indicators, async (isIndicatorDownloaded) => {this.setState({isIndicatorDownloaded})});
      saveLanguageIndicator(indicators);
      saveAudio(indicators, async (isAllAudioDownloaded) => {
        this.setState({isAllAudioDownloaded});
      });
    }, (response) => {
      this.setState({isStopDownloadIndicator: true});
    });
  }

  fetchIndicatorFromApi = (successCallback, failedCallback) => {
    const {detail} = this.state;
    const facilityId = detail['facility_id'];
    this.props.loadIndicatorListAction(facilityId, (isSuccess, response) => {
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
      saveCaf(cafs, async (isCafDownloaded) => {this.setState({isCafDownloaded})});
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
    const {detail} = this.state;
    const localNgoId = detail['local_ngo_id'];
    this.props.loadCafListAction(localNgoId, (isSuccess, response) => {
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
    this.props.navigation.navigate('ScorecardPreference');
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
    if (!this.isFullyDownloaded() && this.state.detail != '') {
      return (
        <ActionButton
          onPress={() => this.downloadScorecard()}
          label={translations["downloadAndSave"]}
          customButtonStyle={{marginTop: 20}}
          isDisabled={this.isDisableDownload()}
        />
      );
    }
  };

  renderStartButton = () => {
    const {translations} = this.context;
    if (this.isFullyDownloaded() && this.state.detail != '') {
      return (
        <ActionButton
          onPress={() => this.startScorecard()}
          label={translations["start"]}
          customButtonStyle={{marginTop: 20}}
          isDisabled={false}
        />
      );
    }
  };

  _renderHeader() {
    return (
      <BigHeader
        title={'Welcome To'}
        bigTitle={'Scorecard App'}
        onBackPress={() => this.props.navigation.goBack()}/>
    )
  }

  render() {
    return (
      <Container>
        { this._renderHeader() }

        <Content style={styles.container}>
          {this.renderScorecardDetail()}

          <Text style={{textAlign: 'center', fontSize: 18, marginTop: 20}}>
            {this.state.loadingMessage}
          </Text>

          {this.renderDownloadButton()}
          {this.renderStartButton()}

        </Content>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textLabel: {
    fontSize: 20,
    marginRight: 10,
    color: '#424242',
  },
  textValue: {
    fontSize: 20,
    fontWeight: '700',
  },
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
