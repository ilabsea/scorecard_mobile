import React, { Component } from 'react';
import DraggableFlatList from "react-native-draggable-flatlist";
import AsyncStorage from '@react-native-community/async-storage';
import SelectedIndicatorItem from './SelectedIndicatorItem';
import IndicatorDevelopmentInstructionModal from './IndicatorDevelopmentInstructionModal';

let _this = null;
class IndicatorDevelopmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCriterias: props.selectedCriterias,
      isFirstVisit: false,
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

  updateFirstVisitStatus(status, index) {
    if (index == 0)
      this.setState({ isFirstVisit: status });
  }

  renderItem(params) {
    const {item, index, drag, isActive} = params;

    return (
      <SelectedIndicatorItem indicator={item} key={index}
        order={index}
        isDraggable={true}
        onLongPress={drag}
        isActive={isActive}
        updateFirstVisitStatus={(status) => this.updateFirstVisitStatus(status, index)}
        hasRating={this.props.hasRating}
      />
    )
  }

  updateIndicatorsOrder(data) {
    this.setState({ selectedCriterias: data });
    this.props.updateSelectedIndicatorsOrder(data);
  }

  onInstructionModalDismiss() {
    AsyncStorage.setItem('DRAG_DROP_TOOLTIP', 'true');
    this.setState({ isFirstVisit: false })
  }

  render() {
    const selectedCriterias = this.state.selectedCriterias.filter(criteria => criteria.scorecard_uuid == this.props.scorecardUuid);

    return (
      <React.Fragment>
        <DraggableFlatList
          data={selectedCriterias}
          onDragEnd={({ data }) => this.updateIndicatorsOrder(data)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(params) => this.renderItem(params)}
          containerStyle={{marginHorizontal: -4}}
          ListHeaderComponent={this.props.renderHeader()}
        />

        <IndicatorDevelopmentInstructionModal
          visible={this.state.isFirstVisit}
          onDismiss={() => this.onInstructionModalDismiss()}
          headerHeight={this.props.headerHeight}
        />
      </React.Fragment>
    )
  }
}

export default IndicatorDevelopmentList;