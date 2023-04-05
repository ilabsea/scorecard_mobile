import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AudioCardView from 'react-native-audio-card-view';
import TextHighlight from 'react-native-text-highlighter';

import {LocalizationContext} from '../Translations';
import OutlinedButton from '../OutlinedButton';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import participantHelper from '../../helpers/participant_helper';
import settingHelper from '../../helpers/setting_helper';
import Indicator from '../../models/Indicator';
import { getDeviceStyle } from '../../utils/responsive_util';
import cardItemTabletStyles, {tabletLabelFontSize} from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles, {mobileLabelFontSize} from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);
const cardLabelFontSize = getDeviceStyle(tabletLabelFontSize, mobileLabelFontSize)

class ProposeNewIndicatorSearchResultList extends React.Component {
  static contextType = LocalizationContext;
  state = {showAddNewButton: false}

  async componentDidUpdate(prevProps) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    if (!!this.props.searchedText && prevProps.searchedText != this.props.searchedText) {
      const duplicatedIndicators = Indicator.findByScorecardAndName(this.props.scorecardUuid, this.props.searchedText, endpointId);
      this.setState({showAddNewButton: duplicatedIndicators.length > 0 ? false : true})
    }
  }

  renderCardLabel  = (indicator) => {
    const { translations } = this.context;
    const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, indicator.indicatorable_id);
    return <View style={{flex: 1, justifyContent: 'center', paddingTop: 10}}>
              <TextHighlight textToHighlight={indicator.name} searchWords={[this.props.searchedText]} fontSize={cardLabelFontSize} fontFamily={FontFamily.body} />
              <Text style={[styles.subLabel, {color: Color.lightGrayColor}]}>{translations.formatString(translations.numberOfRaisedParticipant, raisedParticipants.length)}</Text>
           </View>
  }

  renderResult = () => {
    return this.props.indicators.map(indicator => {
      return <View key={indicator.uuid} >
                <AudioCardView
                  audio={null}
                  audioPosition='top-left'
                  containerStyle={styles.indicatorOutlinedCardContainer}
                  titleStyle={styles.label}
                  subtitleStyle={styles.subLabel}
                  customIconSet={{play: 'play-circle', pause: 'pause-circle', mute: 'repeat'}}
                  onPress={() => console.log('do something')}
                >
                  {this.renderCardLabel(indicator)}
                </AudioCardView>
             </View>
    })
  }

  renderAddNewBtn = () => {
    return <OutlinedButton
              label='បង្កើតលក្ខណៈវិនិច្ឆ័យថ្មី'
              buttonStyle={{marginBottom: 20, marginHorizontal: 16, height: 72, borderRadius: 8, borderWidth: 2}}
              iconStyle={{fontSize: 38}}
              labelStyle={{textAlign: 'center', fontSize: 18, marginTop: 6}}
              subLabel={`(${this.props.searchedText})`}
           />
  }

  render() {
    return (
      <React.Fragment>
        <View style={{maxHeight: hp('65%'), backgroundColor: Color.whiteColor, borderRadius: 10}}>
          <ScrollView contentContainerStyle={{paddingBottom: 30, paddingTop: 0, paddingHorizontal: 16}}>
            {this.renderResult()}
          </ScrollView>
          {(!!this.props.searchedText && this.state.showAddNewButton) && this.renderAddNewBtn()}
        </View>
        <TouchableWithoutFeedback onPress={() => this.props.closeSearch()}>
          <View style={{position: 'absolute', left: 0, height: '100%', width: wp('100%'), backgroundColor: 'rgba(0,0,0,0.7)', zIndex: -1}} />
        </TouchableWithoutFeedback>
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchResultList