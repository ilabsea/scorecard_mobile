import React from 'react';
import { Text, View } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import MessageWithSteps from '../Share/MessageWithSteps';
import BottomSheetModalTitle from '../BottomSheetModalTitle';

import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { settingReLoginInfoContentHeight } from '../../constants/modal_constant';

class SettingReLoginInstructions extends React.Component {
  static contextType = LocalizationContext;

  renderBoldText(text) {
    return <Text style={{fontFamily: FontFamily.title, fontSize: bodyFontSize()}}>{ text }</Text>
  }

  renderInstructions() {
    const {translations} = this.context;
    const instructions = [
      { description: translations.selectYourPreviousServerUrl },
      { description: translations.enterYourEmailAndPassword },
      { description: translations.formatString(translations.clickOnButtonSave, this.renderBoldText(`"${translations.save}"`)) },
    ]

    return <MessageWithSteps
              header={ translations.pleaseFollowTheBelowSteps }
              steps={instructions}
              containerStyle={{ marginTop: 18,}}
              headerStyle={{marginBottom: 10}}
              fontSize={bodyFontSize()}
              isOrderList={true}
              listItemContainerStyle={{ marginVertical: 10 }}
            />
  }

  render() {
    return (
      <View style={{ height: hp(settingReLoginInfoContentHeight)}}>
        <BottomSheetModalTitle title={ this.context.translations.howToReLogin } />
        { this.renderInstructions() }
      </View>
    )
  }
}

export default SettingReLoginInstructions;