import React, {Component} from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import CriteriaSelectionItems from './CriteriaSelectionItems';

import { getDeviceStyle } from '../../utils/responsive_util';
import NoDataMessageTabletStyles from '../../styles/tablet/NoDataMessageComponentStyle';
import NoDataMessageMobileStyles from '../../styles/mobile/NoDataMessageComponentStyle';

const responsiveStyles = getDeviceStyle(NoDataMessageTabletStyles, NoDataMessageMobileStyles);

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

  renderEmptyMessage() {
    return (
      <Text style={[responsiveStyles.label, {textAlign: 'center', marginTop: 0}]}>
        { this.context.translations.noCustomIndicator }
      </Text>
    )
  }

  render() {
    return (
      this.props.indicators.length > 0
        ? this.renderInidcatorList()
        : this.renderEmptyMessage()
    )
  }
}

export default RaisingProposedCustomIndicatorList;