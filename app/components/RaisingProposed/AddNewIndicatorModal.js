import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Modal} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TextFieldInput from '../TextFieldInput';
import ActionButton from '../ActionButton';
import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';

class AddNewIndicatorModal extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      issueNote: '',
      issueVoice: null,
    };
  }

  onChangeText = (fieldName, name) => {
    this.setState({name});
  }

  onChangeIssueNote = (text) => {
    this.setState({issueNote: text});
  }

  isValid = () => {
    return (this.state.name === '' || this.state.name === undefined) ? false : true;
  }

  cancel = () => {
    this.setState({
      name: '',
      issueNote: '',
      issueVoice: null,
    });
    this.props.closeModal();
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
          onPress={() => this.props.closeModal()}
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
        contentContainerStyle={styles.container}
        >
        <Text style={styles.header}>{translations['addNewIndicator']}</Text>
        <TextFieldInput
          value={this.state.name}
          isRequire={true}
          label={translations['indicatorName']}
          placeholder={translations['enterIndicatorName']}
          fieldName="indicatorName"
          onChangeText={this.onChangeText}
        />

        <View style={{position: 'relative', marginBottom: 80}}>
          <TextInput
            label={translations['issueNote']}
            placeholder={translations['writeIssueOrRecordVoice']}
            mode="outlined"
            clearButtonMode="while-editing"
            value={this.state.issueNote}
            onChangeText={(text) => this.onChangeIssueNote(text)}
            style={{backgroundColor: 'white', width: '100%'}}
            multiline={true}
            height={180}
          />
          <TouchableOpacity style={styles.voiceRecordButton}>
            <MaterialIcon name="mic" size={35} color="#ffffff" />
          </TouchableOpacity>
        </View>
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
  voiceRecordButton: {
    backgroundColor: Color.primaryButtonColor,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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