import React from 'react';
import {View} from 'react-native';
import AudioCardView from 'react-native-audio-card-view';

import ProposedIndicatorRaisedParticipantBottomSheet from './ProposedIndicatorRaisedParticipantBottomSheet';
import {LocalizationContext} from '../Translations';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import participantHelper from '../../helpers/participant_helper';
import { getDeviceStyle } from '../../utils/responsive_util';

import cardItemTabletStyles from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);

class ProposedIndicatorRaisedIndicatorList extends React.Component {
  static contextType = LocalizationContext;
  showRaisedParticipant = (indicator) => {
    this.props.formModalRef.current?.setBodyContent(<ProposedIndicatorRaisedParticipantBottomSheet indicator={indicator} scorecardUuid={this.props.scorecardUuid}/>)
    this.props.participantModalRef.current?.present();
  }

  renderIndicatorList = () => {
    const { translations } = this.context;
    return proposedIndicatorService.getProposedIndicators(this.props.scorecardUuid).map((indicator, index) => {
      const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, indicator.indicatorable_id);
      return <AudioCardView
                key={indicator.uuid}
                containerStyle={styles.indicatorCardContainer}
                title={indicator.name}
                subtitle={ translations.formatString(translations.numberOfRaisedParticipant, raisedParticipants.length) }
                hideAudioPlayer={true}
                titleStyle={[{marginTop: 0}, styles.label]}
                subtitleStyle={styles.subLabel}
                onPress={() => this.showRaisedParticipant(indicator)}
             />
    })
  }

  render() {
    return <View style={{marginTop: 6}}>{this.renderIndicatorList()}</View>
  }
}

export default ProposedIndicatorRaisedIndicatorList