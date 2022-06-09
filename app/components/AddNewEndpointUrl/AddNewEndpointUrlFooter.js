import React from 'react';
import {LocalizationContext} from '../Translations';
import ActionButton from '../ActionButton';

class AddNewEndpointUrlFooter extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <React.Fragment>
        <ActionButton
          label={translations.save}
          onPress={() => this.props.save()}
          isDisabled={this.props.isLoading || !this.props.isValid || this.props.isLocked}
          customButtonStyle={{marginTop: 2}}
        />
      </React.Fragment>
    )
  }
}

export default AddNewEndpointUrlFooter;