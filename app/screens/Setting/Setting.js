import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard, BackHandler, Text } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import SettingHeader from '../../components/Setting/SettingHeader';
import SettingMain from '../../components/Setting/SettingMain';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import internetConnectionService from '../../services/internet_connection_service';
import settingHelper from '../../helpers/setting_helper';
import { INDICATOR_BASE } from '../../constants/scorecard_constant';

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
    this.setState({ proposedIndicatorMethod: await settingHelper.getSelectedProposedIndicatorMethodName() });

    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      if (!this.componentIsUnmount)
        this.setState({ hasInternetConnection: hasConnection });
    });

    // Redirect back to home screen and clear unsaved data when the user uses the android back button
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      settingHelper.clearTempSettingData();
      this.props.navigation.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.componentIsUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
    this.backHandler.remove();
  }

  renderBodyContent() {
    return <SettingMain
              ref={this.bodyRef}
              formRef={this.formRef}
              formModalRef={this.formModalRef}
              hasInternetConnection={this.state.hasInternetConnection}
              proposedIndicatorMethod={this.state.proposedIndicatorMethod}
              navigation={this.props.navigation}
           />
  }

  async onDismissModal() {
    this.setState({ proposedIndicatorMethod: await settingHelper.getSelectedProposedIndicatorMethodName() });
    this.formRef.current?.setBodyContent(null)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <SettingHeader/>

          { this.renderBodyContent() }

          <FormBottomSheetModal ref={this.formRef} formModalRef={this.formModalRef} snapPoints={[]} onDismissModal={() => this.onDismissModal()} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Setting;