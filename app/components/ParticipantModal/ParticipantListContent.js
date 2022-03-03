import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {Text} from 'native-base';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';
import BottomSheetModalTitle from '../BottomSheetModalTitle';

// import Color from '../../themes/color';
import styles from '../../themes/participantListItemStyle';
import ParticipantModalListItem from './ParticipantModalListItem';
// import CloseButton from '../CloseButton';
import { bodyFontSize, titleFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

class ParticipantListContent extends Component {
  static contextType = LocalizationContext;

  onPressItem(item) {
    this.props.onDismiss();

    !!this.props.onPressItem && this.props.onPressItem(item);
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
    // return (
    //   <FlatList
    //     style={{flex: 1, backgroundColor: '', marginBottom: 20}}
    //     data={ this.props.participants }
    //     renderItem={({item, index}) => this.renderParticipantItem(item, index)}
    //     keyExtractor={item => item.uuid}
    //   />
    // );

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

          <View style={{flex: 1}}>
            { !!this.props.participants.length && this.renderParticipantList() }
            { !this.props.participants.length && this.renderNoData() }
          </View>
        </View>
      </View>
    )
  }
}

export default ParticipantListContent;

// Needed props
// - scorecard uuid
// - participants
// - on press item function
// - on dismiss function
// - update the content function