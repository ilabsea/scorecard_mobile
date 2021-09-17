import React, {Component} from 'react';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import ScorecardProgressCircle from './ScorecardProgressCircle';
import ScorecardProgressShareButton from './ScorecardProgressShareButton';

class ScorecardProgressHeader extends Component {
  static contextType = LocalizationContext;

  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  renderRightComponent() {
    return this.props.scorecard.isUploaded ? <ScorecardProgressShareButton scorecardUuid={this.props.scorecard.uuid} /> : <ScorecardProgressCircle scorecard={this.props.scorecard}/>;
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={translations.scorecardDetail}
          rightComponent={() => this.renderRightComponent()}
          onBackPress={() => this._onPress()}
          rightButtonStyle={{marginRight: 6}}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardProgressHeader;