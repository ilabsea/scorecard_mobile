import React, { Component } from 'react';
import { LocalizationContext } from '../Translations';
import FilterOption from './FilterOption';
import { scorecardStatuses, scorecardTypes } from '../../constants/scorecard_constant';

let _this = null;

class FilterScorecardStatusAndTypeOptions extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <FilterOption options={scorecardStatuses} title={translations.status}
          selectedItems={this.props.selectedStatuses}
          onSelectItem={(value) => this.props.onSelectItem({selectedStatuses: _this.props.getSelectedItem(_this.props.selectedStatuses, value)})}
        />
        <FilterOption options={scorecardTypes} title={translations.scorecardType}
          selectedItems={this.props.selectedTypes}
          onSelectItem={(value) => this.props.onSelectItem({selectedTypes: _this.props.getSelectedItem(_this.props.selectedTypes, value)})}
          containerStyle={{ marginTop: 20 }}
        />
      </React.Fragment>
    )
  }
}

export default FilterScorecardStatusAndTypeOptions;