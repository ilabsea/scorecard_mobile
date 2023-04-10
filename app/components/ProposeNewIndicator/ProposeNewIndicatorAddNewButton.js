import React from 'react';

import {LocalizationContext} from '../Translations';
import OutlinedButton from '../OutlinedButton';
import { getDeviceStyle } from '../../utils/responsive_util';

class ProposedNewIndicatorAddNewButton extends React.Component {
  static contextType = LocalizationContext;
  render() {
    return <OutlinedButton
              label={this.context.translations.createNewIndicator}
              buttonStyle={{marginBottom: getDeviceStyle(20, 16), marginHorizontal: 16, height: getDeviceStyle(72, 62), borderRadius: 8, borderWidth: 2}}
              iconStyle={{fontSize: getDeviceStyle(38, 32)}}
              labelStyle={{textAlign: 'center', fontSize: getDeviceStyle(18, 16), marginTop: getDeviceStyle(6, 4)}}
              subLabel={`(${this.props.searchedText})`}
           />
  }
}

export default ProposedNewIndicatorAddNewButton