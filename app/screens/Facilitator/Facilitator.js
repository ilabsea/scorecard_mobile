import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Subheading} from 'react-native-paper';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import SelectPicker from '../../components/SelectPicker';
import ActionButton from '../../components/ActionButton';
import MessageLabel from '../../components/MessageLabel';
import validationService from '../../services/validation_service';

class Facilitator extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      facilitators: [],
      facilitatorLead: null,
      otherFacilitators: Array(3),
      isDuplicate: false,
      message: '',
      messageType: '',
      uuid: '',
      isError: true,
    };
  }

  async componentDidMount() {
    const scorecard = JSON.parse(await AsyncStorage.getItem('SCORECARD_DETAIL'));
    let cafs = JSON.stringify(realm.objects('Caf').filtered('uuid = "' + scorecard.uuid + '"'));
    cafs = JSON.parse(cafs);
    this.setState({
      facilitators: cafs.map((caf) => ({label: caf.name, value: caf.id.toString()})),
      uuid: scorecard.uuid,
    });

    this.loadSavedFacilitators();
  }

  changeFacilitatorLead = async (facilitator) => {
    await this.setState({facilitatorLead: facilitator});
    this.checkSelectedFacilitator();
  }

  changeOtherFacilitator = (facilitator, index) => {
    const facilitators = this.state.otherFacilitators;
    facilitators[index] = facilitator;
    this.setState({otherFacilitators: facilitators});
    this.checkSelectedFacilitator();
  }

  renderOtherFacilitators = () => {
    const {translations} = this.context;
    const {facilitators, otherFacilitators} = this.state;
    let pickerzIndex = 8000;

    return Array(3).fill().map((_, index) => {
      pickerzIndex -= 1000;
      const customLabelStyle = {zIndex: pickerzIndex + 1};
      return (
        <SelectPicker
          items={facilitators}
          selectedItem={ otherFacilitators[index] != undefined ? otherFacilitators[index].value : null }
          label={translations["facilitator"]}
          placeholder={translations["selectFacilitator"]}
          searchablePlaceholder={translations["searchForFacilitator"]}
          zIndex={pickerzIndex}
          customLabelStyle={customLabelStyle}
          showCustomArrow={true}
          onChangeItem={this.changeOtherFacilitator}
          mustHasDefaultValue={false}
          itemIndex={index}
          key={index}
        />
      );
    });
  }

  checkSelectedFacilitator = () => {
    const {translations} = this.context;
    const {facilitatorLead, otherFacilitators} = this.state;
    let facilitators = otherFacilitators.filter((facilitator) => {return facilitator != ''});

    if (facilitatorLead != null)
      facilitators = facilitators.concat(facilitatorLead);

    const facilitatorsId = facilitators.map((facilitator) => { return facilitator.value });
    const isDuplicate = facilitatorsId.some((id, index) => { return facilitatorsId.indexOf(id) != index; });

    if (!isDuplicate && facilitatorLead != null && facilitators.length == 4)
      this.setErrorStatus('', '', false, false);
    else if (isDuplicate)
      this.setErrorStatus(translations['facilitatorCannotDuplicate'], 'error', true, true);
  }

  setErrorStatus = (message, type, isDuplicate, isError) => {
    this.setState({
      message: message,
      messageType: type,
      isDuplicate: isDuplicate,
      isError: isError,
    });
  }

  isValidForm = () => {
    const {facilitatorLead, otherFacilitators, isDuplicate} = this.state;
    const facilitatorLeadMsg = validationService('facilitatorLead', facilitatorLead);
    const otherFacilitatorMsg = validationService('otherFacilitator', otherFacilitators);

    this.setState({
      message: facilitatorLeadMsg || otherFacilitatorMsg || '',
      mesageType: 'error'
    })

    if (isDuplicate || facilitatorLeadMsg != undefined || otherFacilitatorMsg != undefined)
      return false;

    return true;
  }

  saveSelectedData = () => {
    const {facilitatorLead, otherFacilitators} = this.state;

    if (!this.isValidForm())
      return;

    this.clearFacilitatorFromLocalStorage();
    this.saveFacilitatorToLocalStorage(facilitatorLead, 'lead');
    otherFacilitators.map((facilitator) => {
      this.saveFacilitatorToLocalStorage(facilitator, 'other');
    });
    this.props.navigation.navigate('ParticipateInformation');
  }

  loadSavedFacilitators = () => {
    const facilitators = realm.objects('Facilitator').filtered('uuid = "' + this.state.uuid + '"')
    let savedFacilitators = JSON.stringify(facilitators);
    savedFacilitators = JSON.parse(savedFacilitators);

    if (savedFacilitators.length > 0) {
      const facilitatorLead = {
        label: savedFacilitators[0].name,
        value: savedFacilitators[0].id,
      }

      this.setState({
        facilitatorLead,
        otherFacilitators: this.getOtherFacilitator(savedFacilitators),
        isError: false,
      });
    }
  }

  getOtherFacilitator = (facilitators) => {
    let otherFacilitators = facilitators.filter((facilitator) => facilitator.position === 'other');
    return otherFacilitators.map((facilitator) => ({label: facilitator.name, value: facilitator.id.toString()}))
  }

  saveFacilitatorToLocalStorage = async (caf, position) => {
    const facilitator = {
      id: parseInt(caf.value),
      name: caf.label,
      position: position,
      uuid: this.state.uuid,
    };

    realm.write(() => {
      realm.create('Facilitator', facilitator);
    });
  }

  clearFacilitatorFromLocalStorage = () => {
    realm.write(() => {
      const facilitators = realm.objects('Facilitator').filtered('uuid = "' + this.state.uuid +'"');
      realm.delete(facilitators);
    });
  }

  renderNextButton = () => {
    if (!this.state.isError) {
      const {translations} = this.context;
      return (
        <ActionButton
          label={translations["next"]}
          onPress={() => this.saveSelectedData()}
          customButtonStyle={{marginTop: 10}}
        />
      );
    }
  }

  render() {
    const {translations} = this.context;
    const {facilitators, message, messageType, facilitatorLead} = this.state;

    return (
      <View style={styles.container}>
        <HeaderTitle
          headline="facilitatorList"
          subheading="pleaseFillInformationBelow"
        />

        <SelectPicker
          items={facilitators}
          selectedItem={facilitatorLead != null ? facilitatorLead.value : null}
          label={translations["facilitatorLead"]}
          placeholder={translations["selectFacilitator"]}
          searchablePlaceholder={translations["searchForFacilitator"]}
          zIndex={8000}
          customLabelStyle={{zIndex: 8001}}
          showCustomArrow={true}
          onChangeItem={this.changeFacilitatorLead}
          customDropDownContainerStyle={{marginTop: 30}}
          mustHasDefaultValue={false}
        />

        <Subheading style={styles.otherFacilitatorsLabel}>
          {translations['otherFacilitators']}
        </Subheading>

        {this.renderOtherFacilitators()}

        <MessageLabel
          message={message}
          type={messageType}
          customStyle={{marginTop: 50}}
        />
        {this.renderNextButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  otherFacilitatorsLabel: {
    color: 'gray',
    marginTop: 40,
    textTransform: 'uppercase',
  }
});

export default Facilitator;