import React, {Component} from 'react';
import {View} from 'react-native';
import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import SelectPicker from '../SelectPicker';

class ParticipantForm extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      age: 0,
      selectedGender: 'female',
      isDisability: 'false',
      isMinority: 'false',
      isPoor: 'false',
      isYouth: 'false',
      isValidAge: false,
    };
  }

  componentDidMount() {
    if (this.props.isUpdate) {
      this.setState(this.props.participant);
      this.setState({isValidAge: true});
    }
  }

  onChangeValue = (fieldName, value) => {
    const newState = {};
    newState[fieldName] = value;
    this.setState(newState);
    this.props.updateNewState(newState);
  };

  updateValidationStatus = (isValid) => {
    this.setState({
      isValidAge: isValid
    });

    this.props.updateValidationStatus(isValid);
  }

  getBorderColor = () => {
    return !this.state.isValidAge ? 'red' : '';
  }

  render() {
    const {translations} = this.context;
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth} = this.state;
    const gender = [
      {label: translations.female, value: 'female'},
      {label: translations.male, value: 'male'},
      {label: translations.otherGender, value: 'other'},
    ];
    const choices = [
      {label: translations.optionNo, value: 'false'},
      {label: translations.optionYes, value: 'true'},
    ];

    return (
      <View style={this.props.containerStyle}>
        <TextFieldInput
          value={age.toString()}
          isRequire={true}
          label={translations['age']}
          searchable={false}
          placeholder={translations['enterAge']}
          fieldName="age"
          onChangeText={this.onChangeValue}
          isSecureEntry={false}
          maxLength={2}
          keyboardType="number-pad"
          updateValidationStatus={this.updateValidationStatus}
          borderColor={this.getBorderColor()}
        />
        <SelectPicker
          items={gender}
          selectedItem={selectedGender}
          label={translations['gender']}
          zIndex={9000}
          onChangeItem={(text) =>
            this.onChangeValue('selectedGender', text.value)
          }
          customDropDownContainerStyle={{marginTop: -10}}
        />
        <SelectPicker
          items={choices}
          selectedItem={isDisability}
          label={translations['disability']}
          zIndex={8000}
          onChangeItem={(text) =>
            this.onChangeValue('isDisability', text.value)
          }
        />
        <SelectPicker
          items={choices}
          selectedItem={isMinority}
          label={translations['minority']}
          zIndex={7000}
          onChangeItem={(text) => this.onChangeValue('isMinority', text.value)}
        />
        <SelectPicker
          items={choices}
          selectedItem={isPoor}
          label={translations['poor']}
          zIndex={6000}
          onChangeItem={(text) => this.onChangeValue('isPoor', text.value)}
        />
        <SelectPicker
          items={choices}
          selectedItem={isYouth}
          label={translations['youth']}
          zIndex={5000}
          onChangeItem={(text) => this.onChangeValue('isYouth', text.value)}
        />
      </View>
    );    
  }
}

export default ParticipantForm;