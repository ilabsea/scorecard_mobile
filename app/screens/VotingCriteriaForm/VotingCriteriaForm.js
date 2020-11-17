import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';

import ActionButton from '../../components/ActionButton';
import HeaderTitle from '../../components/HeaderTitle';
import { Subheading } from 'react-native-paper';

import IndependentValidationInputField from '../../components/ParticipantInformation/IndependentValidationInputField';
import SelectPicker from '../../components/SelectPicker';
import CriteriaRatingItem from '../../components/VotingCriteria/CriteriaRatingItem';

export default class VotingCriteriaForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    // realm.objects('Scorecard')
  }

  _renderPicker(option) {
    return (
      <View style={{width: "100%"}}>
        <SelectPicker
          items={option.items}
          selectedItem={option.selectedItem}
          label={option.label}
          searchable={false}
          zIndex={6000}
          customLabelStyle={{zIndex: 6001}}
          showCustomArrow={true}
          onChangeItem={ () => {} }
          customDropDownContainerStyle={{marginBottom: 20}}
        />
      </View>
    );
  }

  _renderGenderInput() {
    const {translations} = this.context;
    let items=[
        {label: 'Female', value: 'female'},
        {label: 'Male', value: 'male'},
        {label: 'Other', value: 'other'},
    ];

    let option = {
      items: items,
      selectedItem: items[0].value,
      label: translations['gender'],
      stateName: 'gender'
    }

    return (this._renderPicker(option))
  }

  _renderDisabilityInput() {
    const {translations} = this.context;

    let items=[
      { label: 'No', value: 'no' },
      { label: 'Yes', value: 'yes' },
    ];

    let option = {
      items: items,
      selectedItem: items[0].value,
      label: translations['disability'],
      stateName: 'disability'
    }

    return (this._renderPicker(option))
  }

  _renderForm() {
    const {translations} = this.context;

    return (
      <View style={{marginTop: 24}}>
        <IndependentValidationInputField
          ref={this.participantRef}
          label={translations['age']}
          onParticipantChange={() => {}}
          wrapperStyle={{}}
        />

        { this._renderGenderInput() }
        { this._renderDisabilityInput() }
      </View>
    )
  }

  _renderCriteriaRatingList() {
    let data = ['A', 'B', 'C', "D", "E"];

    return (
      data.map(criteria => <CriteriaRatingItem key={uuidv4()} criteria={criteria}/>)
    )
  }

  _renderContent() {
    return (
      <ScrollView style={styles.container}>
        <HeaderTitle headline="addNewScorecardVoting" subheading="pleaseFillInformationBelow"/>

        { this._renderForm() }

        <Subheading style={styles.subheading}>{ "Choose Criter" } </Subheading>

        { this._renderCriteriaRatingList() }
      </ScrollView>
    )
  }

  _renderFooter() {
    return (
      <View style={{padding: 20}}>
        <ActionButton
          onPress={() => console.log('hello')}
          customBackgroundColor={Color.headerColor}
          label={'SAVE & ADD NEW'}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        { this._renderContent() }
        { this._renderFooter() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  subheading: {
    marginTop: 40,
    textTransform: 'uppercase',
  }
})
