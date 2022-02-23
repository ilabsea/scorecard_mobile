import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modal } from 'react-native-paper';

import VoiceRecord from './VoiceRecord';
import AddNewIndicatorModalTitle from './AddNewIndicatorModalTitle';
import AddNewIndicatorModalTextInputs from './AddNewIndicatorModalTextInputs';
import AddNewIndicatorModalButtons from './AddNewIndicatorModalButtons';
import ExistedIndicatorItem from './ExistedIndicatorItem';

import IndicatorService from '../../services/indicator_service';
import customIndicatorService from '../../services/custom_indicator_service';
import { getLanguageIndicator } from '../../services/language_indicator_service';
import Color from '../../themes/color';
import { modalBorderRadius } from '../../constants/border_radius_constant';

class AddNewIndicatorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      tag: '',
      audio: null,
      isIndicatorExist: false,
      duplicatedIndicators: []
    };

    this.isComponentUnmount = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.isComponentUnmount && this.props.selectedCustomIndicator && this.props.isVisible && !prevProps.isVisible) {
      const languageIndicator = getLanguageIndicator(this.props.scorecardUUID, this.props.selectedCustomIndicator.indicatorable_id, 'audio');

      this.setState({
        name: this.props.selectedCustomIndicator.name,
        tag: this.props.selectedCustomIndicator.tag,
        // audio: this.props.selectedCustomIndicator.local_audio,
        audio: languageIndicator.local_audio
      });
    }
  }

  componentWillUnmount() {
    this.isComponentUnmount = true;
  }

  clearInputs() {
    this.setState({
      name: '',
      tag: '',
      audio: null,
      isIndicatorExist: false,
    });
  }

  cancel = () => {
    this.clearInputs();
    this.props.closeModal();
  }

  save = () => {
    const indicator = {
      name: this.state.name,
      tag: this.state.tag,
      local_audio: this.state.audio,
    };

    if (this.props.isEdit) {
      // Previous version code
      // const { uuid, local_audio } = this.props.selectedCustomIndicator
      // customIndicatorService.updateIndicator(uuid, indicator, this.props.scorecardUUID, local_audio);

      const { indicatorable_id, local_audio } = this.props.selectedCustomIndicator
      customIndicatorService.updateIndicator(indicatorable_id, indicator, this.props.scorecardUUID, local_audio);

      this.props.finishSaveOrUpdateCustomIndicator(true);
    }
    else {
      customIndicatorService.createNewIndicator(this.props.scorecardUUID, indicator, this.props.participantUUID, () => {
        this.props.finishSaveOrUpdateCustomIndicator(false);
      });
    }
    this.clearInputs();
  }

  renderButtons = () => {
    return <AddNewIndicatorModalButtons
              name={this.state.name}
              save={() => this.save()}
              cancel={() => this.cancel()}
              isIndicatorExist={this.state.isIndicatorExist}
              isUniqueIndicatorOrEditing={this.isUniqueIndicatorOrEditing()}
            />
  }

  onChangeName(name) {
    const selectedIndicatorUuid = this.props.selectedCustomIndicator ? this.props.selectedCustomIndicator.uuid : null;
    const indicatorService = new IndicatorService();

    this.setState({
      name,
      isIndicatorExist: name === '' ? false : indicatorService.isIndicatorExist(this.props.scorecardUUID, name, selectedIndicatorUuid),
      duplicatedIndicators: indicatorService.getDuplicatedIndicator(this.props.scorecardUUID, name)
    });
  }

  renderTextInputs() {
    return (
      <AddNewIndicatorModalTextInputs
        name={this.state.name}
        tag={this.state.tag}
        isEdit={this.props.isEdit}
        scorecardUuid={this.props.scorecardUUID}
        onChangeName={(text) => this.onChangeName(text)}
        onChangeTag={(text) => this.setState({tag: text})}
        isIndicatorExist={this.state.isIndicatorExist}
        isUniqueIndicatorOrEditing={this.isUniqueIndicatorOrEditing()}
      />
    )
  }

  updateIndicatorList() {
    this.clearInputs();
    this.props.updateIndicatorList();
  }

  renderExistedIndicator() {
    return <ExistedIndicatorItem
              scorecardUuid={this.props.scorecardUUID}
              participantUuid={this.props.participantUUID}
              indicatorName={this.state.name}
              duplicatedIndicators={this.state.duplicatedIndicators}
              updateIndicatorList={() => this.updateIndicatorList()}
            />
  }

  isUniqueIndicatorOrEditing() {
    return !this.state.isIndicatorExist || this.props.isEdit;
  }

  render() {
    return (
      <Modal visible={this.props.isVisible} contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <AddNewIndicatorModalTitle isEdit={this.props.isEdit} />

            { this.renderTextInputs() }

            { this.isUniqueIndicatorOrEditing() ?
              <VoiceRecord
                participantUUID={this.props.participantUUID}
                scorecardUUID={this.props.scorecardUUID}
                finishRecord={(filename) => this.setState({audio: filename})}
                audioFilePath={this.state.audio}
                deleteAudio={() => this.setState({audio: null})}
                isEdit={this.props.isEdit}
              />
              :
              this.renderExistedIndicator()
            }

            {this.renderButtons()}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: modalBorderRadius,
    width: '92%',
    alignSelf: 'center',
  },
});

export default AddNewIndicatorModal;