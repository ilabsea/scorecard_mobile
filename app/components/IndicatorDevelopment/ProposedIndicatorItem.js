import React, { Component } from 'react';

import { LocalizationContext } from '../Translations';
import CustomOutlinedAudioCard from '../Share/CustomOutlinedAudioCard';
import indicatorHelper from '../../helpers/indicator_helper';
import Color from '../../themes/color';
import Scorecard from '../../models/Scorecard';

// import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import ProposedIndicatorItemTabletStyles from '../../styles/tablet/ProposedIndicatorItemStyle';
// import ProposedIndicatorItemMobileStyles from '../../styles/mobile/ProposedIndicatorItemStyle';
import { getDeviceStyle, isShortScreenDevice } from '../../utils/responsive_util';
import { getPluralOrSingularWord } from '../../utils/translation_util';

// const responsiveStyles = getDeviceStyle(ProposedIndicatorItemTabletStyles, ProposedIndicatorItemMobileStyles);

class ProposedIndicatorItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard = Scorecard.find(props.indicator.scorecard_uuid);

    this.state = {
      indicator: indicatorHelper.getDisplayIndicator(props.indicator, scorecard),
      active: false
    };
  }

  handleSelected() {
    let state = !this.state.active;
    let action = state ? 'add' : 'remove';

    this.setState({active: state});
    !!this.props.onPress && this.props.onPress(this.props.indicator, action);
  }

  // getListItemHeight = () => {
  //   const mobileHeight = isShortScreenDevice() ? hp('13%') : hp('11.5%');

  //   return getDeviceStyle(100, mobileHeight);
  // }

  render() {
    const { translations, appLanguage } = this.context;
    const getBorderColor = this.state.active ? Color.headerColor : '#ccc';
    const getBorderWidth = this.state.active ? 2 : 1;

    return <CustomOutlinedAudioCard
            itemUuid={this.state.indicator.uuid}
            title={this.state.indicator.content}
            subtitle={`${translations.proposedTimes}: ${this.props.indicator.proposed_count} ${getPluralOrSingularWord(this.props.indicator.proposed_count, translations.time, appLanguage, 's')}`}
            audio={this.state.indicator.local_audio}
            playingUuid={this.props.playingUuid}
            updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
            containerStyle={{borderColor: getBorderColor, borderWidth: getBorderWidth}}
            onPressItem={ () => this.handleSelected() }
          />
  }
}

export default ProposedIndicatorItem;