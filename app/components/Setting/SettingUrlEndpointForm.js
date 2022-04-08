import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import styles from '../../themes/modalStyle';
import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import endpointFormService from '../../services/endpoint_form_service';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';
import { settingEndpointContentHeight } from '../../constants/modal_constant';
import { bodyFontSize } from '../../utils/font_size_util';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';

class SettingUrlEndpointForm extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);
    this.state = {
      endpointLabel: '',
      endpointValue: 'https://',
      endpointLabelErrorMsg: '',
      endpointValueErrorMsg: '',
      isFormValid: false,
      isEndpointValueFocused: false
    }
    this.scrollViewRef = React.createRef();
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = endpointFormService.getErrorMessage(fieldName, value, this.props.endpointUrls);

    this.setState(state, () => {
      this.setState({ isFormValid: endpointFormService.isValidForm(this.state.endpointLabel, this.state.endpointValue, this.props.endpointUrls) })
    });
  }

  saveEndpoint() {
    endpointFormService.saveEndpointUrls(this.state.endpointLabel, this.state.endpointValue);
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
          label={this.context.translations.endpointLabel}
          placeholder={this.context.translations.enterEndpointLabel}
          fieldName={ENDPOINT_LABEL_FIELDNAME}
          onChangeText={this.onChangeText}
          message={translations[this.state.endpointLabelErrorMsg]}
        />

        <TextFieldInput
          value={this.state.endpointValue}
          label={this.context.translations.UrlEndpoint}
          placeholder={this.context.translations.enterUrlEndpoint}
          fieldName={ENDPOINT_VALUE_FIELDNAME}
          onChangeText={this.onChangeText}
          message={translations[this.state.endpointValueErrorMsg]}
          onFocus={() => this.onEndpointValueFocused()}
          onBlur={() => this.setState({ isEndpointValueFocused: false })}
        />
      </ScrollView>
    )
  }

  renderForm() {
    return (
      <View style={{ height: hp(settingEndpointContentHeight)}}>
        <BottomSheetModalTitle title={ this.context.translations.addNewUrlEndpoint } />
        <View style={{ padding: containerPadding, paddingBottom: 0}}>
          <Text style={[styles.title, { marginBottom: 20, fontSize: bodyFontSize() }]}>{ this.context.translations.pleaseEnterInformationBelow }</Text>
        </View>

        { this.renderFormInputs() }

        <FormBottomSheetButton isValid={this.state.isFormValid} save={() => this.saveEndpoint()} />
      </View>
    )
  }

  render() {
    return this.renderForm()
  }
}

export default SettingUrlEndpointForm;