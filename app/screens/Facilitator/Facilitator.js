import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableWithoutFeedback, Pressable, KeyboardAvoidingView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import ProgressHeader from '../../components/Share/ProgressHeader';
import BottomButton from '../../components/BottomButton';
import FacilitatorForm from '../../components/Facilitator/FacilitatorForm';
import FacilitatorReloadButton from '../../components/Facilitator/FacilitatorReloadButton';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import ErrorAlertMessage from '../../components/Share/ErrorAlertMessage';

import Caf from '../../models/Caf';
import facilitatorService from '../../services/facilitator_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import { environment } from '../../config/environment';
import Color from '../../themes/color';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import { facilitatorPickerSnapPoints } from '../../constants/modal_constant';

class FacilitatorScreen extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      facilitators: [],
      selectedFacilitators: Array.from({length: environment.numberOfFacilitators}, () => null),
      isError: true,
      containerPaddingBottom: 0,
      isLoading: false,
      modalVisible: false,
      errorType: null,
      bottomSheetModalIndex: -1
    };

    this.formRef = React.createRef();
    this.pickerRef = React.createRef();
    this.pickerModalRef = React.createRef();
  }

  componentDidMount() {
    this.loadFacilitators();
  }

  loadFacilitators() {
    let cafs = Caf.findByLngoId(this.props.route.params.local_ngo_id);
    cafs = !!cafs && JSON.parse(JSON.stringify(cafs)).sort((a, b) => a.name > b.name);

    this.setState({facilitators: cafs.map((caf) => ({ label: caf.name, value: caf.id.toString(), disabled: false}))});

    facilitatorService.loadSavedFacilitators(this.props.route.params.scorecard_uuid, this.state.selectedFacilitators, (selectedFacilitators) => {
      this.setState({
        selectedFacilitators: selectedFacilitators,
        isError: selectedFacilitators[0] === null || selectedFacilitators[1] === null,
      }, () => {
        this.updateFacilitators();
      });
    });
  }

  onChangeFacilitator = (facilitator, facilitatorIndex) => {
    let selectedFacilitators = this.state.selectedFacilitators;
    selectedFacilitators[facilitatorIndex] = facilitator;
    this.setState({
      selectedFacilitators: selectedFacilitators,
      isError: selectedFacilitators[0] === null || selectedFacilitators[1] === null
    });
    this.updateFacilitators();
    this.pickerModalRef.current?.dismiss();
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
    facilitatorService.saveSelectedFacilitators(this.state.selectedFacilitators, this.props.route.params.scorecard_uuid);
    scorecardTracingStepsService.trace(this.props.route.params.scorecard_uuid, 3);
    this.props.navigation.navigate('OfflineParticipantList', {scorecard_uuid: this.props.route.params.scorecard_uuid});
  };

  renderNextButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton disabled={this.state.isError} label={translations.next} onPress={() => this.saveSelectedData()} />
      </View>
    );
  };

  renderErrorMessageModal() {
    return (
      <ErrorAlertMessage
        visible={this.state.modalVisible}
        errorType={'ERROR_SOMETHING_WENT_WRONG'}
        scorecardUuid={this.props.route.params.scorecard_uuid}
        onDismiss={() => this.setState({ modalVisible: false })}
      />
    )
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback>
        <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
          <ProgressHeader
            title={translations['getStarted']}
            progressIndex={1}
            rightButton={
              <FacilitatorReloadButton localNgoId={this.props.route.params.local_ngo_id}
                reloadFacilitators={() => this.loadFacilitators()}
                updateLoadingStatus={(status) => this.setState({ isLoading: status })}
                showErrorMessage={(errorType) => this.setState({ modalVisible: true, errorType })}
              />
            }
          />
          <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
              <Spinner
                visible={this.state.isLoading}
                color={Color.primaryColor}
                overlayColor={Color.loadingBackgroundColor}
              />

              <Pressable style={{paddingBottom: this.state.containerPaddingBottom}}>
                <HeaderTitle
                  headline="facilitatorList"
                  subheading="pleaseChooseTheFacilitators"
                />

                <FacilitatorForm
                  ref={this.formRef}
                  pickerRef={this.pickerRef}
                  pickerModalRef={this.pickerModalRef}
                  facilitators={this.state.facilitators}
                  selectedFacilitators={this.state.selectedFacilitators}
                  onChangeFacilitator={this.onChangeFacilitator}
                  updateContainerPadding={(value) => this.setState({ containerPaddingBottom: value })}
                  bottomSheetModalIndex={this.state.bottomSheetModalIndex}
                />
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>

          { this.renderNextButton() }

          { this.renderErrorMessageModal() }

          <FormBottomSheetModal ref={this.pickerRef} formModalRef={this.pickerModalRef} snapPoints={facilitatorPickerSnapPoints} onDismissModal={() => this.pickerRef.current?.setBodyContent(null)}
            onChange={(index) => this.setState({ bottomSheetModalIndex: index })}
          />
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

export default FacilitatorScreen;