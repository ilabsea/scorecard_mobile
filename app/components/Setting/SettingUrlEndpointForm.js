import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import SettingUrlEndpointDeleteButton from './SettingUrlEndpointDeleteButton';
import { SettingUrlEndpointTitle, SettingUrlEndpointFormWarningMessage } from './SettingUrlEndpointFormLabel';

import endpointFormService from '../../services/endpoint_form_service';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';
import { settingEndpointContentHeight } from '../../constants/modal_constant';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import EndpointUrl from '../../models/EndpointUrl';

class SettingUrlEndpointForm extends React.Component {
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
      isAllowToDeleteOrEdit: props.editEndpoint ? endpointFormService.isAllowToDeleteOrEdit(props.editEndpoint, props.selectedEndpoint, props.savedEndpoint) : true
    }
    this.scrollViewRef = React.createRef();
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = endpointFormService.getErrorMessage(fieldName, value, this.props.editEndpoint);

    this.setState(state, () => {
      this.setState({ isFormValid: endpointFormService.isValidForm(this.state.endpointLabel, this.state.endpointValue, this.props.editEndpoint) })
    });
  }

  saveEndpoint() {
    endpointFormService.saveEndpointUrls(this.state.endpointLabel, this.state.endpointValue, this.state.endpointUuid);
    this.props.saveNewEndpoint(this.state.endpointValue);
    this.clearData();
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

  onEndpointValueFocused() {
    this.setState({ isEndpointValueFocused: true }, () => {
      setTimeout(() => {
        const scrollPosition = getDeviceStyle(70, 70);
        this.scrollViewRef.scrollTo({ y: scrollPosition, animated: true })
      }, 50);
    });
  }

  renderFormInputs() {
    const { translations } = this.context;

    return (
      <ScrollView ref={ref => this.scrollViewRef = ref}
        contentContainerStyle={{paddingHorizontal: containerPadding, paddingTop: 4, paddingBottom: this.state.isEndpointValueFocused  ? 150 : 0}}>
        <TextFieldInput
          value={this.state.endpointLabel}
          label={this.context.translations.serverLabel}
          placeholder={this.context.translations.enterServerLabel}
          fieldName={ENDPOINT_LABEL_FIELDNAME}
          isRequire={true}
          onChangeText={this.onChangeText}
          message={translations[this.state.endpointLabelErrorMsg]}
        />

        <TextFieldInput
          value={this.state.endpointValue}
          label={this.context.translations.serverUrl}
          placeholder={this.context.translations.enterServerUrl}
          fieldName={ENDPOINT_VALUE_FIELDNAME}
          isRequire={true}
          onChangeText={this.onChangeText}
          message={translations[this.state.endpointValueErrorMsg]}
          onFocus={() => this.onEndpointValueFocused()}
          onBlur={() => this.setState({ isEndpointValueFocused: false })}
        />

        { !!this.props.editEndpoint &&
          <SettingUrlEndpointDeleteButton editEndpoint={this.props.editEndpoint}
            isAllowToDeleteOrEdit={this.state.isAllowToDeleteOrEdit}
            selectedEndpoint={this.props.selectedEndpoint}
            endpointUuid={this.state.endpointUuid}
            reloadEndpoint={() => this.reloadEndpoint()}
          />
        }
      </ScrollView>
    )
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
        <SettingUrlEndpointTitle />

        { this.renderFormInputs() }

        { !this.state.isAllowToDeleteOrEdit && <SettingUrlEndpointFormWarningMessage/> }

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

export default SettingUrlEndpointForm;