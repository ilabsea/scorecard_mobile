import React from 'react';
import { View } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import { EndpointUrlTitle, EndpointUrlFormWarningMessage } from './EndpointUrlFormLabel';
import EndpointFormTextInputs from './EndpointFormTextInputs';

import endpointFormService from '../../services/endpoint_form_service';
import { settingEndpointContentHeight } from '../../constants/modal_constant';
import EndpointUrl from '../../models/EndpointUrl';

class EndpointUrlForm extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: props.editEndpoint ? true : false,
      // isAllowToDeleteOrEdit: props.editEndpoint ? endpointFormService.isAllowToDeleteOrEdit(props.editEndpoint, props.selectedEndpoint, props.savedEndpoint) : true,
    }
    this.scrollViewRef = React.createRef();
    this.inputFormRef = React.createRef();
  }

  saveEndpoint() {
    const data = {
      label: this.state.endpointLabel,
      value: this.state.endpointValue,
    }
    console.log('endpoint data = ', data);

    // endpointFormService.saveEndpointUrls(this.state.endpointLabel, this.state.endpointValue, this.state.endpointUuid);
    // this.props.saveNewEndpoint(this.state.endpointValue);
  }

  validateForm() {
    const {endpointLabel, endpointValue, email, password} = this.inputFormRef.current?.state;
    this.setState({ isFormValid: endpointFormService.isValidForm(endpointLabel, endpointValue, email, password) })
  }

  renderFormInputs() {
    return <EndpointFormTextInputs
              ref={this.inputFormRef}
              editEndpoint={this.props.editEndpoint}
              validateForm={() => this.validateForm()}
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

        {/* { !this.state.isAllowToDeleteOrEdit && <EndpointUrlFormWarningMessage/> } */}

        <FormBottomSheetButton label={this.props.editEndpoint ? translations.saveAndChange : translations.save}
          // isValid={this.state.isAllowToDeleteOrEdit && this.state.isFormValid}
          isValid={this.state.isFormValid}
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