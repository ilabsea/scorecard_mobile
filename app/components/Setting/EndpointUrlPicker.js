import React from 'react';

import InputBox from '../Share/InputBox';

class EndpointUrlPicker extends React.Component {

  render() {
    return (
      <InputBox
        title="Server URL"
        isRequire={true}
        label="ISAF Production Server"
        subLabel="kimsan@gmail.com@https://isaf.digital-csc.org"
        showSubLabel={true}
        // onPress={redirect to endpoint list sreen}
      />
    )
  }
}

export default EndpointUrlPicker;