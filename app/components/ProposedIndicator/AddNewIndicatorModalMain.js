import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import VoiceRecord from './VoiceRecord';
import AddNewIndicatorModalTextInputs from './AddNewIndicatorModalTextInputs';
import ExistedIndicatorItem from './ExistedIndicatorItem';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import BottomSheetModalTitle from '../BottomSheetModalTitle';

import IndicatorService from '../../services/indicator_service';
import customIndicatorService from '../../services/custom_indicator_service';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import indicatorHelper from '../../helpers/indicator_helper';
import { isBlank } from '../../utils/string_util';
import { containerPadding } from '../../utils/responsive_util';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { participantContentHeight } from '../../constants/modal_constant';
import Indicator from '../../models/Indicator';
import settingHelper from '../../helpers/setting_helper';

class AddNewIndicatorModalMain extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      name: props.selectedCustomIndicator ? props.selectedCustomIndicator.name : '',
      tag: props.selectedCustomIndicator ? props.selectedCustomIndicator.tag : '',
      audio: props.selectedCustomIndicator ? props.selectedCustomIndicator.local_audio : null,
      isIndicatorExist: false,
      duplicatedIndicators: [],
      // isFormValid: false,
    };
    this.endpointId = '';
  }

  async componentDidMount() {
    this.endpointId = await settingHelper.getSavedEndpointUrlId();
  }

  clearInputs() {
    this.setState({
      name: '',
      tag: '',
      audio: null,
      isIndicatorExist: false,
    });
  }

  save = () => {
    const indicator = {
      name: this.state.name,
      tag: this.state.tag,
      local_audio: this.state.audio,
    };

    if (this.props.isEdit) {
      const { uuid, local_audio } = this.props.selectedCustomIndicator
      customIndicatorService.updateIndicator(uuid, indicator, this.props.scorecardUuid, local_audio);
      this.props.finishSaveOrUpdateCustomIndicator(true);
      this.clearInputs();
    }
    else {
      customIndicatorService.createNewIndicator(this.props.scorecardUuid, indicator, this.props.participantUuid, async (customIndicator) => {
        this.props.finishSaveOrUpdateCustomIndicator(false);

        if (await isProposeByIndicatorBase())
          this.showParticipantListModal(customIndicator);     // Switch the modal content to participant list
        else {
          !!this.props.updateIndicatorList && this.props.updateIndicatorList();
          this.props.closeModal();
        }
      });
    }
  }

  showParticipantListModal(customIndicator) {
    const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: customIndicator };
    proposedIndicatorHelper.showParticipantListModal(this.props.formModalRef, this.props.participantModalRef, proposedIndicatorParams, this.props.updateIndicatorList);
    this.clearInputs();
  }

  isFormValid() {
    if (this.state.name == '')
      return false;

    if (this.props.selectedCustomIndicator) {
      const { name, tag } = this.props.selectedCustomIndicator;
      const isNameChanged = this.state.name != name;
      const isTagChanged = this.state.tag != tag;
      return isNameChanged || isTagChanged;
    }
  }

  renderButton = () => {
    // const isValid = (isBlank(this.state.name) || this.state.isIndicatorExist) ? false : true;
    // return <FormBottomSheetButton isValid={isValid} save={() => this.save()} />

    return <FormBottomSheetButton isValid={this.isFormValid()} save={() => this.save()} />
  }

  onChangeName(name) {
    const selectedIndicatorUuid = this.props.selectedCustomIndicator ? this.props.selectedCustomIndicator.uuid : null;
    const duplicatedIndicators = Indicator.findByScorecardAndName(this.props.scorecardUuid, name, this.endpointId, selectedIndicatorUuid);

    this.setState({
      name,
      isIndicatorExist: name === '' ? false : duplicatedIndicators.length > 0,
      duplicatedIndicators: indicatorHelper.getIndicatorsAttrs(duplicatedIndicators),
    });
  }

  renderTextInputs() {
    return (
      <AddNewIndicatorModalTextInputs
        name={this.state.name}
        tag={this.state.tag}
        isEdit={this.props.isEdit}
        scorecardUuid={this.props.scorecardUuid}
        onChangeName={(text) => this.onChangeName(text)}
        onChangeTag={(text) => this.setState({tag: text})}
        isIndicatorExist={this.state.isIndicatorExist}
        isUniqueIndicatorOrEditing={this.isUniqueIndicatorOrEditing()}
      />
    )
  }

  updateIndicatorList() {
    if (!this.props.isIndicatorBase)  // To prevent the warning of can't perform state update on an unmount component
      this.clearInputs();

    this.props.updateIndicatorList();
  }

  renderExistedIndicator() {
    return <ExistedIndicatorItem
              scorecardUuid={this.props.scorecardUuid}
              participantUuid={this.props.participantUuid}
              indicatorName={this.state.name}
              duplicatedIndicators={this.state.duplicatedIndicators}
              isIndicatorBase={this.props.isIndicatorBase}
              updateIndicatorList={() => this.updateIndicatorList()}
              formModalRef={this.props.formModalRef}
              participantModalRef={this.props.participantModalRef}
            />
  }

  isUniqueIndicatorOrEditing() {
    return !this.state.isIndicatorExist || this.props.isEdit;
  }

  renderForm() {
    return <View style={{padding: containerPadding, marginTop: 5, flexGrow: 1}}>
            { this.renderTextInputs() }

            { this.isUniqueIndicatorOrEditing() ?
              <VoiceRecord
                scorecardUuid={this.props.scorecardUuid}
                finishRecord={(filename) => this.setState({audio: filename})}
                audioFilePath={this.state.audio}
                deleteAudio={() => this.setState({audio: null})}
                isEdit={this.props.isEdit}
              />
              :
              this.renderExistedIndicator()
            }
           </View>
  }

  render() {
    const title = this.props.isEdit ? this.context.translations.editIndicator : this.context.translations.addNewIndicator;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{height: hp(participantContentHeight)}}>
          <BottomSheetModalTitle title={title} />
          { this.renderForm() }
          { this.renderButton() }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AddNewIndicatorModalMain;
