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
import { participantContentHeight } from '../../constants/modal_constant';

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
      <View style={{ height: hp(participantContentHeight) }}>
        <BottomSheetModalTitle title={ translations.proposedIndicator } />

        <View style={{padding: containerPadding, flex: 1}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={[styles.header, { fontSize: bodyFontSize() }]}>{translations.participantList}</Text>
            <View style={{flex:1}} />
            {this.renderAddNewParticipantButton()}
          </View>

          <ScrollView contentContainerStyle={[{flexGrow: 1}, !this.props.participants.length ? {justifyContent: 'center'} : {}]}>
            { !!this.props.participants.length && this.renderParticipantList() }
            { !this.props.participants.length && <Text style={{fontSize: bodyFontSize(), alignSelf: 'center'}}>{translations.noParticipant}</Text> }
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ParticipantListContent;