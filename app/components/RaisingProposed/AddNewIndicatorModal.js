import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Modal} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import TextFieldInput from '../TextFieldInput';
import ActionButton from '../ActionButton';
import VoiceRecord from './VoiceRecord';
import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';
import {LocalizationContext} from '../Translations';

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
    if (this.state.name === '' || this.state.name === undefined) return false;
    if (this.state.note != '' || this.state.audio != null) return true;
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
      note: this.state.note,
      audio: this.state.audio,
      scorecard_uuid: this.props.scorecardUUID,
    };
    this.props.saveCustomIndicator(customIndicator);
  }

  finishRecord = (filename) => {
    this.setState({audio: filename});
  }

  renderButton = () => {
    const {translations} = this.context;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.cancel()}
          style={styles.buttonCancel}>
          <Text style={styles.buttonCancelLabel}>
            {translations['cancel']}
          </Text>
        </TouchableOpacity>
        <ActionButton
          onPress={() => this.save()}
          label={translations['save']}
          customButtonStyle={{width: 100}}
          customBackgroundColor={Color.primaryButtonColor}
          isDisabled={!this.isValid()}
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
  buttonCancel: {
    width: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancelLabel: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#656565',
  },
});

export default AddNewIndicatorModal;