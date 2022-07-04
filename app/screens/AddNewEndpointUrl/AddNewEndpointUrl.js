import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import AddNewEndpointUrlHeader from '../../components/AddNewEndpointUrl/AddNewEndpointUrlHeader';
import AddNewEndpointUrlMain from '../../components/AddNewEndpointUrl/AddNewEndpointUrlMain';

class AddNewEndpointUrl extends React.Component {
  static contextType = LocalizationContext

  state = {
    endpoint: {}
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <AddNewEndpointUrlHeader endpoint={this.state.endpoint} />
          <AddNewEndpointUrlMain
            endpoint={this.state.endpoint}
            updateEndpoint={(endpoint) => this.setState({ endpoint })}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AddNewEndpointUrl;