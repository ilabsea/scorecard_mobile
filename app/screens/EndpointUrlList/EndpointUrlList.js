import React from 'react';
import { View } from 'react-native';

import EndpointUrlListHeader from '../../components/EndpointUrlList/EndpointUrlListHeader';
import EndpointUrlListBody from '../../components/EndpointUrlList/EndpointUrlListBody';
// import EndpointUrlListFooter from '../../components/EndpointUrlList/EndpointUrlListFooter';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import { settingEndpointModalSnapPoints } from '../../constants/modal_constant';
import EndpointUrl from '../../models/EndpointUrl'
import settingHelper from '../../helpers/setting_helper';

class EndpointUrlList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEndpoint: '',
      // currentSelectedEndpoint: '',
      endpointUrls: [],
    }

    this.formModalRef = React.createRef();
    this.formRef =  React.createRef();
  }

  async loadEndpointUrls() {
    this.setState({
      endpointUrls: EndpointUrl.getAll(),
      selectedEndpoint: await settingHelper.getSavedEndpointUrl(),
      // currentSelectedEndpoint: savedEndpointUrl,
    });
  }

  renderHeader() {
    return <EndpointUrlListHeader formRef={this.formRef} formModalRef={this.formModalRef}
              selectedEndpoint={this.state.selectedEndpoint}
              loadEndpointUrls={() => this.loadEndpointUrls()}
           />
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        { this.renderHeader() }
        <EndpointUrlListBody formRef={this.formRef} formModalRef={this.formModalRef} />
        {/* <EndpointUrlListFooter/> */}

        <FormBottomSheetModal ref={this.formRef} formModalRef={this.formModalRef} snapPoints={settingEndpointModalSnapPoints} />
      </View>
    )
  }
}

export default EndpointUrlList;