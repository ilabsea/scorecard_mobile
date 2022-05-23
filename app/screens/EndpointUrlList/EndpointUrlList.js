import React from 'react';
import { View } from 'react-native';

import EndpointUrlListHeader from '../../components/EndpointUrlList/EndpointUrlListHeader';
import EndpointUrlListBody from '../../components/EndpointUrlList/EndpointUrlListBody';
import EndpointUrlListFooter from '../../components/EndpointUrlList/EndpointUrlListFooter';

class EndpointUrlList extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <EndpointUrlListHeader/>
        <EndpointUrlListBody/>
        <EndpointUrlListFooter/>
      </View>
    )
  }
}

export default EndpointUrlList;