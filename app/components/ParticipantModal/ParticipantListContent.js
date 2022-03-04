import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Text} from 'native-base';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';
import BottomSheetModalTitle from '../BottomSheetModalTitle';

import styles from '../../themes/participantListItemStyle';
import ParticipantModalListItem from './ParticipantModalListItem';
import { bodyFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

class ParticipantListContent extends Component {
  static contextType = LocalizationContext;

  onPressItem(item) {
    !!this.props.onSelectParticipant && this.props.onSelectParticipant(item);
  }

  renderParticipantItem(item, index) {
    const { translations } = this.context;

    return (
      <ParticipantModalListItem
        key={index}
        participant={item}
        translations={translations}
        onPress={() => this.onPressItem(item) }
      />
    );
  }

  renderParticipantList() {
    return this.props.participants.map((participant, index) => {
      return this.renderParticipantItem(participant, index);
    });
  }

  renderNoData() {
    const { translations } = this.context;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: bodyFontSize()}}>{translations.noParticipant}</Text>
      </View>
    )
  }

  renderAddNewParticipantButton = () => {
    const {translations} = this.context;

    return (
      <OutlinedButton
        icon="plus"
        label={translations.addNew}
        onPress={() => this.props.showAddParticipantModal() }
      />
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{ height: hp('68%') }}>
        <BottomSheetModalTitle title={ translations.proposedIndicator } />

        <View style={{padding: containerPadding, flex: 1}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={[styles.header, { fontSize: bodyFontSize() }]}>{translations.participantList}</Text>
            <View style={{flex:1}} />
            {this.renderAddNewParticipantButton()}
          </View>

          <ScrollView>
            { !!this.props.participants.length && this.renderParticipantList() }
            { !this.props.participants.length && this.renderNoData() }
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ParticipantListContent;