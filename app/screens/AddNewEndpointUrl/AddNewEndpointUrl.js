import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import {LocalizationContext} from '../../components/Translations';
import AddNewEndpointUrlHeader from '../../components/AddNewEndpointUrl/AddNewEndpointUrlHeader';
import AddNewEndpointUrlMain from '../../components/AddNewEndpointUrl/AddNewEndpointUrlMain';
import { screenPaddingBottom } from '../../utils/component_util';

class AddNewEndpointUrl extends React.Component {
  static contextType = LocalizationContext

  state = {
    endpoint: {}
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: screenPaddingBottom(this.props.sdkVersion)}}>
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

function mapStateToProps(state) {
  return {
    sdkVersion: state.sdkVersion
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewEndpointUrl);