import React from 'react';
import { View } from 'react-native';

import { bottomButtonContainerPadding } from '../../utils/responsive_util';
import BottomButton from '../BottomButton';
import { LocalizationContext } from '../Translations';

class SelectedImageDoneButton extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={bottomButtonContainerPadding()}>
        <BottomButton disabled={false}
          label={ this.context.translations.done }
          onPress={() => this.props.navigation.goBack()}
          iconName='none'
        />
      </View>
    )
  }
}

export default SelectedImageDoneButton;