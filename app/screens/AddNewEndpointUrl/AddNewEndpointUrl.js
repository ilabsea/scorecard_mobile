import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import AddNewEndpointUrlHeader from '../../components/AddNewEndpointUrl/AddNewEndpointUrlHeader';
import AddNewEndpointUrlBody from '../../components/AddNewEndpointUrl/AddNewEndpointUrlBody';

class AddNewEndpointUrl extends React.Component {
  static contextType = LocalizationContext

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <AddNewEndpointUrlHeader/>
          <AddNewEndpointUrlBody/>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AddNewEndpointUrl;