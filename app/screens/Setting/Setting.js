import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import SettingBodyContent from '../../components/Setting/SettingBodyContent';
import NavigationHeader from '../../components/NavigationHeader';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import internetConnectionService from '../../services/internet_connection_service';

class Setting extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      hasInternetConnection: false
    };

    this.unsubscribeNetInfo;
    this.componentIsUnmount = false;
    this.formModalRef = React.createRef();
    this.formRef =  React.createRef();
    this.bodyRef = React.createRef();
  }

  componentDidMount() {
    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
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
           />
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.onTouchWithoutFeedback()}>
        <View style={{flex: 1}}>
          <NavigationHeader title={translations.setting} onBackPress={() => this.props.navigation.goBack()} />

          { this.renderBodyContent() }

          <FormBottomSheetModal ref={this.formRef} formModalRef={this.formModalRef} snapPoints={['56%']} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Setting;