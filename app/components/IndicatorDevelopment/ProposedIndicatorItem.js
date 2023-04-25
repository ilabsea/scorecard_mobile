import React, { Component } from 'react';

import { LocalizationContext } from '../Translations';
import CustomAudioCard from '../Share/CustomAudioCard';
import indicatorHelper from '../../helpers/indicator_helper';
import indicatorDevelopmentHelper from '../../helpers/indicator_development_helper';
import Color from '../../themes/color';
import Scorecard from '../../models/Scorecard';

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

  render() {
    const { translations, appLanguage } = this.context;
    const getBorderColor = this.state.active ? Color.headerColor : '#ccc';
    const getBorderWidth = this.state.active ? 2 : 1;
    return <CustomAudioCard
            isOutlined={true}
            itemUuid={this.state.indicator.indicator_uuid}
            title={this.state.indicator.content}
            subtitle={indicatorDevelopmentHelper.getCardSubtitle(this.props.indicator, translations, appLanguage)}
            audio={this.state.indicator.local_audio}
            playingUuid={this.props.playingUuid}
            updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
            containerStyle={{borderColor: getBorderColor, borderWidth: getBorderWidth}}
            onPressItem={ () => this.handleSelected() }
          />
  }
}

export default ProposedIndicatorItem;