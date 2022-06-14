import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import AddNewEndpointUrlHeader from '../../components/AddNewEndpointUrl/AddNewEndpointUrlHeader';
import AddNewEndpointUrlMain from '../../components/AddNewEndpointUrl/AddNewEndpointUrlMain';

class AddNewEndpointUrl extends React.Component {
  static contextType = LocalizationContext

  constructor(props) {
    super(props);
    this.bodyRef = React.createRef();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <AddNewEndpointUrlHeader bodyRef={this.bodyRef} />
          <AddNewEndpointUrlMain ref={this.bodyRef} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AddNewEndpointUrl;