import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { getDeviceStyle } from '../../utils/responsive_util';

class RaisingProposedScrollView extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 28}}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <View style={[{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10, marginTop: 10},
          getDeviceStyle({}, { justifyContent: 'center' })]}
        >
          { this.props.children }
        </View>
      </ScrollView>
    )
  }
}

export default RaisingProposedScrollView;