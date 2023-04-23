import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import CustomIndicatorForm from './CustomIndicatorForm';
import BottomSheetModalTitle from '../BottomSheetModalTitle';

import customIndicatorService from '../../services/custom_indicator_service';
import indicatorHelper from '../../helpers/indicator_helper';
import { customIndicatorModalContentHeight } from '../../constants/modal_constant';
import Indicator from '../../models/Indicator';
import LanguageIndicator from '../../models/LanguageIndicator';
import Scorecard from '../../models/Scorecard';
import settingHelper from '../../helpers/setting_helper';

class AddNewIndicatorModalMain extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      name: props.selectedCustomIndicator ? props.selectedCustomIndicator.name : '',
      audio: null,
      isIndicatorExist: false,
      duplicatedIndicators: [],
      isNameChanged: false,
      isAudioChanged: false,
    };
    this.endpointId = '';
  }

  async componentDidMount() {
    this.endpointId = await settingHelper.getSavedEndpointUrlId();

    if (!this.props.selectedCustomIndicator)
      return;

    const scorecard = Scorecard.find(this.props.scorecardUuid);
    const languageIndicator = LanguageIndicator.findByIndicatorUuidAndLanguageCode(this.props.selectedCustomIndicator.indicator_uuid, scorecard.audio_language_code);
    this.previousAudio = !!languageIndicator ? languageIndicator.local_audio : null;
    this.setState({ audio: this.previousAudio });
  }

  clearInputs() {
    this.setState({
      name: '',
      audio: null,
      isIndicatorExist: false,
    });
  }

  save = () => {
    const indicator = {
      name: this.state.name,
      local_audio: this.state.audio,
    };
    const { uuid } = this.props.selectedCustomIndicator
    customIndicatorService.updateIndicator(uuid, indicator, this.props.scorecardUuid, this.state.audio);
    this.clearInputs();
    this.props.formModalRef.current?.dismiss();
  }

  onChangeName(name) {
    const selectedIndicatorUuid = this.props.selectedCustomIndicator ? this.props.selectedCustomIndicator.uuid : null;
    const duplicatedIndicators = Indicator.findByScorecardAndName(this.props.scorecardUuid, name, this.endpointId, selectedIndicatorUuid);

    this.setState({
      name,
      isIndicatorExist: name === '' ? false : duplicatedIndicators.length > 0,
      duplicatedIndicators: indicatorHelper.getIndicatorsAttrs(duplicatedIndicators),
      isNameChanged: !!this.props.selectedCustomIndicator ? name != this.props.selectedCustomIndicator.name : false,
    });
  }

  updateIndicatorList() {
    if (!this.props.isIndicatorBase)  // To prevent the warning of can't perform state update on an unmount component
      this.clearInputs();

    this.props.updateIndicatorList();
  }

  async updateAudio(filename) {
    this.setState({
      audio: filename,
      isAudioChanged: await customIndicatorService.isIndicatorAudioChanged(this.previousAudio, filename),
    });
  }

  renderForm() {
    return <CustomIndicatorForm
              scorecardUuid={this.props.scorecardUuid}
              participantUuid={this.props.participantUuid}
              updateAudio={(filename) => this.updateAudio(filename)}
              audioFilePath={this.state.audio}
              isEdit={this.props.isEdit}
              name={this.state.name}
              duplicatedIndicators={this.state.duplicatedIndicators}
              isIndicatorBase={this.props.isIndicatorBase}
              updateIndicatorList={() => this.updateIndicatorList()}
              onChangeName={(name) => this.onChangeName(name)}
              isIndicatorExist={this.state.isIndicatorExist}
              isNameChanged={this.state.isNameChanged}
              isAudioChanged={this.state.isAudioChanged}
              save={() => this.save()}
           />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{height: hp(customIndicatorModalContentHeight)}}>
          <BottomSheetModalTitle title={this.context.translations.editIndicator} />
          { this.renderForm() }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AddNewIndicatorModalMain;
