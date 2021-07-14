import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Modal } from 'react-native-paper';

import TextFieldInput from '../TextFieldInput';
import VoiceRecord from './VoiceRecord';
import uuidv4 from '../../utils/uuidv4';
import { LocalizationContext } from '../Translations';
import { CUSTOM } from '../../utils/variable';
import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';

import Scorecard from '../../models/Scorecard';
import Autocomplete from './Autocomplete';
import { isBlank } from '../../utils/string_util';
import indicatorHelper from '../../helpers/indicator_helper';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { modalHeadingTitleSize } from '../../utils/responsive_util';
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
    };

    this.tags = indicatorHelper.getTags(props.scorecardUUID);
  }

  isValid = () => {
    if (isBlank(this.state.name))
      return false;

    return true;
  }

  cancel = () => {
    this.setState({
      name: '',
      tag: '',
      audio: null,
    });
    this.props.closeModal();
  }

  save = () => {
    const customIndicator = {
      uuid: uuidv4(),
      name: this.state.name,
      local_audio: this.state.audio,
      scorecard_uuid: this.props.scorecardUUID,
      tag: this.state.tag
    };

    const scorecard = Scorecard.find(this.props.scorecardUUID);
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
    this.setState({
      name: '',
      tag: '',
      audio: null,
    });
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

  _filterData = (query) => {
    if (query === '') {
      return [];
    }

    let PATTERN = new RegExp(`${query.trim()}`, 'i');
    return this.tags.filter(str => PATTERN.test(str));
  }

  render() {
    const {translations} = this.context;
    const data = this._filterData(this.state.tag);

    return (
      <Modal
        visible={this.props.isVisible}
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
              onChangeText={(fieldName, text) => this.setState({name: text})}
            />

            <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              label={translations['enterTag']}
              data={data}
              value={this.state.tag}
              onChangeText={(text) => this.setState({tag: text})}
              style={{marginBottom: 24}}
            />

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
    backgroundColor: Color.whiteColor,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: modalBorderRadius
  },
  header: {
    fontSize: modalHeadingTitleSize(),
    fontFamily: FontFamily.title,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 126,
  },
});

export default AddNewIndicatorModal;
