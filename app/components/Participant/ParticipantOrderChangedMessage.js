import React from 'react';
import {View, Text} from 'react-native';

import {LocalizationContext} from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import Color from '../../themes/color';
import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';

class ParticipantOrderChangedMessage extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{backgroundColor: Color.whiteColor}}>
        <BottomSheetModalTitle title={this.context.translations.participantOrderHasBeenChanged} />
        <View style={{padding: containerPadding, flex: 1, paddingBottom: 0}}>
          <Text style={{marginBottom: 10, fontSize: bodyFontSize()}}>
            {this.context.translations.participantOrderHasBeenChangedDescription}
          </Text>
        </View>
        <FormBottomSheetButton label={'យល់ព្រម'} isValid={true} save={() => this.props.closeModal()} wrapperStyle={{marginTop: 0}}/>
      </View>
    )
  }
}

export default ParticipantOrderChangedMessage;