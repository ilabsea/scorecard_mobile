import React from 'react';

import InputBox from '../Share/InputBox';
import { navigate } from '../../navigators/app_navigator';

class EndpointUrlPicker extends React.Component {

  render() {
    return (
      <InputBox
        title="Server URL"
        isRequire={true}
        label="ISAF Production Server"
        subLabel="kimsan@gmail.com@https://isaf.digital-csc.org"
        showSubLabel={true}
        onPress={() => navigate('EndpointUrlList')}
      />
    )
  }
}

export default EndpointUrlPicker;