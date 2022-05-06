import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

class BottomSheetPickerContentBottomSection extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return <View style={{paddingTop: 10}}>
              { !!this.props.bottomInfoMessage && this.props.bottomInfoMessage }

              <FormBottomSheetButton isValid={true} save={() => this.props.onPressButton()}
                wrapperStyle={{paddingTop: 0, marginTop: 10}}
                label={this.context.translations.change}
              />
           </View>
  }
}

export  default BottomSheetPickerContentBottomSection;