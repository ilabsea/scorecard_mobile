import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import SettingBodyContent from '../../components/Setting/SettingBodyContent';
import NavigationHeader from '../../components/NavigationHeader';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import { getProposedIndicatorMethod } from '../../utils/proposed_indicator_util';
import internetConnectionService from '../../services/internet_connection_service';
import { settingModalSnapPoints } from '../../constants/modal_constant';
import { INDICATOR_BASE } from '../../constants/main_constant';


class Setting extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      hasInternetConnection: false,
      proposedIndicatorMethod: INDICATOR_BASE,
    };

    this.unsubscribeNetInfo;
    this.componentIsUnmount = false;
    this.formModalRef = React.createRef();
    this.formRef =  React.createRef();
    this.bodyRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ proposedIndicatorMethod: await getProposedIndicatorMethod() });

    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      if (!this.componentIsUnmount)
        this.setState({ hasInternetConnection: hasConnection });
    });
  }

  componentWillUnmount() {
    this.componentIsUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  onTouchWithoutFeedback = () => {
    Keyboard.dismiss();
    this.bodyRef.current?.settingFormRef.current?.closeDropDown();
  }

  renderBodyContent() {
    return <SettingBodyContent
              ref={this.bodyRef}
              formRef={this.formRef}
              formModalRef={this.formModalRef}
              hasInternetConnection={this.state.hasInternetConnection}
              proposedIndicatorMethod={this.state.proposedIndicatorMethod}
              backendUrl={this.props.route.params.backend_url}
           />
  }

  async onDismissModal() {
    this.setState({ proposedIndicatorMethod: await getProposedIndicatorMethod() });
    this.formRef.current?.setBodyContent(null)
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.onTouchWithoutFeedback()}>
        <View style={{flex: 1}}>
          <NavigationHeader title={translations.setting} onBackPress={() => this.props.navigation.goBack()} />

          { this.renderBodyContent() }

          <FormBottomSheetModal ref={this.formRef} formModalRef={this.formModalRef} snapPoints={settingModalSnapPoints} onDismissModal={() => this.onDismissModal()} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Setting;