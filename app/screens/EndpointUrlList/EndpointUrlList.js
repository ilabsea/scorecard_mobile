import React from 'react';
import { View, Text } from 'react-native';

import EndpointUrlListHeader from '../../components/EndpointUrlList/EndpointUrlListHeader';

class EndpointUrlList extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <EndpointUrlListHeader/>

        <Text>Endpont URL list</Text>
      </View>
    )
  }
}

export default EndpointUrlList;