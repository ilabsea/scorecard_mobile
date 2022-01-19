import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import InstructionModal from '../InstructionModal';
import { getScorecardListInstructionImage, getScorecardListInstructionModalMarginTop } from '../../utils/scorecard_instruction_util';
import { getDeviceStyle, isShortScreenDevice } from '../../utils/responsive_util';

class ScorecardListInstructionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

    this.isComponentUnmount = false;
  }

  async componentDidMount() {
    const tooltipShown = await AsyncStorage.getItem('SCORECARD_SWIPE_DOWN_TOOLTIP');

    setTimeout(() => {
      if (!this.isComponentUnmount && !tooltipShown && this.props.scorecards.length > 0)
        this.setState({ visible: true });
    }, 200);
  }

  componentWillUnmount() {
    this.isComponentUnmount = true;
  }

  onDismiss() {
    this.setState({ visible: false });
    AsyncStorage.setItem('SCORECARD_SWIPE_DOWN_TOOLTIP', 'true');
  }

  render() {
    const mobileCloseButtonMarginTop = isShortScreenDevice() ? -10 : -25;

    return (
      <InstructionModal
        visible={this.state.visible}
        onDismiss={() => this.onDismiss()}
        contentContainerStyle={{ justifyContent: 'flex-start', marginTop: getScorecardListInstructionModalMarginTop(this.props.headerHeight)}}
        customCloseButtonContainerStyle={{ marginRight: 16, marginTop: getDeviceStyle(-35, mobileCloseButtonMarginTop) }}
        imageStyle={{height: '70%', width: '100%', resizeMode: 'contain'}}
        imageSource={getScorecardListInstructionImage()}
      />
    )
  }
}

export default ScorecardListInstructionModal;