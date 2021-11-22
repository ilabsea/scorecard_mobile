import React, {Component} from 'react';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import ScorecardProgressCircle from './ScorecardProgressCircle';
import ScorecardProgressShareButton from './ScorecardProgressShareButton';
import { navigationRef } from '../../navigators/app_navigator';

class ScorecardProgressHeader extends Component {
  static contextType = LocalizationContext;

  _onPress() {
    if (navigationRef.current?.canGoBack())
      navigationRef.current?.goBack();
    else
      navigationRef.current?.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  renderRightComponent() {
    return this.props.scorecard.isUploaded
      ? <ScorecardProgressShareButton scorecardUuid={this.props.scorecard.uuid} updateLoadingStatus={this.props.updateLoadingStatus}
          updateErrorMessageModal={this.props.updateErrorMessageModal} />
      : <ScorecardProgressCircle scorecard={this.props.scorecard}/>;
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