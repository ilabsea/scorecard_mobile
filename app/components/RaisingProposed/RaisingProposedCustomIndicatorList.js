import React, {Component} from 'react';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import CriteriaSelectionItems from './CriteriaSelectionItems';
import NoIndicatorMessage from './NoIndicatorMessage';

let _this = null;
class RaisingProposedCustomIndicatorList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    _this = this;
  }

  selectIndicator(index) {
    const indicator = _this.props.indicators[index];
    _this.props.editCustomIndicator(indicator);
  }

  renderInidcatorList() {
    return (
      <RaisingProposedScrollView>
        <CriteriaSelectionItems
          indicators={this.props.indicators}
          selectedIndicators={this.props.selectedCustomIndicator ? [this.props.selectedCustomIndicator] : []}
          isSearching={this.props.isSearching}
          isEdit={true}
          scorecardUuid={this.props.scorecardUuid}
          selectIndicator={this.selectIndicator}
        />
      </RaisingProposedScrollView>
    )
  }

  render() {
    return (
      this.props.indicators.length > 0
        ? this.renderInidcatorList()
        : <NoIndicatorMessage />
    )
  }
}

export default RaisingProposedCustomIndicatorList;