import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import realm from '../../db/schema';

import ActionButton from '../../components/ActionButton';
import {LocalizationContext} from '../../components/Translations';

import {connect} from 'react-redux';
import {loadIndicatorListAction} from '../../actions/indicatorAction';
import {loadCafListAction} from '../../actions/cafAction';

import {downloadFileFromUrl, readAllFiles, readFile} from '../../services/local_storage_service';

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
    const scorecard = await AsyncStorage.getItem('SCORECARD_DETAIL');
    this.setState({detail: JSON.parse(scorecard)});
    this.checkIndicatorData();
    this.checkCafData()
    this.checkDownloadAudioFile();
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

  checkIndicatorData = () => {
    const {detail} = this.state;
    const uuid = detail.uuid;
    const indicatorData = realm.objects('Indicator').filtered('uuid = "' + uuid +'"');
    let indicator = JSON.stringify(indicatorData);
    indicator = JSON.parse(indicator);

    if (indicator.length === 0)
      this.setState({isIndicatorDownloaded: false});
    else
      this.setState({isIndicatorDownloaded: true});
  }

  checkCafData = () => {
    const {detail} = this.state;
    const uuid = detail.uuid;
    const cafData = realm.objects('Caf').filtered('uuid = "' + uuid + '"');
    let caf = JSON.stringify(cafData);
    caf = JSON.parse(caf);

    if (caf.length === 0)
      this.setState({isCafDownloaded: false});
    else
      this.setState({isCafDownloaded: true});
  }

  checkDownloadAudioFile = () => {
    const {detail} = this.state;
    const uuid = detail.uuid;
    const langIndicatorData = realm.objects('LanguageIndicator').filtered('uuid = "' + uuid + '"');
    let langIndicators = JSON.stringify(langIndicatorData);
    langIndicators = JSON.parse(langIndicators);
    let audioFilesName = [];

    for (let i=0; i<langIndicators.length; i++) {
      const langIndicator = langIndicators[i];
      if (langIndicator.audio === undefined || langIndicator.audio === null || langIndicator.audio === '')
        continue;

      let audioUrl = langIndicator.audio.split('/');
      const fileName = audioUrl[audioUrl.length - 1];
      audioFilesName.push(fileName);
    }

    readAllFiles(async (isSuccess, response) => {
      if (isSuccess) {
        const result = await response;
        this.compareDownloadedFile(result, audioFilesName);
      }
    });
  }

  compareDownloadedFile = (downloadedFiles, filesName) => {
    const fileCount = filesName.length;
    let downloadedFileCount = 0;

    for (let i=0; i<filesName.length; i++) {
      for (let j=0; j<downloadedFiles.length; j++) {
        if (filesName[i] === downloadedFiles[j].name) {
          downloadedFileCount++;
          break;
        }
      }
    }

    if (fileCount === downloadedFileCount)
      this.setState({isAllAudioDownloaded: true});
    else
      this.setState({isAllAudioDownloaded: false});
  }

  clearDataFromLocalStorage = (schema) => {
    const {detail} = this.state;
    const uuid = detail.uuid.toString();
    realm.write(() => {
      const data = realm.objects(schema).filtered('uuid = "' + uuid +'"');
      realm.delete(data);
    });
  }

  downloadIndicator = () => {
    const {detail} = this.state;
    const categoryId = detail['category_id'];
    this.setState({
      loadingMessage: 'Downloading indicator.....',
      isStopDownloadIndicator: false,
    });

    this.props.loadIndicatorListAction(categoryId, async (isSuccess, response) => {
      if (isSuccess) {
        this.setState({isStopDownloadIndicator: true});
        const result = await response;
        this.saveIndicators(result);
        this.saveLanguageIndicator(result);
        this.downloadAudio(result);
      }
      else {
        this.setState({isStopDownloadIndicator: true});
        console.log('Load indicator failed = ', response);
      }
    });
  }

  saveIndicators = (indicators) => {
    const {detail} = this.state;
    const uuid = detail.uuid;
    this.clearDataFromLocalStorage('Indicator');
    indicators.map(indicator => {
      const indicatorObj = {
        id: indicator.id,
        name: indicator.name,
        category_id: indicator.categorizable.id,
        uuid: uuid,
      };
      this.saveDataToLocalStorage('Indicator', indicatorObj);
    });
  }

  saveLanguageIndicator = (indicators) => {
    this.clearDataFromLocalStorage('LanguageIndicator');
    indicators.map(indicator => {
      const languagesIndicators = indicator['languages_indicators'];
      if (languagesIndicators.length > 0) {
        languagesIndicators.map((languagesIndicator) => {
          this.storeLanguageIndicator(languagesIndicator);
        });
      }
    });
  }

  storeLanguageIndicator = (languagesIndicator) => {
    const {detail} = this.state;
    const uuid = detail.uuid;
    const languagesIndicatorObj = {
      id: languagesIndicator.id,
      content: languagesIndicator.content,
      audio: languagesIndicator.audio != null ? languagesIndicator.audio : '',
      language_code: languagesIndicator['language_code'],
      uuid: uuid,
    };
    this.saveDataToLocalStorage('LanguageIndicator', languagesIndicatorObj);
  }

  downloadAudio = (indicators) => {
    this.setState({loadingMessage: 'Downloading audio.....'});
    indicators.map((indicator) => {
      const languagesIndicators = indicator['languages_indicators'];

      if (languagesIndicators.length > 0) {
        languagesIndicators.map((languagesIndicator) => {
          if (languagesIndicator.audio != undefined || languagesIndicator.audio != null) {
            const audioUrl = languagesIndicator.audio;
            this.checkAndDownload(audioUrl);
          }
        });
      }
    });
  }

  checkAndDownload = (audioUrl) => {
    let audioPath = audioUrl.split('/');
    const fileName = audioPath[audioPath.length - 1];
    this.setState({isStopDownloadAudio: false});

    readFile(fileName, async (isSuccess, response) => {
      if (response === 'file not found') {
        // File not found then start to download file
        https: downloadFileFromUrl(audioUrl, async (isSuccess, response) => {
          if (isSuccess) {
            this.setState({
              loadingMessage: '',
              isStopDownloadAudio: true,
            });
            this.checkDownloadAudioFile();
          } else {
            console.log('download failed = ', response);
            this.setState({isStopDownloadAudio: true});
          }
        });
      }
      else {
        // File is already exist
        this.setState({
          isStopDownloadAudio: true,
          loadingMessage: '',
        });
      }
    });
  }

  downloadCaf = () => {
    const {detail} = this.state;
    const localNgoId = detail['local_ngo_id'];
    this.setState({
      loadingMessage: 'Downloading caf.....',
      isStopDownloadCaf: false,
    });

    this.props.loadCafListAction(localNgoId, async (isSuccess, response) => {
      if (isSuccess) {
        const result = await response;
        this.setState({isStopDownloadAudio: true});
        this.clearDataFromLocalStorage('Caf');
        result.map(item => {
          this.saveCaf(item);
        })
      }
      else {
        console.log('load caf failed = ', response);
        this.setState({isStopDownloadAudio: true});
      }
    });
  }

  saveCaf = (data) => {
    const {detail} = this.state;
    const uuid = detail.uuid;
    const cafObj = {
      id: data.id,
      name: data.name,
      local_ngo_id: data['local_ngo_id'],
      uuid: uuid,
    };
    this.saveDataToLocalStorage('Caf', cafObj);
  }

  saveDataToLocalStorage = (schema, data) => {
    const _this = this;
    realm.write(() => {
      realm.create(schema, data);
      _this.setState({loadingMessage: 'Finish downloading'})
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
    console.log('is fully downloaded = ', this.isFullyDownloaded());
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
    if (!this.isFullyDownloaded() && this.state.detail != '') {
      return (
        <ActionButton
          onPress={() => this.downloadScorecard()}
          title="downloadAndSave"
          containerStyle={{width: '100%', marginTop: 20}}
          isDisabled={this.isDisableDownload()}
        />
      );
    }
  };

  renderStartButton = () => {
    if (this.isFullyDownloaded() && this.state.detail != '') {
      return (
        <ActionButton
          onPress={() => this.startScorecard()}
          title="start"
          containerStyle={{width: '100%', marginTop: 20}}
          isDisabled={false}
        />
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderScorecardDetail()}
        <Text style={{textAlign: 'center', fontSize: 18, marginTop: 20}}>
          {this.state.loadingMessage}
        </Text>
        {this.renderDownloadButton()}
        {this.renderStartButton()}
      </View>
    );
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
    loadIndicatorListAction: (categoryId, callback) => dispatch(loadIndicatorListAction(categoryId, callback)),
    loadCafListAction: (localNgoId, callback) => dispatch(loadCafListAction(localNgoId, callback)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardDetail);