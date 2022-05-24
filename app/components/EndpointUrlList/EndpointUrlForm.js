import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import { EndpointUrlTitle, EndpointUrlFormWarningMessage } from './EndpointUrlFormLabel';
import EndpointFormTextInputs from './EndpointFormTextInputs';

import endpointFormService from '../../services/endpoint_form_service';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';
import { settingEndpointContentHeight } from '../../constants/modal_constant';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import EndpointUrl from '../../models/EndpointUrl';

class EndpointUrlForm extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      endpointLabel: props.editEndpoint ? props.editEndpoint.label : '',
      endpointValue: props.editEndpoint ? props.editEndpoint.value : 'https://',
      endpointUuid: props.editEndpoint ? EndpointUrl.findByUrlValue(props.editEndpoint.value).uuid : '',
      endpointLabelErrorMsg: '',
      endpointValueErrorMsg: '',
      isFormValid: props.editEndpoint ? true : false,
      isEndpointValueFocused: false,
      isAllowToDeleteOrEdit: props.editEndpoint ? endpointFormService.isAllowToDeleteOrEdit(props.editEndpoint, props.selectedEndpoint, props.savedEndpoint) : true,
      email: '',
      password: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    }
    this.scrollViewRef = React.createRef();
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;

    if (fieldName != 'email' && fieldName != 'password')
      state[`${fieldName}ErrorMsg`] = endpointFormService.getErrorMessage(fieldName, value, this.props.editEndpoint);

    this.setState(state, () => {
      this.setState({ isFormValid: endpointFormService.isValidForm(this.state.endpointLabel, this.state.endpointValue, this.state.email, this.state.password) })
      // this.setState({ isFormValid: endpointFormService.isValidForm(this.state.endpointLabel, this.state.endpointValue, this.props.editEndpoint) })
    });
  }

  saveEndpoint() {
    const data = {
      label: this.state.endpointLabel,
      value: this.state.endpointValue,
    }
    console.log('endpoint data = ', data);

    // endpointFormService.saveEndpointUrls(this.state.endpointLabel, this.state.endpointValue, this.state.endpointUuid);
    // this.props.saveNewEndpoint(this.state.endpointValue);
    // this.clearData();
  }

  clearData() {
    const fieldNames = [ ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME ];
    fieldNames.map(fieldName => {
      let state = {};
      state[fieldName] = fieldName === ENDPOINT_VALUE_FIELDNAME ? 'https://' : '';
      state[`${fieldName}ErrorMsg`] = '';
      this.setState(state);
    });
  }

  renderFormInputs() {
    return <EndpointFormTextInputs
              endpointLabel={this.state.endpointLabel}
              endpointValue={this.state.endpointValue}
              endpointLabelErrorMsg={this.state.endpointLabelErrorMsg}
              endpointValueErrorMsg={this.state.endpointValueErrorMsg}
              email={this.state.email}
              password={this.state.password}
              onChangeText={this.onChangeText}
           />
  }

  reloadEndpoint() {
    this.setState({
      endpointLabel: '',
      endpointValue: 'https://',
      endpointUuid: '',
    });
    this.props.reloadEndpoint();
  }

  renderForm() {
    const { translations } = this.context;
    return (
      <View style={{ height: hp(settingEndpointContentHeight)}}>
        <BottomSheetModalTitle title={ !!this.props.editEndpoint ? this.context.translations.editServerUrl : this.context.translations.addNewServerURL } />
        <EndpointUrlTitle />

        { this.renderFormInputs() }

        { !this.state.isAllowToDeleteOrEdit && <EndpointUrlFormWarningMessage/> }

        <FormBottomSheetButton label={this.props.editEndpoint ? translations.saveAndChange : translations.save}
          isValid={this.state.isAllowToDeleteOrEdit && this.state.isFormValid}
          save={() => this.saveEndpoint()}
          wrapperStyle={{marginTop: 0, paddingTop: 10}}
        />
      </View>
    )
  }

  render() {
    return this.renderForm()
  }
}

export default EndpointUrlForm;