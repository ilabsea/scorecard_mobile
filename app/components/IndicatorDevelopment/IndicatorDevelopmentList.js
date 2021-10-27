import React, { Component } from 'react';
import DraggableFlatList from "react-native-draggable-flatlist";

import SelectedCriteriaItem from './SelectedCriteriaItem';
import IndicatorDevelopmentTooltip from './IndicatorDevelopmentTooltip';
import { isShortScreenDevice } from '../../utils/responsive_util';

let _this = null;
class IndicatorDevelopmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCriterias: props.selectedCriterias,
      isTooltipVisible: false
    }
    this.isComponentUnmounted = false;
    _this = this;
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  componentDidUpdate(prevProps) {
    if (!this.isComponentUnmounted && prevProps.selectedCriterias.length != this.props.selectedCriterias.length)
      this.setState({ selectedCriterias: this.props.selectedCriterias })
  }

  renderItem(params, isTooltipVisible) {
    const {item, index, drag, isActive} = params;
    const selectedCriteriaItem = (
      <SelectedCriteriaItem criteria={item} key={index}
        isDraggable={true}
        onLongPress={drag}
        isActive={isActive}
      />
    )

    if ((index <= 2 && !isShortScreenDevice()) || (index <= 1 && isShortScreenDevice()))
      return (
        <IndicatorDevelopmentTooltip index={index} isTooltipVisible={isTooltipVisible}
          updateTooltipStatus={(status) => _this.setState({isTooltipVisible: status})}
        >
          {selectedCriteriaItem}
        </IndicatorDevelopmentTooltip>
      );
    
    return selectedCriteriaItem;
  }

  updateCriteriasOrder(data) {
    this.setState({ selectedCriterias: data });
    this.props.updateSelectedCriteriasOrder(data);
  }

  render() {
    const selectedCriterias = this.state.selectedCriterias.filter(criteria => criteria.scorecard_uuid == this.props.scorecardUuid);

    return (
      <DraggableFlatList
        data={selectedCriterias}
        onDragEnd={({ data }) => this.updateCriteriasOrder(data)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(params) => this.renderItem(params, this.state.isTooltipVisible)}
        containerStyle={{marginHorizontal: -4}}
        ListHeaderComponent={this.props.renderHeader()}
      />
    )
  }
}

export default IndicatorDevelopmentList;