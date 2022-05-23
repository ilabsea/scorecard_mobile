import React from 'react';
import { View, ScrollView } from 'react-native';

import EndpointUrlCard from './EndpointUrlCard';

import { containerPadding } from '../../utils/responsive_util';
import uuidv4 from '../../utils/uuidv4';

class EndpointUrlListBody extends React.Component {
  renderCardList() {
    const endpoints = [
      { label: 'ISAF production server', value: 'https://isaf.digital-csc.org', email: 'kimsan@gmail.com', password: '123456', shortcut: 'prod', shortcut_color: 'green' },
      { label: 'ISAF testing server', value: 'https://isaf-stg.digital-csc.org', email: 'lngo@gmail.com', password: '123456', shortcut: 'testing', shortcut_color: 'orange' },
    ];

    return endpoints.map(endpoint => {
      return <EndpointUrlCard
               key={uuidv4()}
               endpoint={endpoint}
             />
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, padding: containerPadding}}>
        { this.renderCardList() }
      </ScrollView>
    )
  }
}

export default EndpointUrlListBody;