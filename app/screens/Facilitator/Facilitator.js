import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import realm from '../../db/schema';
import uuidv4 from '../../utils/uuidv4';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import SelectPicker from '../../components/SelectPicker';
import ProgressHeader from '../../components/ProgressHeader';
import BottomButton from '../../components/BottomButton';
class Facilitator extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.numberOfFacilitator = 4;
    this.state = {
      facilitators: [],
      selectedFacilitators: Array.from({length: this.numberOfFacilitator}, () => null),
      isError: true,
    };
  }

  async componentDidMount() {
    let cafs = JSON.stringify(realm.objects('Caf').filtered(`local_ngo_id == ${this.props.route.params.local_ngo_id}`));
    cafs = JSON.parse(cafs);
    this.setState({facilitators: cafs.map((caf) => ({ label: caf.name, value: caf.id.toString(), disabled: false}))});
    this.loadSavedFacilitators();
  }

  onChangeFacilitator = (facilitator, facilitatorIndex) => {
    const selectedFacilitators = this.state.selectedFacilitators;
    selectedFacilitators[facilitatorIndex] = facilitator;
    this.setState({
      selectedFacilitators,
      isError: selectedFacilitators[0] === null || selectedFacilitators[1] === null,
    });
    this.updateFacilitators();
  }

  updateFacilitators = () => {
    const {selectedFacilitators, facilitators} = this.state;
    facilitators.map((facilitator, index) => {
      facilitator.disabled = false;
      for(let i=0; i<selectedFacilitators.length; i++) {
        if (selectedFacilitators[i] != null && selectedFacilitators[i].value.toString() === facilitator.value) {
          facilitators[index].disabled = true;
        }
      }
    });
  }

  renderOtherFacilitators = () => {
    const {translations} = this.context;
    let pickerzIndex = 8000;
    let itemIndex = 1;
    return Array(this.numberOfFacilitator - 1)
      .fill()
      .map((_, index) => {
        itemIndex += 1;
        pickerzIndex -= 1000;
        const customLabelStyle = {zIndex: pickerzIndex + 1};
        const selectedFacilitator = this.state.selectedFacilitators[index + 1];
        return (
          <SelectPicker
            items={this.state.facilitators}
            selectedItem={this.getSelectedFacilitator(selectedFacilitator)}
            isRequire={index == 0}
            label={translations['facilitator']}
            placeholder={translations['selectFacilitator']}
            searchablePlaceholder={translations['searchForFacilitator']}
            zIndex={pickerzIndex}
            onChangeItem={(text) => this.onChangeFacilitator(text, index + 1)}
            itemIndex={itemIndex}
            key={uuidv4()}
          />
        );
      });
  };

  saveSelectedData = () => {
    const {selectedFacilitators} = this.state;
    for(let i=0; i<selectedFacilitators.length; i++) {
      if (selectedFacilitators[i] === null)
        continue;

      this.saveFacilitatorToLocalStorage(selectedFacilitators[i], i);
    }
    this.props.navigation.navigate('ParticipantInformation', {scorecard_uuid: this.props.route.params.scorecard_uuid});
  };

  loadSavedFacilitators = () => {
    let savedFacilitators = JSON.parse(JSON.stringify(realm.objects('Facilitator').filtered('scorecard_uuid = "' + this.props.route.params.scorecard_uuid + '"')));
    if (savedFacilitators.length > 0) {
      let facilitators = this.state.selectedFacilitators;
      savedFacilitators.map((facilitator, index) => {
        facilitators[index] = {
          lable: facilitator.name,
          value: facilitator.id,
        }
      });
      this.setState({
        selectedFacilitators: facilitators,
        isError: false,
      }, () => {this.updateFacilitators();});
    }
  };

  saveFacilitatorToLocalStorage = async (caf, index) => {
    const facilitators = realm.objects('Facilitator').filtered(`scorecard_uuid == '${this.props.route.params.scorecard_uuid}'`);
    const attrs = {
      uuid: facilitators[index] === undefined ? uuidv4() : facilitators[index].uuid,
      id: parseInt(caf.value),
      name: caf.label,
      position: index === 0 ? 'lead' : 'other',
      scorecard_uuid: this.props.route.params.scorecard_uuid,
    };

    realm.write(() => {
      realm.create('Facilitator', attrs, 'modified');
    });
  };

  renderNextButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton disabled={this.state.isError} label={translations.next} onPress={() => this.saveSelectedData()} />
      </View>
    );
  };

  getSelectedFacilitator = (facilitator) => {
    return (facilitator != undefined && facilitator != null) ? facilitator.value : null
  }

  render() {
    const {translations} = this.context;
    const {facilitators} = this.state;
    const firstFacilitator = this.state.selectedFacilitators[0];

    return (
      <View style={{flex: 1}}>
        <ProgressHeader
          title={translations['getStarted']}
          onBackPress={() => this.props.navigation.goBack()}
          progressIndex={1}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <HeaderTitle
            headline="facilitatorList"
            subheading="pleaseFillInformationBelow"
          />
          <SelectPicker
            items={facilitators}
            selectedItem={this.getSelectedFacilitator(firstFacilitator)}
            isRequire={true}
            label={translations['facilitator']}
            placeholder={translations['selectFacilitator']}
            searchablePlaceholder={translations['searchForFacilitator']}
            zIndex={8000}
            customContainerStyle={{marginTop: 0}}
            customLabelStyle={{zIndex: 8001, marginTop: -10}}
            showCustomArrow={true}
            onChangeItem={(text) => this.onChangeFacilitator(text, 0)}
            itemIndex={1}
            mustHasDefaultValue={false}
          />
          <Text style={styles.otherFacilitatorsLabel}>
            {translations['otherFacilitators']}
          </Text>

          { this.renderOtherFacilitators() }
        </ScrollView>

        { this.renderNextButton() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 28,
  },
  otherFacilitatorsLabel: {
    fontSize: 18,
    color: '#2e2e2e',
    marginTop: 40,
    textTransform: 'uppercase',
    marginBottom: -10,
  },
  buttonContainer: {
    padding: 20
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Facilitator;
