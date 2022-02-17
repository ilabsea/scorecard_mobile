import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modal } from 'react-native-paper';

import VoiceRecord from './VoiceRecord';
import { LocalizationContext } from '../Translations';
import AddNewIndicatorModalTextInputs from './AddNewIndicatorModalTextInputs';
import AddNewIndicatorModalButtons from './AddNewIndicatorModalButtons';
import ExistedIndicatorItem from './ExistedIndicatorItem';

import IndicatorService from '../../services/indicator_service';
import customIndicatorService from '../../services/custom_indicator_service';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { titleFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { modalBorderRadius } from '../../constants/border_radius_constant';

class AddNewIndicatorModal extends Component {
  static contextType = LocalizationContext;
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
      this.setState({
        name: this.props.selectedCustomIndicator.name,
        tag: this.props.selectedCustomIndicator.tag,
        audio: this.props.selectedCustomIndicator.local_audio,
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
      const { uuid, local_audio } = this.props.selectedCustomIndicator
      customIndicatorService.updateIndicator(uuid, indicator, this.props.scorecardUUID, local_audio);
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

  renderExistedIndicator() {
    return <ExistedIndicatorItem
              scorecardUuid={this.props.scorecardUUID}
              participantUuid={this.props.participantUUID}
              indicatorName={this.state.name}
              duplicatedIndicators={this.state.duplicatedIndicators}
              updateIndicatorList={() => this.props.updateIndicatorList()}
            />
  }

  isUniqueIndicatorOrEditing() {
    return !this.state.isIndicatorExist || this.props.isEdit;
  }

  render() {
    const {translations} = this.context;

    return (
      <Modal visible={this.props.isVisible} contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <Text style={styles.header}>
              { this.props.isEdit ? translations.editIndicator : translations.addNewIndicator }
            </Text>

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
  header: {
    fontSize: titleFontSize(),
    fontFamily: FontFamily.title,
    marginBottom: 20,
  },
});

export default AddNewIndicatorModal;