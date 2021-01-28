import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import {LocalizationContext} from '../../components/Translations';
import SelectPicker from '../../components/SelectPicker';
import MessageLabel from '../../components/MessageLabel';
import BottomButton from '../../components/BottomButton';
import HeaderTitle from '../../components/HeaderTitle';
import ProgressHeader from '../../components/ProgressHeader';
import DownloadButton from '../../components/ScorecardDetail/DownloadButton';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';

import Color from '../../themes/color';
import { getAll as getAllProgramLanguage } from '../../services/program_language_service';
import scorecardService from '../../services/scorecardService';
import authenticationService from '../../services/authentication_service';
import { LanguageIndicatorService } from '../../services/language_indicator_service';
import { LanguageRatingScaleService } from '../../services/language_rating_scale_service';

import { isKhmerLanguage } from '../../utils/program_language_util';

import {
  find as findScorecardDownload,
  isAudioLanguageDownloaded,
  updateDownloadAudioSection,
  getDownloadPercentage,
} from '../../services/scorecard_download_service';

import { AUDIO } from '../../constants/scorecard_constant';

class ScorecardPreference extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.languageIndicatorService = new LanguageIndicatorService();
    this.languageRatingScaleService = new LanguageRatingScaleService();

    this.state = {
      scorecard: scorecardService.find(props.route.params.scorecard_uuid),
      languages: [],
      textLocale: '',
      audioLocale: '',
      date: Moment().format('DD/MM/YYYY'),
      message: '',
      messageType: '',

      downloadProgress: 0,
      showDownloadProgress: false,
      visibleModal: false,
      errorType: null,
      isFinishDownloaded: false,
      isDownloading: false,
      isErrorDownload: false,
    };
    this.textLanguageController;
    this.audioLanguageController;
  }

  componentDidMount() {
    this.loadProgramLanguage();
  }

  loadProgramLanguage = async () => {
    const locales = getAllProgramLanguage(this.state.scorecard.program_id);
    const languagesPickerFormat = locales.map((locale) => ({value: locale.code, label: locale.name}));
    this.setState({
      languages: languagesPickerFormat,
      textLocale: this.getDefaultLocaleValue(languagesPickerFormat, 'text'),
      audioLocale: this.getDefaultLocaleValue(languagesPickerFormat, 'audio'),
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
    this.setState({audioLocale: item.value});

    console.log('Is audio language downloaded == ', isAudioLanguageDownloaded(this.props.route.params.scorecard_uuid, item.value));
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
    const {languages, textLocale, audioLocale, messageType, message} = this.state;

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

        <MessageLabel
          message={message}
          type={messageType}
          customStyle={{marginTop: 120}}
        />
      </View>
    );
  };

  closeAllSelectBox = () => {
    this.textLanguageController.close();
    this.audioLanguageController.close();
  }

  downloadScorecardAudio = () => {
    authenticationService.checkErrorAuthentication(() => {
      this.setState({
        errorType: getErrorType('422'),
        showDownloadProgress: false,
        visibleModal: true,
      });

      return;
    });

    this.setState({
      showDownloadProgress: true,
      errorType: null,
      downloadProgress: 0,
      isDownloading: true,
      isErrorDownload: false,
    });

    this.languageIndicatorService.saveAudio(
      this.props.route.params.scorecard_uuid,
      this.state.audioLocale,
      (isDownloaded, phase) => {
        console.log('is Audio downloaded == ', isDownloaded);
        this.successCallback(isDownloaded, phase, this.downloadLangRatingScaleAudio());
      },
      () => {
        console.log('++ error download audio ++');
        this.errorCallback();
      }
    );
  }

  downloadLangRatingScaleAudio = () => {
    this.languageRatingScaleService.saveAudio(this.state.scorecard.program_id,
      (isDownloaded, phase) => {
        console.log('is lang rating scale audio downloaded = ', isDownloaded);
        this.successCallback(isDownloaded, phase, null);
      },
      this.errorCallback
    );
  }

  successCallback = (isDownloaded, phase, downloadNextPhase) => {
    if (isDownloaded) {
      const options = {
        scorecard_uuid: this.props.route.params.scorecard_uuid,
        program_id: this.state.scorecard.program_id,
        phase: phase,
      };

      updateDownloadAudioSection(options, this.updateDownloadProgress);

      if (downloadNextPhase)
        downloadNextPhase();
    }
  }

  errorCallback = () => {
    console.log('== download error ==');
    // this.setState({
    //   isErrorDownload: true,
    //   showDownloadProgress: false,
    // });
  }

  updateDownloadProgress = () => {
    const timeout = setTimeout(() => {
      this.setState({downloadProgress: getDownloadPercentage(this.props.route.params.scorecard_uuid, AUDIO)}, () => {
        if (isAudioLanguageDownloaded(this.props.route.params.scorecard_uuid, this.state.audioLocale)) {
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
    if (isAudioLanguageDownloaded(this.props.route.params.scorecard_uuid, this.state.audioLocale))
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
          onPress={() => this.downloadScorecardAudio()}
          label={label}
        />
      </View>
    );
  };

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.closeAllSelectBox()}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ProgressHeader
            title={translations['getStarted']}
            onBackPress={() => this.props.navigation.goBack()}
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
            {this.renderDownloadButton()}
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
