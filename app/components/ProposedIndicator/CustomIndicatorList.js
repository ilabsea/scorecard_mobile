import React, {Component} from 'react';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorScrollView from './ProposedIndicatorScrollView';
import IndicatorSelectionItems from './IndicatorSelectionItems';
import EmptyIndiatorList from './EmptyIndicatorList';
class CustomIndicatorList extends Component {
  static contextType = LocalizationContext;

  renderInidcatorList() {
    return (
      <ProposedIndicatorScrollView>
        <IndicatorSelectionItems
          indicators={this.props.indicators}
          isSearching={this.props.isSearching}
          isEdit={true}
          scorecardUuid={this.props.scorecardUuid}
          selectForEdit={(indicator) => this.props.selectForEdit(indicator)}
          updateIndicatorList={() => this.props.updateIndicatorList()}
          formModalRef={this.props.formModalRef}
          participantModalRef={this.props.participantModalRef}
        />
      </ProposedIndicatorScrollView>
    )
  }

  render() {
    return (
      this.props.indicators.length > 0
        ? this.renderInidcatorList()
        : <EmptyIndiatorList />
    )
  }
}

export default CustomIndicatorList;