import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import {LocalizationContext} from '../../components/Translations';
import SelectPicker from '../../components/SelectPicker';
import BottomButton from '../../components/BottomButton';
import DownloadButton from '../../components/ScorecardDetail/DownloadButton';
import HeaderTitle from '../../components/HeaderTitle';
import ProgressHeader from '../../components/ProgressHeader';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';

import Color from '../../themes/color';

import { getAll as getAllProgramLanguage } from '../../services/program_language_service';
import {
  save as saveProgramLanguage,
  isExist as isProgramLanguageExist,
} from '../../services/program_language_service';

import scorecardService from '../../services/scorecardService';
import authenticationService from '../../services/authentication_service';
import { getErrorType } from '../../services/api_service';

import { isKhmerLanguage } from '../../utils/program_language_util';

import {
  find as findScorecardDownload,
  isDownloaded as isScorecardDownloaded,
  download,
  stopDownload,
  getDownloadPercentage,
  isAudioLanguageDownloaded,
  downloadLangIndicatorAudio,
} from '../../services/scorecard_download_service';

class ScorecardPreference extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      scorecard: scorecardService.find(this.props.route.params.scorecard_uuid),
      languages: [],
      textLocale: '',
      audioLocale: '',
      date: Moment().format('DD/MM/YYYY'),
      downloadProgress: 0,
      showDownloadProgress: false,
      isStopDownload: false,
      visibleModal: false,
      errorType: null,
      isFinishDownloaded: false,
      isDownloading: false,
      isErrorDownload: false,
      isAudioDownloaded: false,
      isDownloadAudio: false,
    };
    this.textLanguageController;
    this.audioLanguageController;
  }

  componentDidMount() {
    this.loadProgramLanguage();
  }

  loadProgramLanguage = async () => {
    if (!isProgramLanguageExist(this.state.scorecard.program_id)) {
      saveProgramLanguage(this.state.scorecard.program_id,
        (languages) => {
          this.initProgramLanguage(languages);
        },
        this.errorCallback
      );
    }
    else {
      const locales = getAllProgramLanguage(this.state.scorecard.program_id);
      this.initProgramLanguage(locales);
    }
  }

  initProgramLanguage = (locales) => {
    const languagesPickerFormat = locales.map((locale) => ({value: locale.code, label: locale.name}));
    const audioLocale = this.getDefaultLocaleValue(languagesPickerFormat, 'audio');

    this.setState({
      languages: languagesPickerFormat,
      textLocale: this.getDefaultLocaleValue(languagesPickerFormat, 'text'),
      audioLocale: audioLocale,
      isAudioDownloaded: isAudioLanguageDownloaded(this.props.route.params.scorecard_uuid, audioLocale),
    });
  }

  getDefaultLocaleValue = (languages, type) => {
    let defaultValue = languages[0].value;
    languages.map((language) => {
      if (isKhmerLanguage(language))
        defaultValue = language.value;
    });

    if (this.state.scorecard.text_language_code != undefined)
      defaultValue = type === 'text' ? this.state.scorecard.text_language_code : this.state.scorecard.audio_language_code;

    return defaultValue;
  }

  changeTextLocale = (item) => {
    this.setState({textLocale: item.value})
  }

  changeAudioLocale = (item) => {
    const isAudioDownloaded = isAudioLanguageDownloaded(this.props.route.params.scorecard_uuid, item.value);

    this.setState({
      audioLocale: item.value,
      isAudioDownloaded: isAudioDownloaded,
      isFinishDownloaded: isAudioDownloaded ? true : false,
    });
  }

  saveSelectedData = () => {
    this.closeAllSelectBox();
    const {date, textLocale, audioLocale} = this.state;
    const attrs = {
      conducted_date: date.toString(),
      text_language_code: textLocale,
      audio_language_code: audioLocale,
    };

    scorecardService.update(this.props.route.params.scorecard_uuid, attrs);
    this.props.navigation.navigate('Facilitator', {scorecard_uuid: this.props.route.params.scorecard_uuid, local_ngo_id: this.props.route.params.local_ngo_id});
  }

  renderForm = () => {
    const {translations} = this.context;
    const {languages, textLocale, audioLocale} = this.state;

    return (
      <View style={{marginTop: 10}}>
        <View style={styles.dropDownContainer}>
          <Text style={[styles.inputLabel, {top: -15, zIndex: 10}]}>
            {translations['date']}
          </Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder={translations["selectDate"]}
            format="DD/MM/YYYY"
            minDate={Moment().format('DD/MM/YYYY')}
            style={{width: '100%'}}
            customStyles={{
              dateInput: {
                height: 60,
                paddingLeft: 60,
                borderColor: Color.inputBorderLineColor,
                borderWidth: 2,
                borderRadius: 4,
                alignItems: 'flex-start',
              },
            }}
            iconComponent={
              <MaterialIcon
                size={25}
                color={Color.inputBorderLineColor}
                name="calendar-today"
                style={{position: 'absolute', left: 16}}
              />
            }
            onDateChange={(date) => {
              this.setState({date: date});
            }}
            onOpenModal={() => this.closeAllSelectBox()}
          />
        </View>

        <SelectPicker
          items={languages}
          selectedItem={textLocale}
          label={translations["textDisplayIn"]}
          placeholder={translations["selectLanguage"]}
          searchablePlaceholder={translations["searchForLanguage"]}
          zIndex={6000}
          onChangeItem={this.changeTextLocale}
          customDropDownContainerStyle={{marginTop: 30}}
          mustHasDefaultValue={true}
          controller={(instance) => this.textLanguageController = instance}
          onOpen={() => this.audioLanguageController.close()}
        />

        <SelectPicker
          items={languages}
          selectedItem={audioLocale}
          label={translations["audioPlayIn"]}
          placeholder={translations["selectLanguage"]}
          searchablePlaceholder={translations["searchForLanguage"]}
          zIndex={5000}
          onChangeItem={this.changeAudioLocale}
          mustHasDefaultValue={true}
          controller={(instance) => this.audioLanguageController = instance}
          onOpen={() => this.textLanguageController.close()}
        />
      </View>
    );
  };

  closeAllSelectBox = () => {
    this.textLanguageController.close();
    this.audioLanguageController.close();
  }

  isFullyDownloaded = () => {
    return isScorecardDownloaded(this.props.route.params.scorecard_uuid) && this.state.isAudioDownloaded || this.state.isFinishDownloaded;
  }

  downloadScorecard = async () => {
    const isErrorAuthentication = await authenticationService.isErrorAuthentication();
    if (isErrorAuthentication) {
      this.errorCallback('422');
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

    if (!isScorecardDownloaded(this.props.route.params.scorecard_uuid))
      download(this.state.scorecard, this.state.audioLocale, this.updateDownloadProgress, this.errorCallback);

    else if (!this.state.isAudioDownloaded) {
      this.setState({ isDownloadAudio: true });
      downloadLangIndicatorAudio(this.state.scorecard, this.state.audioLocale, this.updateDownloadProgress, this.errorCallback);
    }
  };

  updateDownloadProgress = (percentage) => {
    let updatedPercentage = this.state.downloadProgress;

    if (this.state.isDownloadAudio) {
      updatedPercentage += percentage;
      this.setState({downloadProgress: updatedPercentage});
    }
    else {
      const { scorecard_uuid } = this.props.route.params;
      this.setState({downloadProgress: getDownloadPercentage(scorecard_uuid)}, () => {
        updatedPercentage = isScorecardDownloaded(scorecard_uuid) ? 1 : this.state.downloadProgress;
      });
    }

    if (updatedPercentage >= 1) {
      this.setState({
        isFinishDownloaded: true,
        isDownloading: false,
        showDownloadProgress: false,
        isAudioDownloaded: true,
      });
    }
  }

  errorCallback = (error = null) => {
    this.setState({
      errorType: getErrorType(error),
      showDownloadProgress: false,
      visibleModal: true,
      isErrorDownload: true,
      showDownloadProgress: false,
    });
  }

  renderDownloadButton = () => {
    if (this.isFullyDownloaded())
      return;

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

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.closeAllSelectBox()}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ProgressHeader
            title={translations['getStarted']}
            onBackPress={() => this.onBackPress()}
            onPressHome={() => this.props.navigation.popToTop()}
            progressIndex={0}/>

          <ScrollView contentContainerStyle={styles.container}>
            <HeaderTitle
              headline="scorecardPreference"
              subheading="pleaseFillInformationBelow"
            />
            {this.renderForm()}
          </ScrollView>

          <View style={{padding: 20}}>
            { this.renderDownloadButton() }

            { this.renderNextButton() }
          </View>

          <ErrorMessageModal
            visible={this.state.visibleModal}
            onDismiss={() => this.setState({visibleModal: false})}
            errorType={this.state.errorType}
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
  inputLabel: {
    backgroundColor: 'white',
    color: Color.inputBorderLineColor,
    fontWeight: '700',
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
  },
  dropDownContainer: {
    marginTop: 20,
    position: 'relative',
  },
  dropDownContainerStyle: {
    height: 50,
    marginTop: 10,
  },
  dropDownPickerStyle: {
    backgroundColor: 'white',
    zIndex: 5000,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderColor: Color.inputBorderLineColor,
  },
});

export default ScorecardPreference;