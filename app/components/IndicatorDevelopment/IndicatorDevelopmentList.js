import React, { Component } from 'react';
import DraggableFlatList from "react-native-draggable-flatlist";
import AsyncStorage from '@react-native-community/async-storage';
import SelectedIndicatorItem from './SelectedIndicatorItem';
import IndicatorDevelopmentInstructionModal from './IndicatorDevelopmentInstructionModal';

class IndicatorDevelopmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndicators: props.selectedIndicators,
      isFirstVisit: false,
    }
    this.isComponentUnmounted = false;
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  componentDidUpdate(prevProps) {
    if (!this.isComponentUnmounted && prevProps.selectedIndicators.length != this.props.selectedIndicators.length)
      this.setState({ selectedIndicators: this.props.selectedIndicators })
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
        playingUuid={this.props.playingUuid}
        updatePlayingUuid={this.props.updatePlayingUuid}
      />
    )
  }

  updateIndicatorsOrder(data) {
    this.setState({ selectedIndicators: data });
    this.props.updateSelectedIndicatorsOrder(data);
  }

  onInstructionModalDismiss() {
    AsyncStorage.setItem('DRAG_DROP_TOOLTIP', 'true');
    this.setState({ isFirstVisit: false })
  }

  render() {
    const selectedIndicators = this.state.selectedIndicators.filter(indicator => indicator.scorecard_uuid == this.props.scorecardUuid);

    return (
      <React.Fragment>
        <DraggableFlatList
          data={selectedIndicators}
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