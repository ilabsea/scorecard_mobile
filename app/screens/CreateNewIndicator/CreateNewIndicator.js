import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import {Provider, Portal} from 'react-native-paper';

import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import TextFieldInput from '../../components/TextFieldInput';
import SelectPicker from '../../components/SelectPicker';
import ActionButton from '../../components/ActionButton';
import OutlinedActionButton from '../../components/OutlinedActionButton';
import IndicatorCriteriaSelection from '../../components/RaisingProposed/IndicatorCriteriaSelection';
import AddNewIndicatorModal from '../../components/RaisingProposed/AddNewIndicatorModal';
import Color from '../../themes/color';

class CreateNewIndicator extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      selectedGender: 'female',
      isDisability: 'false',
      isMinority: 'false',
      isPoor: 'false',
      isYouth: 'false',
      isModalVisible: false,
      selectedIndicator: null,
      gender: [
        {label: 'Female', value: 'female'},
        {label: 'Male', value: 'male'},
        {label: 'Other', value: 'other'},
      ],
      choices: [
        {label: 'No', value: 'false'},
        {label: 'Yes', value: 'true'},
      ],
      indicators: [
        {label: 'Indicator A', value: 10, symbol: 'A', isSelected: false},
        {label: 'Indicator B', value: 10, symbol: 'B', isSelected: false},
        {label: 'Indicator C', value: 10, symbol: 'C', isSelected: false},
        {label: 'Indicator D', value: 10, symbol: 'D', isSelected: false},
        {label: 'Indicator E', value: 10, symbol: 'E', isSelected: false},
        {label: 'Indicator F', value: 10, symbol: 'F', isSelected: false},
        {label: 'Other indicator', value: 0, symbol: 'add', isSelectd: false},
      ],
    };
  }

  onChangeValue = (fieldName, value) => {
    const newState = {};
    newState[fieldName] = value;
    this.setState(newState);
  };

  onChangeGender = (gender) => {
    this.setState({selectedGender: gender.value});
  };

  renderInputForm = () => {
    const {translations} = this.context;
    const {age, gender, selectedGender, choices, isDisability, isMinority, isPoor, isYouth} = this.state;
    return (
      <View style={{marginTop: 14}}>
        <TextFieldInput
          value={age.toString()}
          isRequire={true}
          label={translations['age']}
          placeholder={translations['enterAge']}
          fieldName="age"
          renderName="Age"
          onChangeText={this.onChangeValue}
          isSecureEntry={false}
          maxLength={2}
          keyboardType="number-pad"
        />
        <SelectPicker
          items={gender}
          selectedItem={selectedGender}
          label={translations['gender']}
          isSearchable={false}
          zIndex={9000}
          customLabelStyle={{zIndex: 9001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('selectedGender', text.value)}
          mustHasDefaultValue={false}
          customDropDownContainerStyle={{marginTop: -10}}
        />
        <SelectPicker
          items={choices}
          selectedItem={isDisability}
          label={translations['disability']}
          isSearchable={false}
          zIndex={8000}
          customLabelStyle={{zIndex: 8001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('isDisability', text.value)}
          mustHasDefaultValue={false}
        />
        <SelectPicker
          items={choices}
          selectedItem={isMinority}
          label="Minority"
          isSearchable={false}
          zIndex={7000}
          customLabelStyle={{zIndex: 7001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('isMinority', text.value)}
          mustHasDefaultValue={false}
        />
        <SelectPicker
          items={choices}
          selectedItem={isPoor}
          label={translations['poor']}
          isSearchable={false}
          zIndex={6000}
          customLabelStyle={{zIndex: 6001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('isPoor', text.value)}
          mustHasDefaultValue={false}
        />
        <SelectPicker
          items={choices}
          selectedItem={isYouth}
          label={translations['youth']}
          isSearchable={false}
          zIndex={5000}
          customLabelStyle={{zIndex: 5001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('isYouth', text.value)}
          mustHasDefaultValue={false}
        />
      </View>
    );
  };

  selectIndicator = (index) => {
    const indicators = this.state.indicators;
    indicators.map((indicator) => (indicator.isSelected = false));
    indicators[index].isSelected = true;
    this.setState({
      indicators: indicators,
      selectedIndicator: indicators[index],
    });
    if (index === this.state.indicators.length - 1)
      this.setState({isModalVisible: true})
  };

  closeModal = () => {
    this.setState({isModalVisible: false});
  }

  isValidForm = () => {
    const {age, selectedIndicator} = this.state;
    return (age === '' || age === 0 || selectedIndicator === null) ? false: true;
  }

  renderSaveButton = () => {
    const {translations} = this.context;
    if (this.isValidForm()) {
      return (
        <View style={{paddingBottom: 32, paddingTop: 60}}>
          <ActionButton
            label={translations['saveAndAddNew']}
            customButtonStyle={{marginBottom: 20}}
            customBackgroundColor={Color.primaryButtonColor}
            isDisabled={false}
          />
          <OutlinedActionButton label={translations['save']} isDisabled={false} />
        </View>
      );
    }
  };

  render() {
    const {translations} = this.context;
    return (
      <Provider>
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View style={{paddingHorizontal: 14, paddingTop: 21, flex: 1}}>
                <HeaderTitle headline="recordNewUser" subheading="pleaseFillInformationBelow"/>
                {this.renderInputForm()}
                <Text style={{fontSize: 18, color: '#2e2e2e', marginTop: 20}}>
                  {translations['chooseIndicatorCategory']}
                </Text>
                <IndicatorCriteriaSelection
                  indicators={this.state.indicators}
                  selectIndicator={this.selectIndicator}
                />
                {this.renderSaveButton()}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
          <Portal>
            <AddNewIndicatorModal
              isVisible={this.state.isModalVisible}
              closeModal={() => this.closeModal()}
            />
          </Portal>
        </View>
      </Provider>
    );
  }
}

export default CreateNewIndicator;