import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import DeviceInfo from 'react-native-device-info'

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import CriteriaAudioButton from './CriteriaAudioButton';
import IndicatorCard from './IndicatorCard';

import customIndicatorService from '../../services/custom_indicator_service';
import { getDeviceStyle } from '../../utils/responsive_util';

class RaisingProposedCustomIndicatorList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.audioPlayer = null;
    this.state = {
      indicators: props.indicators,
      isModalVisible: false,
      playingIndicatorId: null,
      audioIcon: 'play-arrow',
      customIndicator: null,
      selectedIndicators: [],
    };

    this.scrollViewRef = React.createRef();
  }

  // componentDidMount() {
  //   this.updateIndicatorList();
  // }

  // updateIndicatorList() {
  //   console.log('== get custom indicator ==');

  //   this.setState({
  //     indicators: customIndicatorService.getIndicatorList(this.props.scorecardUuid, this.props.searchText),
  //   });
  // }

  audioButton = (indicator, index) => {
    return (
      <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
        playingIndicatorId={this.state.playingIndicatorId}
        updateAudioState={this.updateAudioState}
        scorecardUUID={this.props.scorecardUuid}
        isAddNewCriteria={false}
      />
    );
  }

  selectIndicator(indicator) {
    console.log('selected edit indicator ===== ')
    this.setState({
      selectedIndicators: [indicator]
    })
  }

  renderIndicatorItem = (indicator, index) => {
    const itemKey = 'indicator-card-' + index;

    return (
      <IndicatorCard
        indicators={this.state.indicators}
        indicator={indicator}
        customIndicator={this.state.customIndicator}
        index={index}
        scorecardUuid={this.props.scorecardUuid}
        selectIndicator={() => this.selectIndicator(indicator)}
        selectedIndicators={this.state.selectedIndicators}
        isSearching={this.props.isSearching}
        key={itemKey}
      >
        {this.audioButton(indicator, index)}
      </IndicatorCard>
    )
  }

  renderInidcatorList() {
    let doms = this.state.indicators.map((item, index) =>
      this.renderIndicatorItem(item, index)
    )

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 28}} keyboardShouldPersistTaps='handled'
        ref={ref => (this.scrollViewRef = ref)}
        showsVerticalScrollIndicator={false}
      >
        <View style={[{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10, marginTop: 10},
          getDeviceStyle({}, { justifyContent: 'center' })]}
        >
          {doms}
        </View>
      </ScrollView>
    )
  }

  renderEmptyMessage() {
    return (
      <Text style={{textAlign: 'center'}}>មិនមានលក្ខណៈវិនិច្ឆ័យ</Text>
    )
  }

  render() {
    return (
      this.state.indicators.length > 0
        ? this.renderInidcatorList()
        : this.renderEmptyMessage()
    )
  }
}

export default RaisingProposedCustomIndicatorList;