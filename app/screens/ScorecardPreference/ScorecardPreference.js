import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'react-native-whc-loading';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import SelectPicker from '../../components/SelectPicker';
import MessageLabel from '../../components/MessageLabel';
import BottomButton from '../../components/BottomButton';
import HeaderTitle from '../../components/HeaderTitle';
import Color from '../../themes/color';
import {checkConnection} from '../../services/api_connectivity_service';

import {connect} from 'react-redux';
import {loadProgramLanguageAction} from '../../actions/programLanguageAction';

import ProgressHeader from '../../components/ProgressHeader';
import uuidv4 from '../../utils/uuidv4';

class ScorecardPreference extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      detail: '',
      languages: [],
      textLocale: '',
      audioLocale: '',
      date: Moment().format('DD/MM/YYYY'),
      message: '',
      messageType: '',
    };
  }

  componentDidMount() {
    const scorecard = realm.objects('Scorecard').filtered(`uuid = '${this.props.route.params.scorecard_uuid}'`)[0];
    this.setState({detail: scorecard}, () => {this.loadProgramLanguage();});
  }

  loadProgramLanguage = async () => {
    const {translations} = this.context;
    this.refs.loading.show();
    AsyncStorage.setItem('IS_CONNECTED', 'false');
    const programId = this.state.detail['program_id'];
    this.props.loadProgramLanguageAction(programId, async (isSuccess, response) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      if (isSuccess) {
        const locales = await response;
        const languagesPickerFormat = locales.map((locale) => ({value: locale.code, label: locale.name}));
        this.setState({
          languages: languagesPickerFormat,
          textLocale: this.getDefaultLocaleValue(languagesPickerFormat, 'text'),
          audioLocale: this.getDefaultLocaleValue(languagesPickerFormat, 'audio'),
        });
        this.refs.loading.show(false);
      }
      else {
        this.setState({
          messageType: 'error',
          message: translations['failedToGetLanguage'],
        });
        this.refs.loading.show(false);
      }
    });

    checkConnection((type, message) => {
      this.setState({
        messageType: type,
        message: translations[message],
      });
      this.refs.loading.show(false);
    });
  }

  getDefaultLocaleValue = (languages, type) => {
    let defaultValue = languages[0].value;
    const scorecardPreference = realm.objects('ScorecardPreference').filtered(`scorecard_uuid == '${this.props.route.params.scorecard_uuid}'`)[0];
    if (scorecardPreference != undefined)
      defaultValue = type === 'text' ? scorecardPreference.text_language_code : scorecardPreference.audio_language_code;

    return defaultValue;
  }

  changeTextLocale = (item) => {
    this.setState({textLocale: item.value})
  }

  changeAudioLocale = (item) => {
    this.setState({audioLocale: item.value});
  }

  saveSelectedData = () => {
    const {date, textLocale, audioLocale} = this.state;
    const scorecardPreference = realm.objects('ScorecardPreference').filtered(`scorecard_uuid == '${this.props.route.params.scorecard_uuid}'`)[0];
    const attrs = {
      uuid: scorecardPreference != undefined ? scorecardPreference.uuid : uuidv4(),
      scorecard_uuid: this.props.route.params.scorecard_uuid,
      selected_date: date,
      text_language_code: textLocale,
      audio_language_code: audioLocale,
    };
    realm.write(() => {realm.create('ScorecardPreference', attrs, 'modified');});
    this.props.navigation.navigate('Facilitator', {scorecard_uuid: this.props.route.params.scorecard_uuid});
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
          />
        </View>

        <SelectPicker
          items={languages}
          selectedItem={textLocale}
          label={translations["textDisplayIn"]}
          placeholder={translations["selectLanguage"]}
          searchablePlaceholder={translations["searchForLanguage"]}
          zIndex={6000}
          customLabelStyle={{zIndex: 6001}}
          showCustomArrow={true}
          onChangeItem={this.changeTextLocale}
          customDropDownContainerStyle={{marginTop: 30}}
          mustHasDefaultValue={true}
        />

        <SelectPicker
          items={languages}
          selectedItem={audioLocale}
          label={translations["audioPlayIn"]}
          placeholder={translations["selectLanguage"]}
          searchablePlaceholder={translations["searchForLanguage"]}
          zIndex={5000}
          customLabelStyle={{zIndex: 5001}}
          showCustomArrow={true}
          onChangeItem={this.changeAudioLocale}
          mustHasDefaultValue={true}
        />

        <MessageLabel
          message={message}
          type={messageType}
          customStyle={{marginTop: 120}}
        />
      </View>
    );
  };

  render() {
    const {translations} = this.context;

    return (
      <View style={{flex: 1}}>
        <ProgressHeader
          title={translations['getStarted']}
          onBackPress={() => this.props.navigation.goBack()}
          progressIndex={0}/>
        <ScrollView contentContainerStyle={styles.container}>
          <Loading
            ref="loading"
            backgroundColor="#ffffffF2"
            borderRadius={5}
            size={70}
            imageSize={40}
            indicatorColor={Color.primaryColor}
          />
          <HeaderTitle
            headline="scorecardPreference"
            subheading="pleaseFillInformationBelow"
          />
          {this.renderForm()}
          <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 28}}>
            <BottomButton
              label={translations.next}
              onPress={() => this.saveSelectedData()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 0,
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

function mapStateToProps(state) {
  return {
    isLoading: state.loadProgramLanguageReducer.isLoading,
    languages: state.loadProgramLanguageReducer.result,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProgramLanguageAction: (programId, callback) =>
      dispatch(loadProgramLanguageAction(programId, callback)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardPreference);
