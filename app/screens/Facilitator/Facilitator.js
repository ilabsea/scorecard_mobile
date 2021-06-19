import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableWithoutFeedback, Pressable} from 'react-native';
import realm from '../../db/schema';
import uuidv4 from '../../utils/uuidv4';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import ProgressHeader from '../../components/ProgressHeader';
import BottomButton from '../../components/BottomButton';
import FacilitatorForm from '../../components/Facilitator/FacilitatorForm';

import Color from '../../themes/color';

import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';

class Facilitator extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.numberOfFacilitator = 4;
    this.state = {
      facilitators: [],
      selectedFacilitators: Array.from({length: this.numberOfFacilitator}, () => null),
      isError: true,
      containerPaddingBottom: 0,
    };

    this.formRef = React.createRef();
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
      isError: selectedFacilitators[0] === null || selectedFacilitators[1] === null
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

  saveSelectedData = () => {
    this.formRef.current.closeSelectBox(null);
    const {selectedFacilitators} = this.state;
    for(let i=0; i<selectedFacilitators.length; i++) {
      if (selectedFacilitators[i] === null)
        continue;

      this.saveFacilitatorToLocalStorage(selectedFacilitators[i], i);
    }
    this.props.navigation.navigate('OfflineParticipantList', {scorecard_uuid: this.props.route.params.scorecard_uuid});
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


  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.formRef.current.closeSelectBox(null)}>
        <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
          <ProgressHeader
            title={translations['getStarted']}
            onBackPress={() => this.props.navigation.goBack()}
            onPressHome={() => this.props.navigation.popToTop()}
            progressIndex={1}
          />
          <ScrollView contentContainerStyle={styles.container}>
            <Pressable onPress={() => this.formRef.current.closeSelectBox(null)}
              style={{paddingBottom: this.state.containerPaddingBottom}}
            >
              <HeaderTitle
                headline="facilitatorList"
                subheading="pleaseFillInformationBelow"
              />

              <FacilitatorForm
                ref={this.formRef}
                facilitators={this.state.facilitators}
                selectedFacilitators={this.state.selectedFacilitators}
                onChangeFacilitator={this.onChangeFacilitator}
                updateContainerPadding={(value) => this.setState({ containerPaddingBottom: value })}
              />
            </Pressable>
          </ScrollView>

          { this.renderNextButton() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.whiteColor,
    padding: containerPadding,
    paddingTop: containerPaddingTop,
  },
  otherFacilitatorsLabel: {
    fontSize: 18,
    color: Color.lightBlackColor,
    marginTop: 40,
    textTransform: 'uppercase',
    marginBottom: -10,
  },
  buttonContainer: {
    padding: containerPadding
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Facilitator;
