import React from 'react';
import { View, ScrollView } from 'react-native';

import EndpointUrlCard from './EndpointUrlCard';
import EndpointUrlListFooter from './EndpointUrlListFooter';

import { containerPadding } from '../../utils/responsive_util';
import uuidv4 from '../../utils/uuidv4';
import EndpointUrl from '../../models/EndpointUrl';

class EndpointUrlListBody extends React.Component {
  renderCardList() {
    const endpointUrls = EndpointUrl.getAll();

    console.log('all endpoint urls == ', endpointUrls)

    return endpointUrls.map(endpoint => {
      return <EndpointUrlCard
               key={uuidv4()}
               endpoint={endpoint}
             />
    })
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={{flexGrow: 1, padding: containerPadding}}>
          { this.renderCardList() }
        </ScrollView>
        <EndpointUrlListFooter/>
      </React.Fragment>
    )
  }
}

export default EndpointUrlListBody;