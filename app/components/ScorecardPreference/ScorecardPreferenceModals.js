import React, { Component } from 'react';
import {LocalizationContext} from '../../components/Translations';
import ErrorAlertMessage from '../Share/ErrorAlertMessage';
import BoldLabel from '../Share/BoldLabel';

class ScorecardPreferenceModals extends Component {
  static contextType = LocalizationContext;

  boldLabel(label) {
    return <BoldLabel label={label} />
  }

  render() {
    return (
      <React.Fragment>
        <ErrorAlertMessage
          visible={this.props.visibleModal}
          errorType={this.props.errorType}
          scorecardUuid={this.props.scorecardUuid}
          onDismiss={() => this.props.onDismissModal('error_modal')}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardPreferenceModals;