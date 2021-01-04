import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../Translations';
import ErrorEndpointContent  from './ErrorEndpointContent';
import ErrorAuthenticationContent from './ErrorAuthenticationContent';
import ErrorScorecardContent from './ErrorScorecardContent';

const errorEndpoint = 0;
const errorAuthentication = 1;
const errorScorecard = 2;

class ErrorMessageModal extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      backendUrl: '',
    };
  }

  async componentDidMount() {
    const setting = await AsyncStorage.getItem('SETTING');
    this.setState({
      backendUrl: JSON.parse(setting).backendUrl,
    });
  }

  _renderContent = () => {
    if (this.props.errorType === errorAuthentication)
      return <ErrorAuthenticationContent backendUrl={this.state.backendUrl} onDismiss={this.props.onDismiss} />
    else if (this.props.errorType === errorEndpoint)
      return <ErrorEndpointContent backendUrl={this.state.backendUrl} onDismiss={this.props.onDismiss} />;

    return <ErrorScorecardContent onDismiss={this.props.onDismiss} />
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.props.onDismiss} contentContainerStyle={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {this._renderContent()}
          </TouchableWithoutFeedback>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    width: '60%',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
});

export default ErrorMessageModal;