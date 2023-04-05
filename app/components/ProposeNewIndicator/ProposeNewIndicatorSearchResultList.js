import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AudioCardView from 'react-native-audio-card-view';

import {LocalizationContext} from '../Translations';
import OutlinedButton from '../OutlinedButton';
import Color from '../../themes/color';
import participantHelper from '../../helpers/participant_helper';
import settingHelper from '../../helpers/setting_helper';
import Indicator from '../../models/Indicator';
import { getDeviceStyle } from '../../utils/responsive_util';
import cardItemTabletStyles from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);

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

  renderResult = () => {
    return this.props.indicators.map(indicator => {
      const { translations } = this.context;
      const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, indicator.indicatorable_id);
      return <View key={indicator.uuid} >
                <AudioCardView
                  audio={null}
                  audioPosition='top-left'
                  containerStyle={styles.indicatorOutlinedCardContainer}
                  title={indicator.name}
                  // title={`${indicator.name} ${indicator.name} ${indicator.name} ${indicator.name}`}
                  subtitle={translations.formatString(translations.numberOfRaisedParticipant, raisedParticipants.length)}
                  titleStyle={styles.label}
                  subtitleStyle={styles.subLabel}
                  customIconSet={{play: 'play-circle', pause: 'pause-circle', mute: 'repeat'}}
                  onPress={() => console.log('do something')}
                />
             </View>
    })
  }

  renderAddNewBtn = () => {
    return <OutlinedButton
              label='បង្កើតលក្ខណៈវិនិច្ឆ័យថ្មី'
              buttonStyle={{marginTop: 20, width: '100%', height: 72, borderRadius: 8, borderWidth: 2}}
              iconStyle={{fontSize: 38}}
              labelStyle={{textAlign: 'center', fontSize: 18, marginTop: 6}}
              subLabel={`(${this.props.searchedText})`}
           />
  }

  render() {
    return (
      <React.Fragment>
        <View style={{maxHeight: hp('65%')}}>
          <ScrollView style={{backgroundColor: Color.whiteColor, borderRadius: 10}}
            contentContainerStyle={{paddingBottom: 20, paddingTop: 0, paddingHorizontal: 16}}
          >
            {this.renderResult()}
            {(!!this.props.searchedText && this.state.showAddNewButton) && this.renderAddNewBtn()}
          </ScrollView>
        </View>
        <TouchableWithoutFeedback onPress={() => this.props.closeSearch()}>
          <View style={{position: 'absolute', left: 0, height: '100%', width: wp('100%'), backgroundColor: 'rgba(0,0,0,0.7)', zIndex: -1}} />
        </TouchableWithoutFeedback>
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchResultList