import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import DeviceInfo from 'react-native-device-info'

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import CriteriaAudioButton from './CriteriaAudioButton';
import IndicatorCard from './IndicatorCard';

import indicatorHelper from '../../helpers/indicator_helper';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import TourTipButton from '../TourTipButton';

import Scorecard from '../../models/Scorecard';

import { getDeviceStyle } from '../../utils/responsive_util';

const WalkableView = walkthroughable(View);

class CriteriaSelection extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.audioPlayer = null;
    this.state = {
      indicators: props.indicators,
      selectedIndicators: [],
      unselectedIndicators: [],
      isModalVisible: false,
      playingIndicatorId: null,
      audioIcon: 'play-arrow',
      customIndicator: null,
    };

    this.scrollViewRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    return indicatorHelper.getIndicatorsState(props, state)
  }

  componentDidMount() {
    if (!Scorecard.tourTipShown(this.props.scorecardUUID)) {
      const _this = this;
      this.props.start(false, this.scrollViewRef);

      Scorecard.update(this.props.scorecardUUID, { tour_tip_shown: true });

      this.props.copilotEvents.on("stop", () => {
        _this.props.startNextTourTip()
      });
    }
  }

  componentWillUnmount() {
    if (this.audioPlayer != null)
      this.audioPlayer.release();
  }

  shortcutColor = (indicator) => {
    return indicator.isSelected ? {color: '#ffffff'} : {};
  }

  selectIndicator = (index) => {
    let indicators = this.state.indicators;
    let selectedIndicators = this.props.selectedIndicators;
    let unselectedIndicators = this.props.unselectedIndicators;

    if (indicators[index].isSelected) {
      selectedIndicators = selectedIndicators.filter((indicator) => indicator.uuid !== indicators[index].uuid);
      unselectedIndicators.push(indicators[index]);
    }
    else if (indicators[index].uuid != '') {
      selectedIndicators.push(indicators[index]);
      unselectedIndicators = unselectedIndicators.filter((indicator) => indicator.uuid !== indicators[index].uuid);
    }

    indicators[index].isSelected = !indicators[index].isSelected;

    this.setState({
      indicators,
      selectedIndicators,
      unselectedIndicators,
      isModalVisible: createNewIndicatorHelper.isAddNewIndicatorSection(index, indicators),
    }, () => { this.props.selectIndicator(selectedIndicators, unselectedIndicators, this.state.isModalVisible); });
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

  _renderIndicatorWithTourTip = (indicator, index) => {
    const isAddNewCriteriaIndex = index == this.state.indicators.length - 1;

    if (index == 0 || isAddNewCriteriaIndex) {
      const { translations } = this.context;
      const text = isAddNewCriteriaIndex ? translations.clickOnThisCardToCreateNewCriteria : translations.clickOnTheCriteriaToSelect;
      const order = isAddNewCriteriaIndex ? 3 : 1;
      const name = isAddNewCriteriaIndex ? 'customCriteriaCard' : 'criteriaCard';

      return (
        <CopilotStep
          text={text}
          order={order}
          name={name}
        >
          <WalkableView>{ this.indicatorCard(indicator, index) }</WalkableView>
        </CopilotStep>
      )
    }

    return this.indicatorCard(indicator, index);
  }

  _renderAudioButton = (indicator, index) => {
    if (index == 0) {
      const { translations } = this.context;
      return (
        <CopilotStep
          text={ translations.clickOnAudioIconToPlayTheSound }
          order={2}
          name="audioButton"
        >
          <WalkableView style={{justifyContent: 'center'}}>
            { this.audioButton(indicator, index) }
          </WalkableView>
        </CopilotStep>
      )
    }

    return this.audioButton(indicator, index);
  }

  audioButton = (indicator, index) => {
    let isAddNewCriteriaIndex = createNewIndicatorHelper.isAddNewIndicatorSection(index, this.state.indicators);

    return (
      <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
        playingIndicatorId={this.state.playingIndicatorId}
        updateAudioState={this.updateAudioState}
        scorecardUUID={this.props.scorecardUUID}
        isAddNewCriteria={isAddNewCriteriaIndex}
      />
    );
  }

  indicatorCard = (indicator, index) => {
    return (
      <IndicatorCard
        indicators={this.state.indicators}
        indicator={indicator}
        customIndicator={this.state.customIndicator}
        index={index}
        scorecardUuid={this.props.scorecardUUID}
        selectIndicator={this.selectIndicator}
        selectedIndicators={this.props.selectedIndicators}
      >
        {this._renderAudioButton(indicator, index)}
      </IndicatorCard>
    )
  }

  renderIndicatorItem = (indicator, index) => {
    if (index === this.state.indicators.length - 1 && this.state.indicators.length%2 != 0) {
      const { translations } = this.context;
      return (
        <CopilotStep
          text={translations.clickOnThisCardToCreateNewCriteria}
          order={3}
          name='customCriteriaCard'
        >
          <WalkableView>
            <View key={index} style={{flexDirection: 'row', width: '100%'}}>
              {this.indicatorCard(indicator, index)}
              { DeviceInfo.isTablet() &&
                <View style={{flex: 1, marginHorizontal: 10}} />
              }
            </View>
          </WalkableView>
        </CopilotStep>
      )
    }

    return this._renderIndicatorWithTourTip(indicator, index)
  }

  render() {
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
}

export default copilot({
  overlay: 'svg',
  animated: true,
  verticalOffset: 24,
  backdropColor: "rgba(31, 31, 31, 0.7)",
  labels: {
    previous: <TourTipButton label='previous' />,
    next: <TourTipButton label='next' />,
    skip: <TourTipButton label='skip' />,
    finish: <TourTipButton label='next' />
  },
  stepNumberComponent: () => (<View/>)
})(CriteriaSelection);