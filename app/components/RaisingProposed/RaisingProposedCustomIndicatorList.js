import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {LocalizationContext} from '../Translations';
import CriteriaAudioButton from './CriteriaAudioButton';
import IndicatorCard from './IndicatorCard';
import { getDeviceStyle } from '../../utils/responsive_util';

class RaisingProposedCustomIndicatorList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.audioPlayer = null;
    this.state = {
      isModalVisible: false,
      playingIndicatorId: null,
      audioIcon: 'play-arrow',
      customIndicator: null,
      selectedIndicators: [],
    };

    this.scrollViewRef = React.createRef();
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

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
    this.setState({ selectedIndicators: [indicator] });
    this.props.editCustomIndicator(indicator);
  }

  renderIndicatorItems = () => {
    return this.props.indicators.map((indicator, index) => {
      const itemKey = 'indicator-card-' + index;

      return (
        <IndicatorCard
          indicators={this.props.indicators}
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
    });
  }


  renderInidcatorList() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 28}} keyboardShouldPersistTaps='handled'
        ref={ref => (this.scrollViewRef = ref)}
        showsVerticalScrollIndicator={false}
      >
        <View style={[{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10, marginTop: 10},
          getDeviceStyle({}, { justifyContent: 'center' })]}
        >
          { this.renderIndicatorItems() }
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
      this.props.indicators.length > 0
        ? this.renderInidcatorList()
        : this.renderEmptyMessage()
    )
  }
}

export default RaisingProposedCustomIndicatorList;