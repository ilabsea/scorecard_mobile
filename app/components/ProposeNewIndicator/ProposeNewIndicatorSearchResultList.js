import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AudioCardView from 'react-native-audio-card-view';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import participantHelper from '../../helpers/participant_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import cardItemTabletStyles from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);

class ProposeNewIndicatorSearchResultList extends React.Component {
  static contextType = LocalizationContext;
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

  render() {
    return (
      <React.Fragment>
        <View style={{maxHeight: hp('65%')}}>
          <ScrollView style={{backgroundColor: Color.whiteColor, borderRadius: 10}}
            contentContainerStyle={{paddingBottom: 20, paddingTop: 0, paddingHorizontal: 16}}
          >
            {this.renderResult()}
          </ScrollView>
        </View>
        <View style={{position: 'absolute', left: 0, height: '100%', width: wp('100%'), backgroundColor: 'rgba(0,0,0,0.7)', zIndex: -1}} />
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchResultList