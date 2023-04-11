import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import DashedLine from '../DashedLine';
import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import ProposedIndicator from '../../models/ProposedIndicator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import { bodyFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';
import itemStyles from '../../themes/participantListItemStyle';
import { participantModalContentHeight } from '../../constants/modal_constant';

class ProposedIndicatorRaisedIndicatorBottomSheet extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.proposedIndicators = ProposedIndicator.find(this.props.scorecardUuid, this.props.participant.uuid)
  }

  renderTitle = () => {
    return <React.Fragment>
              <View style={{justifyContent: 'space-between', paddingHorizontal: containerPadding}}>
                <ParticipantListItemInfo participant={this.props.participant} fontSize={bodyFontSize()} containerStyle={itemStyles.participantItem} />
              </View>
              <DashedLine />
           </React.Fragment>
  }

  renderIndicators = () => {
    return this.proposedIndicators.map(proposedIndicator => {
      return <View key={proposedIndicator.uuid} style={{paddingLeft: 8}}>
                <Text numberOfLines={2} style={{fontSize: bodyFontSize(), marginVertical: 16}}>
                  { proposedIndicatorHelper.getDisplayName(proposedIndicator, this.props.scorecardUuid) }
                </Text>
                <Divider/>
             </View>
    })
  }

  render() {
    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(participantModalContentHeight)}}>
        {this.renderTitle()}
        <View style={{flex: 1, padding: containerPadding}}>
          <Text style={{fontSize: bodyFontSize(), marginBottom: 16}}>{this.context.translations.proposedIndicator}: {this.proposedIndicators.length}</Text>
          <ScrollView contentContainerStyle={{borderWidth: 0, flexGrow: 1}}>
            {this.renderIndicators()}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorRaisedIndicatorBottomSheet