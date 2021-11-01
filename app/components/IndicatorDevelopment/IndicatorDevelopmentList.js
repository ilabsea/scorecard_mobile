import React, { Component } from 'react';
import DraggableFlatList from "react-native-draggable-flatlist";

import SelectedCriteriaItem from './SelectedCriteriaItem';

class IndicatorDevelopmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCriterias: props.selectedCriterias
    }
    this.isComponentUnmounted = false;
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  componentDidUpdate(prevProps) {
    if (!this.isComponentUnmounted && prevProps.selectedCriterias.length != this.props.selectedCriterias.length)
      this.setState({ selectedCriterias: this.props.selectedCriterias })
  }

  renderItem({item, index, drag, isActive}) {
    return (
      <SelectedCriteriaItem criteria={item} key={index}
        isDraggable={true}
        onLongPress={drag}
        isActive={isActive}
      />
    )
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
        renderItem={this.renderItem}
        containerStyle={{marginHorizontal: -4}}
        ListHeaderComponent={this.props.renderHeader()}
      />
    )
  }
}

export default IndicatorDevelopmentList;