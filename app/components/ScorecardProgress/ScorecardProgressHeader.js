import React, {Component} from 'react';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import ScorecardProgressCircle from './ScorecardProgressCircle';
import ScorecardProgressShareButton from './ScorecardProgressShareButton';
import { navigateBack } from '../../utils/navigation_util';

class ScorecardProgressHeader extends Component {
  static contextType = LocalizationContext;

  renderRightComponent() {
    return this.props.scorecard.isUploaded
      ? <ScorecardProgressShareButton scorecard={this.props.scorecard} updateLoadingStatus={this.props.updateLoadingStatus}
          updateErrorMessageModal={this.props.updateErrorMessageModal}
          hasMatchedEndpointUrl={this.props.hasMatchedEndpointUrl}
          isSyncing={this.props.isSyncing}
        />
      : <ScorecardProgressCircle scorecardUuid={this.props.scorecard.uuid} />;
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={translations.scorecardDetail}
          rightComponent={() => this.renderRightComponent()}
          onBackPress={() => navigateBack()}
          rightButtonStyle={{marginRight: 6}}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardProgressHeader;