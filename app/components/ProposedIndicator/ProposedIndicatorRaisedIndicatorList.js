import React from 'react';
import {View} from 'react-native';
import AudioCardView from 'react-native-audio-card-view';

import ProposedIndicatorRaisedParticipantBottomSheet from './ProposedIndicatorRaisedParticipantBottomSheet';
import {LocalizationContext} from '../Translations';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import participantHelper from '../../helpers/participant_helper';
import { getDeviceStyle } from '../../utils/responsive_util';

import InfoListTabletStyles from '../../styles/tablet/ProposedIndicatorInfoListComponentStyle';
import InfoListMobileStyles from '../../styles/mobile/ProposedIndicatorInfoListComponentStyle';

const styles = getDeviceStyle(InfoListTabletStyles, InfoListMobileStyles);

class ProposedIndicatorRaisedIndicatorList extends React.Component {
  static contextType = LocalizationContext;
  showRaisedParticipant = (indicator) => {
    console.log('do something')
    this.props.formModalRef.current?.setBodyContent(<ProposedIndicatorRaisedParticipantBottomSheet indicator={indicator} scorecardUuid={this.props.scorecardUuid}/>)
    this.props.participantModalRef.current?.present();
  }

  renderIndicatorList = () => {
    const { translations } = this.context;
    return proposedIndicatorService.getProposedIndicators(this.props.scorecardUuid).map((indicator, index) => {
      const participantOrderNumbers = participantHelper.getParticipantByIndicator(this.props.scorecardUuid, indicator.indicatorable_id);
      return <AudioCardView
                key={indicator.uuid}
                containerStyle={styles.indicatorCardContainer}
                title={indicator.name}
                subtitle={ translations.formatString(translations.numberOfRaisedParticipant, participantOrderNumbers.length) }
                hideAudioPlayer={true}
                titleStyle={[{marginTop: 0}, styles.label]}
                subtitleStyle={styles.subLabel}
                onPress={() => this.showRaisedParticipant(indicator)}
             />
    })
  }

  render() {
    return <View style={{marginTop: 10}}>{this.renderIndicatorList()}</View>
  }
}

export default ProposedIndicatorRaisedIndicatorList