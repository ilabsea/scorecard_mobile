import React, { Component } from 'react';
import {Animated, View} from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import AsyncStorage from '@react-native-community/async-storage';
import SelectedIndicatorItem from './SelectedIndicatorItem';
import IndicatorDevelopmentInstructionModal from './IndicatorDevelopmentInstructionModal';
import CollapsibleNavHeader from '../Share/CollapsibleNavHeader';
import { LocalizationContext } from '../Translations';

import {headerShrinkOffset} from '../../constants/component_style_constant';
import { containerPadding } from '../../utils/responsive_util';

class IndicatorDevelopmentList extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      selectedIndicators: props.selectedIndicators,
      isFirstVisit: false,
    }
    this.isComponentUnmounted = false;
    this.scrollY = new Animated.Value(0)
    this.isHeaderShrunk = false
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

  onListScroll(offset) {
    this.scrollY.setValue(offset)
    this.isHeaderShrunk = offset >= headerShrinkOffset
  }

  renderScrollList() {
    const selectedIndicators = this.state.selectedIndicators.filter(indicator => indicator.scorecard_uuid == this.props.scorecardUuid);
    const containerPaddingTop = this.scrollY.interpolate({
      inputRange: [0, 100, 140],
      outputRange: [156, 60, 58],
      extrapolate: 'clamp',
    })
    return <Animated.View style={{flex: 1, paddingTop: containerPaddingTop}}>
              <DraggableFlatList
                data={selectedIndicators}
                onDragEnd={({ data }) => this.updateIndicatorsOrder(data)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(params) => this.renderItem(params)}
                containerStyle={{marginHorizontal: -4, paddingHorizontal: containerPadding}}
                ListHeaderComponent={this.props.renderHeader()}
                onScrollOffsetChange={(offset) => this.onListScroll(offset)}
                stickyHeaderIndices={[0]}
              />
           </Animated.View>
  }

  render() {
    return (
      <React.Fragment>
        <CollapsibleNavHeader title={this.context.translations.voting} scrollY={this.scrollY} progressIndex={2} isPassProposeStep={true}
          showTipModal={() => !!this.isHeaderShrunk && this.props.tipModalRef.current?.present()} tipIconVisible={true}
        />
        {this.renderScrollList()}
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