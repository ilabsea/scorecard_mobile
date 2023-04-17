import React from 'react';
import {View} from 'react-native';

import { LocalizationContext } from '../Translations';
import VoiceRecord from '../ProposedIndicator/VoiceRecord';
import TextFieldInput from '../Share/TextFieldInput';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import { containerPadding } from '../../utils/responsive_util';

class AddNewIndicatorModalTextInputs extends React.Component {
  static contextType = LocalizationContext;

  renderTextInput = () => {
    return <TextFieldInput
            value={this.props.name}
            isRequire={true}
            label={this.context.translations.indicatorName}
            placeholder={this.context.translations.enterIndicatorName}
            fieldName="indicatorName"
            onChangeText={(fieldName, text) => this.props.onChangeName(text)}
            message={this.props.isIndicatorExist ? this.context.translations.thisIndicatorIsAlreadyExist : ''}
          />
  }

  isFormValid() {
    if (this.props.name == '')
      return false;

    if (this.props.selectedCustomIndicator)
      return !this.props.isIndicatorExist && (this.props.isNameChanged || this.props.isAudioChanged);

    return !this.props.isIndicatorExist;
  }

  render() {
    return (
      <React.Fragment>
        <View style={{padding: containerPadding, marginTop: 5, flexGrow: 1}}>
          { this.renderTextInput() }
          <VoiceRecord
            scorecardUuid={this.props.scorecardUuid}
            finishRecord={(filename) => this.props.updateAudio(filename)}
            audioFilePath={this.props.audio}
            deleteAudio={() => this.props.updateAudio(null)}
            isEdit={true}
            disabled={this.props.isIndicatorExist}
          />
        </View>
        <FormBottomSheetButton isValid={this.isFormValid()} save={() => this.props.save()} />
      </React.Fragment>
    )
  }
}

export default AddNewIndicatorModalTextInputs;