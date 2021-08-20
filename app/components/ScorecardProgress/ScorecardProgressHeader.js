import React, {Component} from 'react';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import ScorecardProgressCircle from './ScorecardProgressCircle';

class ScorecardProgressHeader extends Component {
  static contextType = LocalizationContext;

  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={translations.scorecardDetail}
          rightComponent={() => <ScorecardProgressCircle progressIndex={this.props.progressIndex}/>}
          onBackPress={() => this._onPress()}
          rightButtonStyle={{marginRight: 6}}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardProgressHeader;