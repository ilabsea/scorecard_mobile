import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Modal} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import TextFieldInput from '../TextFieldInput';
import VoiceRecord from './VoiceRecord';
import uuidv4 from '../../utils/uuidv4';
import {LocalizationContext} from '../Translations';
import {CUSTOM} from '../../utils/variable';
import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';
import scorecardService from '../../services/scorecardService';

import { isBlank } from '../../utils/string_util';

class AddNewIndicatorModal extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      note: '',
      audio: null,
    };
  }

  onChangeText = (fieldName, name) => {
    this.setState({name});
  }

  onChangeNote = (text) => {
    this.setState({note: text});
  }

  isValid = () => {
    if (isBlank(this.state.name))
      return false;

    if (!isBlank(this.state.note) || !isBlank(this.state.audio))
      return true;

    return false;
  }

  cancel = () => {
    this.setState({
      name: '',
      note: '',
      audio: null,
    });
    this.props.closeModal();
  }

  save = () => {
    const customIndicator = {
      uuid: uuidv4(),
      name: this.state.name,
      content: this.state.note,
      local_audio: this.state.audio,
      scorecard_uuid: this.props.scorecardUUID,
      tag: this.state.name
    };

    const scorecard = scorecardService.find(this.props.scorecardUUID);
    const customLanguageIndicator = {
      id: uuidv4(),
      content: this.state.name,
      language_code: scorecard.audio_language_code,
      local_audio: this.state.audio,
      scorecard_uuid: this.props.scorecardUUID,
      indicator_id: customIndicator.uuid,
      type: CUSTOM,
    };

    this.props.saveCustomIndicator(customIndicator, customLanguageIndicator);
  }

  finishRecord = (filename) => {
    this.setState({audio: filename});
  }

  renderButton = () => {
    const {translations} = this.context;
    return (
      <View style={styles.buttonContainer}>
        <CloseButton onPress={() => this.cancel()} label={translations.close} />
        <SaveButton
          onPress={() => this.save()}
          label={translations.save}
          disabled={!this.isValid()}
        />
      </View>
    )
  }

  render() {
    const {translations} = this.context;
    return (
      <Modal
        visible={this.props.isVisible}
        onDismiss={() => this.props.closeModal()}
        contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <Text style={styles.header}>{translations['addNewCriteria']}</Text>
            <TextFieldInput
              value={this.state.name}
              isRequire={true}
              label={translations['criteriaName']}
              placeholder={translations['enterCriteriaName']}
              fieldName="criteriaName"
              onChangeText={this.onChangeText}
            />
            <View style={{marginBottom: 20}}>
              <TextInput
                label={translations['enterNewCriteriaAsVoice']}
                placeholder={translations['enterNewCriteriaAsVoice']}
                mode="outlined"
                clearButtonMode="while-editing"
                value={this.state.note}
                onChangeText={(text) => this.onChangeNote(text)}
                style={{backgroundColor: 'white', width: '100%'}}
                multiline={true}
                height={180}
              />
            </View>
            <VoiceRecord
              participantUUID={this.props.participantUUID}
              scorecardUUID={this.props.scorecardUUID}
              finishRecord={this.finishRecord}
              deleteAudio={() => this.setState({audio: null})}
            />
            {this.renderButton()}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 126,
  },
});

export default AddNewIndicatorModal;
