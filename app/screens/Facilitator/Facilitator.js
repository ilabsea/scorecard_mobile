import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Subheading} from 'react-native-paper';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import SelectPicker from '../../components/SelectPicker';
import ActionButton from '../../components/ActionButton';

class Facilitator extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      facilitators: [],
      facilitatorLead: '',
      otherFacilitators: Array(3),
    };
  }

  async componentDidMount() {
    const scorecard = JSON.parse(await AsyncStorage.getItem('SCORECARD_DETAIL'));
    let cafs = JSON.stringify(realm.objects('Caf').filtered('uuid = "' + scorecard.uuid + '"'));
    cafs = JSON.parse(cafs);
    this.setState({facilitators: cafs.map((caf) => ({value: caf.id, label: caf.name}))});
  }

  changeOtherFacilitator = (facilitator, index) => {
    const facilitators = this.state.otherFacilitators;
    facilitators[index] = facilitator;
    this.setState({otherFacilitators: facilitators});
  }

  renderOtherFacilitators = () => {
    const {facilitators} = this.state;
    let pickerzIndex = 8000;
    
    return Array(3).fill().map((_, index) => {
      pickerzIndex -= 1000;
      const customLabelStyle = {zIndex: pickerzIndex + 1};
      return (
        <SelectPicker
          items={facilitators}
          label="facilitator"
          placeholder="selectLanguage"
          searchablePlaceholder="searchForLanguage"
          zIndex={pickerzIndex}
          customLabelStyle={customLabelStyle}
          showCustomArrow={true}
          onChangeItem={this.changeOtherFacilitator}
          mustHasDefaultValue={false}
          index={index + 1}
        />
      );
    });
  }

  saveSelectedData = () => {
    const {facilitatorLead, otherFacilitators} = this.state;
    console.log('facilitator lead = ', facilitatorLead);
    console.log('other faciliator = ', otherFacilitators);
  }

  render() {
    const {translations} = this.context;
    const {facilitators} = this.state;

    return (
      <View style={styles.container}>
        <HeaderTitle
          headline="facilitatorList"
          subheading="pleaseFillInformationBelow"
        />

        <SelectPicker
          items={facilitators}
          label="facilitatorLead"
          placeholder="selectFacilitator"
          searchablePlaceholder="searchForFacilitator"
          zIndex={8000}
          customLabelStyle={{zIndex: 8001}}
          showCustomArrow={true}
          onChangeItem={(facilitator) => this.setState({facilitatorLead: facilitator})}
          customDropDownContainerStyle={{marginTop: 30}}
          mustHasDefaultValue={false}
        />

        <Subheading style={styles.otherFacilitatorsLabel}>
          {translations['otherFacilitators']}
        </Subheading>

        {this.renderOtherFacilitators()}

        <ActionButton
          label="next"
          onPress={() => this.saveSelectedData()}
          customButtonStyle={{marginTop: 60}}
        />
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