import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';

import { getDeviceStyle } from '../../utils/responsive_util';
import FormModalTabletStyles from '../../styles/tablet/FormModalComponentStyle';
import FormModalMobileStyles from '../../styles/mobile/FormModalComponentStyle';

const styles = getDeviceStyle(FormModalTabletStyles, FormModalMobileStyles);

class ScorecardResultModalButtons extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View style={styles.btnWrapper}>
        <CloseButton onPress={() => this.props.dismiss()} label={translations.close} />
        <SaveButton onPress={() => this.props.submit()} label={translations.save} disabled={this.props.disabled} />
      </View>
    )
  }
}

export default ScorecardResultModalButtons;