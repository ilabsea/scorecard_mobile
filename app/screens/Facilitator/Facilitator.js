import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableWithoutFeedback, Pressable} from 'react-native';
import realm from '../../db/schema';
import uuidv4 from '../../utils/uuidv4';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import SelectPicker from '../../components/SelectPicker';
import ProgressHeader from '../../components/ProgressHeader';
import BottomButton from '../../components/BottomButton';

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
      openIndex: null,
    };
    this.controllers = new Array(4);
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

  renderFacilitators = () => {
    const {translations} = this.context;
    let pickerzIndex = 9000;
    let itemIndex = 0;
    return Array(this.numberOfFacilitator)
      .fill()
      .map((_, index) => {
        itemIndex += 1;
        pickerzIndex -= 1000;

        return (
          <SelectPicker
            key={index}
            items={this.state.facilitators}
            selectedItem={this.getSelectedFacilitator(this.state.selectedFacilitators[index])}
            isRequire={index == 0 || index == 1}
            label={translations['facilitator']}
            placeholder={translations['selectFacilitator']}
            searchablePlaceholder={translations['searchForFacilitator']}
            zIndex={pickerzIndex}
            customContainerStyle={index == 0 ? {marginTop: 0} : {}}
            customLabelStyle={[{zIndex: pickerzIndex + 1}, index == 0 ? { marginTop: -10 } : {}]}
            showCustomArrow={true}
            onChangeItem={(text) => this.onChangeFacilitator(text, index)}
            itemIndex={itemIndex}
            mustHasDefaultValue={false}
            controller={(instance) => this.controllers[index] = instance}
            onOpen={() => this.closeSelectBox(index)}
            onClose={() => this.onDropdownClose(index)}
          />
        );
      });
  };

  onDropdownClose = (index) => {
    if (index == 2 || index == 3)
      this.setState({ openIndex: null });

    if (!this.state.openIndex)
      this.setState({ containerPaddingBottom: 0 });
  }

  saveSelectedData = () => {
    this.closeSelectBox(null);
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

  getSelectedFacilitator = (facilitator) => {
    return (facilitator != undefined && facilitator != null) ? facilitator.value : null
  }

  closeSelectBox = (exceptIndex) => {
    if (exceptIndex == 2 || exceptIndex == 3) {
      this.setState({
        openIndex: exceptIndex,
        containerPaddingBottom: 180,
      });
    }

    for (let i = 0; i < this.controllers.length; i++) {
      if (exceptIndex == i)
        continue;

      this.controllers[i].close();
    }
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.closeSelectBox(null)}>
        <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
          <ProgressHeader
            title={translations['getStarted']}
            onBackPress={() => this.props.navigation.goBack()}
            onPressHome={() => this.props.navigation.popToTop()}
            progressIndex={1}
          />
          <ScrollView contentContainerStyle={styles.container}>
            <Pressable onPress={() => this.closeSelectBox(null)}
              style={{paddingBottom: this.state.containerPaddingBottom}}
            >
              <HeaderTitle
                headline="facilitatorList"
                subheading="pleaseFillInformationBelow"
              />

              { this.renderFacilitators() }
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
