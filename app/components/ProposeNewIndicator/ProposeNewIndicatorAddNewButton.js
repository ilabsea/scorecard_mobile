import React from 'react';

import {LocalizationContext} from '../Translations';
import OutlinedButton from '../OutlinedButton';
import { getDeviceStyle } from '../../utils/responsive_util';
import customIndicatorService from '../../services/custom_indicator_service';

class ProposedNewIndicatorAddNewButton extends React.Component {
  static contextType = LocalizationContext;

  save = () => {
    const indicator = {
      name: this.props.searchedText,
      tag: null
    };

    customIndicatorService.createNewIndicator(this.props.scorecardUuid, indicator, async (customIndicator) => {
      this.props.startProposeIndicator(customIndicator)
    });
  }

  render() {
    return <OutlinedButton
              label={this.context.translations.createNewIndicator}
              buttonStyle={{marginBottom: getDeviceStyle(20, 16), marginHorizontal: 16, height: getDeviceStyle(72, 62)}}
              iconFontSize={getDeviceStyle(38, 32)}
              labelStyle={{textAlign: 'center', fontSize: getDeviceStyle(18, 16), marginTop: getDeviceStyle(6, 4)}}
              subLabel={`(${this.props.searchedText})`}
              onPress={() => this.save()}
           />
  }
}

export default ProposedNewIndicatorAddNewButton