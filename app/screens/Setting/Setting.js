import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import SettingBodyContent from '../../components/Setting/SettingBodyContent';
import NavigationHeader from '../../components/NavigationHeader';
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

    this.focusListener = this.props.navigation.addListener("focus", async () => {
      // const selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);
      // this.setState({ hasSelectedFilter: selectedFilters });
    });

    // Redirect back to home screen and clear unsaved data when the user uses the android back button
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.componentIsUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
    this.focusListener && this.focusListener();
    this.backHandler.remove();
  }

  // loadEndpointUrls() {
  //   this.setState({
  //     backendUrl: this.props.backendUrl,
  //   });
  // }

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
    this.setState({ proposedIndicatorMethod: await settingHelper.getSelectedProposedIndicatorMethodName() });
    this.formRef.current?.setBodyContent(null)
  }

  goBack() {
    settingHelper.clearTempSettingData();
    this.props.navigation.goBack();
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <NavigationHeader title={translations.setting} onBackPress={() => this.goBack()} />

          { this.renderBodyContent() }

          <FormBottomSheetModal ref={this.formRef} formModalRef={this.formModalRef} snapPoints={[]} onDismissModal={() => this.onDismissModal()} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Setting;